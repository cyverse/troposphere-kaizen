import _ from 'lodash';
import { ActionTypes, PayloadStates, payload, normalize } from 'lore-utils';

/*
 * Blueprint for Get method
 */
export default function get(modelId, query = {}) {
    return function (dispatch) {
        const Model = lore.models.instanceV1;

        const model = new Model({
            uuid: modelId.uuid,
            provider_uuid: modelId.provider_uuid,
            identity_uuid: modelId.identity_uuid
        });

        model.fetch({
            data: query
        }).then(function() {
            // look through the model and generate actions for any attributes with
            // nested data that should be normalized
            const actions = normalize(lore, 'instanceV1').model(model);

            dispatch({
                type: ActionTypes.update('instanceV1'),
                payload: payload(model, PayloadStates.RESOLVED)
            });

            // dispatch any actions created from normalizing nested data
            actions.forEach(dispatch);
        }).catch(function(response) {
            const error = response.data;

            if (response.status === 404) {
                dispatch({
                    type: ActionTypes.update('instanceV1'),
                    payload: _.merge(payload(model), {
                        state: PayloadStates.NOT_FOUND,
                        error: error
                    })
                });
            } else {
                dispatch({
                    type: ActionTypes.update('instanceV1'),
                    payload: payload(model, PayloadStates.ERROR_FETCHING, error)
                });
            }
        });

        return dispatch({
            type: ActionTypes.add('instanceV1'),
            payload: payload(model, PayloadStates.FETCHING)
        });
    };
};
