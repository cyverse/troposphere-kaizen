import { ActionTypes, PayloadStates, normalize } from 'lore-utils';
import destroy from '../lore-actions/destroy';

export default function(modelName, models, lore) {
    const Model = models[modelName];

    return destroy({
        blueprint: 'destroy',

        model: Model,

        optimistic: {
            actionType: ActionTypes.update(modelName),
            payloadState: PayloadStates.DELETING
        },

        onSuccess: {
            actionType: ActionTypes.update(modelName),
            payloadState: PayloadStates.DELETED
        },

        onError: {
            actionType: ActionTypes.update(modelName),
            payloadState: PayloadStates.ERROR_DELETING
        },

        onNotFound: {
            actionType: ActionTypes.update(modelName),
            payloadState: PayloadStates.NOT_FOUND
        },

        normalize: {

            // look through the model and generate actions for any attributes with
            // nested data that should be normalized
            getActions: function(model) {
                return normalize(lore, modelName).model(model);
            },

            // dispatch any actions created from normalizing nested data
            dispatchActions: function(actions, dispatch) {
                actions.forEach(dispatch);
            }

        }

    });
}
