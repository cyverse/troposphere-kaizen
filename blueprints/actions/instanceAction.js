import _ from 'lodash';
import { ActionTypes, normalize } from 'lore-utils';
import { getState } from 'lore-hook-connect';
import Poll from 'lore-hook-polling/es/Poll';
import PayloadStates from '../../src/constants/PayloadStates';
import updateV1 from '../../src/actions/instance/updateV1';

/*
 * Blueprint for Update method
 */
export default function(options) {
    if (!options.params) {
        throw new Error('Missing params')
    }

    if (!options.params.action) {
        throw new Error('Missing params.action')
    }

    if (!options.optimisticState) {
        throw new Error('Missing optimisticState')
    }

    return function update(model, params) {
        return function (dispatch) {
            const Model = lore.models.instanceActionV1;
            const proxyModel = new Model(_.pick(model.data, [
                'provider_uuid',
                'identity_uuid',
                'uuid'
            ]));
            proxyModel.set(options.params);

            const originalState = _.merge({}, model.data.state);
            const optimisticState = {
                status_raw: options.optimisticState.status_raw,
                status: options.optimisticState.status,
                activity: options.optimisticState.activity
            };

            const instanceActionsQuery = {
                where: {
                    instance_id: model.id,
                    instance_uuid: model.data.uuid
                },
                pagination: {}
            };

            const originalInstanceActionsPayload = getState('instanceAction.find', instanceActionsQuery);

            proxyModel.save().then(function () {
                dispatch({
                    type: ActionTypes.update('instance'),
                    payload: _.merge(model, {
                        data: {
                            state: optimisticState
                        },
                        state: PayloadStates.MANAGED
                    })
                });

                const poll = new Poll(updateV1(model).bind(null, function(action) {
                    const instance = action.payload;
                    if (instance.state === PayloadStates.RESOLVED) {
                        if (instance.data.state.status_raw !== originalState.status_raw) {
                            poll.stop();
                            dispatch(action);

                            // now that the action is taking place on the instance, refetch the
                            // instance actions to see which ones are available during transition
                            lore.actions.instanceAction.refetch(
                                instanceActionsQuery.where,
                                instanceActionsQuery.pagination
                            );
                        }
                    }
                }), {});

                poll.start();

            }).catch(function (response) {
                const error = response.data;

                dispatch({
                    type: ActionTypes.fetchPlural('instanceAction'),
                    payload: originalInstanceActionsPayload,
                    query: originalInstanceActionsPayload.query
                });

                if (response.status === 404) {
                    dispatch({
                        type: ActionTypes.update('instance'),
                        payload: _.merge(model, {
                            data: {
                                state: originalState
                            },
                            state: PayloadStates.NOT_FOUND,
                            error: error
                        })
                    });
                } else {
                    dispatch({
                        type: ActionTypes.update('instance'),
                        payload: _.merge(model, {
                            data: {
                                state: originalState
                            },
                            state: PayloadStates.ERROR_UPDATING,
                            error: error
                        })
                    });
                }
            });

            // Disable all instance actions by dispatching an action
            // that declares none are available (empty array)
            dispatch({
                type: ActionTypes.refetchPlural('instanceAction'),
                payload: {
                    state: PayloadStates.RESOLVED,
                    error: {},
                    data: [],
                    query: instanceActionsQuery,
                    meta: {
                        totalCount: 0,
                        perPage: null,
                        nextPage: null
                    }
                },
                query: instanceActionsQuery
            });

            return dispatch({
                type: ActionTypes.update('instance'),
                payload: _.merge(model, {
                    data: proxyModel.toJSON(),
                    state: PayloadStates.UPDATING
                })
            });
        };
    }
};
