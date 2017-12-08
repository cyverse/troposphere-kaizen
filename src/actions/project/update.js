import _ from 'lodash';
import { ActionTypes, PayloadStates, normalize, payload } from 'lore-utils';

/*
 * Blueprint for Update method
 */
export default function update(model, params) {
    return function (dispatch) {
        const Model = lore.models.project;
        const proxyModel = new Model(model.data);
        proxyModel.set(params);

        if (params.name.toLowerCase() === 'explode') {
            setTimeout(function() {
                dispatch({
                    type: ActionTypes.update('project'),
                    payload: payload(proxyModel, PayloadStates.ERROR_UPDATING, {
                        name: "Project could not be saved. Please change name to something other than 'explode'."
                    })
                });
            }, 1000);
        } else {
            proxyModel.save().then(function () {
                // look through the model and generate actions for any attributes with
                // nested data that should be normalized
                const actions = normalize(lore, 'project').model(model);

                dispatch({
                    type: ActionTypes.update('project'),
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
                        type: ActionTypes.update('project'),
                        payload: _.merge(model, {
                            state: PayloadStates.NOT_FOUND,
                            error: error
                        })
                    });
                } else {
                    dispatch({
                        type: ActionTypes.update('project'),
                        payload: _.merge(model, {
                            data: proxyModel.toJSON(),
                            state: PayloadStates.ERROR_UPDATING,
                            error: error
                        })
                    });
                }
            });
        }

        return dispatch({
            type: ActionTypes.update('project'),
            payload: _.merge(model, {
                data: proxyModel.toJSON(),
                state: PayloadStates.UPDATING
            })
        });
    };
};
