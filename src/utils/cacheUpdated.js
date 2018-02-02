import _ from 'lodash';
import PayloadStates from '../constants/PayloadStates';

/**
 * Tells you whether data has been added or removed. Helpful when determining
 * whether a resource count has changed.
 * @param modelName
 * @param activity
 */

const count = {};
const deletedCount = {};

export default function(modelName) {
    const models = lore.store.getState()[modelName].byId;

    // get the number of models in the store
    const nextCount = Object.keys(models).length;

    // get the number of models that have been marked as deleted from the store
    const nextDeletedCount = _.reduce(models, function(count, model) {
        return model.state === PayloadStates.DELETED ? count + 1 : count;
    }, 0);

    // signal the data has being changed if either the number of models has changed
    // or the number of models that have been deleted has changed
    const hasChanged = (
        count[modelName] !== nextCount ||
        deletedCount[modelName] !== nextDeletedCount
    );

    // update the counts
    count[modelName] = nextCount;
    deletedCount[modelName] = nextDeletedCount;

    return hasChanged;
}
