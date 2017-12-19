import _ from 'lodash';
import { ActionTypes, PayloadStates, normalize } from 'lore-utils';

/*
 * Blueprint for UpdateV1 method
 */
export default function update(model, params = {}) {
    return function (dispatch) {
        const Model = lore.models.instanceV1;
        const proxyModel = new Model(model.data);
        proxyModel.set(params);

        proxyModel.fetch().then(function () {
            // look through the model and generate actions for any attributes with
            // nested data that should be normalized
            const actions = normalize(lore, 'instanceV1').model(model);

            dispatch({
                type: ActionTypes.update('instance'),
                payload: _.merge(model, {
                    data: proxyModel.toJSON(),
                    state: PayloadStates.RESOLVED
                })
            });

            // dispatch any actions created from normalizing nested data
            actions.forEach(dispatch);
        }).catch(function (response) {
            const error = response.data;

            if (response.status === 404) {
                dispatch({
                    type: ActionTypes.update('instance'),
                    payload: _.merge(model, {
                        state: PayloadStates.NOT_FOUND,
                        error: error
                    })
                });
            } else {
                dispatch({
                    type: ActionTypes.update('instance'),
                    payload: _.merge(model, {
                        data: proxyModel.toJSON(),
                        state: PayloadStates.ERROR_UPDATING,
                        error: error
                    })
                });
            }
        });

        return dispatch({
            type: ActionTypes.update('instance'),
            payload: _.merge(model, {
                data: proxyModel.toJSON(),
                state: PayloadStates.UPDATING
            })
        });
    };
};
