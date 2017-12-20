import _ from 'lodash';
import { ActionTypes, PayloadStates, payload, normalize } from 'lore-utils';
import getV1 from '../volumeV1/get';

/*
 * Blueprint for Get method
 */
export default function get(modelId, query = {}) {
    return function(dispatch) {
        const Model = lore.models.volume;
        const model = new Model({
            id: modelId
        });

        model.fetch({
            data: query
        }).then(function() {
            // fetch the volume data from the v1 endpoint - we're going to extend
            // our volume model with data we commonly need across the application
            getV1(model.attributes)(function(action) {
                const volumeV1 = action.payload;
                if (volumeV1.state === PayloadStates.RESOLVED) {

                    // look through the model and generate actions for any attributes with
                    // nested data that should be normalized
                    const actions = normalize(lore, 'volume').model(model);

                    // modify volume with data from volumeV1 we want to extend it with
                    _.extend(model.attributes, volumeV1.data);

                    // dispatch the modified volume
                    dispatch({
                        type: ActionTypes.update('volume'),
                        payload: payload(model, PayloadStates.RESOLVED)
                    });

                    // dispatch any actions created from normalizing nested data
                    actions.forEach(dispatch);
                }
            });
        }).catch(function(response) {
            const error = response.data;

            if (response.status === 404) {
                dispatch({
                    type: ActionTypes.update('volume'),
                    payload: _.merge(payload(model), {
                        state: PayloadStates.NOT_FOUND,
                        error: error
                    })
                });
            } else {
                dispatch({
                    type: ActionTypes.update('volume'),
                    payload: payload(model, PayloadStates.ERROR_FETCHING, error)
                });
            }
        });

        return dispatch({
            type: ActionTypes.add('volume'),
            payload: payload(model, PayloadStates.FETCHING)
        });
    };
};
