import _ from 'lodash';
import { ActionTypes, normalize } from 'lore-utils';
import { getState } from 'lore-hook-connect';
import Poll from 'lore-hook-polling/es/Poll';
import PayloadStates from '../../src/constants/PayloadStates';
import updateV1 from '../../src/actions/volume/updateV1';
import get from '../../src/actions/volume/get';
import getV1 from '../../src/actions/volumeV1/get';

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
            const { instance } = params;
            const Model = lore.models.instanceActionV1;
            const proxyModel = new Model(_.pick(instance.data, [
                'provider_uuid',
                'identity_uuid',
                'uuid'
            ]));
            proxyModel.set(_.merge({}, options.params, {
                volume_id: model.data.uuid
            }));

            const originalState = _.merge({}, model.data.state);
            const optimisticState = {
                status_raw: options.optimisticState.status_raw,
                status: options.optimisticState.status,
                activity: options.optimisticState.activity
            };

            proxyModel.save().then(function () {
                dispatch({
                    type: ActionTypes.update('volume'),
                    payload: _.merge(model, {
                        data: {
                            state: optimisticState
                        },
                        state: PayloadStates.MANAGED
                    })
                });

                const poll = new Poll(updateV1(model).bind(null, function(action) {
                    const volume = action.payload;
                    if (volume.state === PayloadStates.RESOLVED) {
                        if (volume.data.state.status_raw !== originalState.status_raw) {
                            poll.stop();

                            dispatch({
                                type: ActionTypes.update('volume'),
                                payload: _.merge(model, {
                                    data: {
                                        attach_data: volume.data.attach_data,
                                        state: volume.data.state
                                    },
                                    state: PayloadStates.RESOLVED
                                })
                            });

                            dispatch(action);
                        }
                    }
                }), {});

                poll.start();

            }).catch(function (response) {
                const error = response.data;

                if (response.status === 404) {
                    dispatch({
                        type: ActionTypes.update('volume'),
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
                        type: ActionTypes.update('volume'),
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

            return dispatch({
                type: ActionTypes.update('volume'),
                payload: _.merge(model, {
                    // data: proxyModel.toJSON(),
                    state: PayloadStates.UPDATING
                })
            });
        };
    }
};
