import _ from 'lodash';
import { ActionTypes, PayloadStates, payloadCollection, normalize } from 'lore-utils';
import Promise from 'bluebird';
import getV1 from '../volumeV1/get';

/*
 * Blueprint for Find method
 */

export default function find(query = {}, pagination) {
  return function(dispatch) {
    const Collection = lore.collections.volume;
    const collection = new Collection();

    const queryParameters = _.extend({}, query, pagination);

    const combinedQuery = {
      where: query,
      pagination: pagination
    };

    collection.fetch({
      data: queryParameters
    }).then(function(){
        return Promise.map(collection.models, function(model) {
            return new Promise(function(resolve, reject) {
                getV1(model.attributes)(function(action) {
                    const volumeV1 = action.payload;
                    if (volumeV1.state === PayloadStates.RESOLVED) {
                        // modify volume with data from volumeV1 we want to extend it with
                        _.extend(model.attributes, volumeV1.data);
                        resolve(model);
                    }
                });
            });
        });
    }).then(function() {
      // look through all models in the collection and generate actions for any attributes
      // with nested data that should be normalized
      const actions = normalize(lore, 'volume').collection(collection);

      dispatch({
        type: ActionTypes.fetchPlural('volume'),
        payload: payloadCollection(collection, PayloadStates.RESOLVED, null, combinedQuery),
        query: combinedQuery
      });

      // dispatch any actions created from normalizing nested data
      actions.forEach(dispatch);
    }).catch(function(response) {
      const error = response.data;

      dispatch({
        type: ActionTypes.fetchPlural('volume'),
        payload: payloadCollection(collection, PayloadStates.ERROR_FETCHING, error, combinedQuery),
        query: combinedQuery
      });
    });

    return dispatch({
      type: ActionTypes.fetchPlural('volume'),
      payload: payloadCollection(collection, PayloadStates.FETCHING, null, combinedQuery),
      query: combinedQuery
    });
  };
};
