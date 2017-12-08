import { ActionTypes, PayloadStates, payload, normalize } from 'lore-utils';

/*
 * Blueprint for Create method
 */
export default function create(params) {
    return function (dispatch) {
        const Model = lore.models.project;
        const model = new Model(params);

        if (params.name.toLowerCase() === 'explode') {
            setTimeout(function () {
                dispatch({
                    type: ActionTypes.update('project'),
                    payload: payload(model, PayloadStates.ERROR_CREATING, {
                        name: "Project could not be saved. Please change name to something other than 'explode'."
                    })
                });
            }, 1000);
        } else {
            model.save().then(function () {
                // look through the model and generate actions for any attributes with
                // nested data that should be normalized
                const actions = normalize(lore, 'project').model(model);

                dispatch({
                    type: ActionTypes.update('project'),
                    payload: payload(model, PayloadStates.RESOLVED)
                });

                // dispatch any actions created from normalizing nested data
                actions.forEach(dispatch);
            }).catch(function (response) {
                const error = response.data;

                dispatch({
                    type: ActionTypes.remove('project'),
                    payload: payload(model, PayloadStates.ERROR_CREATING, error)
                });
            });
        }

        return dispatch({
            type: ActionTypes.add('project'),
            payload: payload(model, PayloadStates.CREATING)
        });
    };
};
