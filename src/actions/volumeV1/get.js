import _ from 'lodash';
import { ActionTypes, PayloadStates, payload, normalize } from 'lore-utils';

/*
 * Blueprint for Get method
 */
export default function get(modelId, query = {}) {
    return function (dispatch) {
        const Model = lore.models.volumeV1;

        const model = new Model({
            uuid: modelId.uuid,
            provider_uuid: modelId.provider_uuid,
            identity_uuid: modelId.identity_uuid
        });

        model.fetch({
            data: query
        }).then(function() {
            dispatch({
                type: ActionTypes.update('volumeV1'),
                payload: payload(model, PayloadStates.RESOLVED)
            });
        }).catch(function(response) {
            const error = response.data;

            if (response.status === 404) {
                dispatch({
                    type: ActionTypes.update('volumeV1'),
                    payload: _.merge(payload(model), {
                        state: PayloadStates.NOT_FOUND,
                        error: error
                    })
                });
            } else {
                dispatch({
                    type: ActionTypes.update('volumeV1'),
                    payload: payload(model, PayloadStates.ERROR_FETCHING, error)
                });
            }
        });

        return dispatch({
            type: ActionTypes.add('volumeV1'),
            payload: payload(model, PayloadStates.FETCHING)
        });
    };
};
