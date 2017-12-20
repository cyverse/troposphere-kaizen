import _ from 'lodash';
import { ActionTypes, PayloadStates, normalize } from 'lore-utils';

/*
 * Blueprint for UpdateV1 method
 */
export default function update(model, params = {}) {
    return function (dispatch) {
        const Model = lore.models.volumeV1;
        const proxyModel = new Model(model.data);
        proxyModel.set(params);

        proxyModel.fetch().then(function () {
            dispatch({
                type: ActionTypes.update('volume'),
                payload: _.merge(model, {
                    data: proxyModel.toJSON(),
                    state: PayloadStates.RESOLVED
                })
            });
        }).catch(function (response) {
            const error = response.data;

            if (response.status === 404) {
                dispatch({
                    type: ActionTypes.update('volume'),
                    payload: _.merge(model, {
                        state: PayloadStates.NOT_FOUND,
                        error: error
                    })
                });
            } else {
                dispatch({
                    type: ActionTypes.update('volume'),
                    payload: _.merge(model, {
                        data: proxyModel.toJSON(),
                        state: PayloadStates.ERROR_UPDATING,
                        error: error
                    })
                });
            }
        });

        return dispatch({
            type: ActionTypes.update('volume'),
            payload: _.merge(model, {
                data: proxyModel.toJSON(),
                state: PayloadStates.UPDATING
            })
        });
    };
};
