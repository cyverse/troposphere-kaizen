import _ from 'lodash';
import { ActionTypes, PayloadStates, payloadCollection, normalize } from 'lore-utils';
import db from '../../../db.json';

/*
 * Blueprint for Find method
 */
export default function find(query = {}, pagination) {
  return function(dispatch) {
    const Collection = lore.collections.projectLink;
    const collection = new Collection();

    const combinedQuery = {
      where: query,
      pagination: pagination
    };

    setTimeout(function() {
      // set the fake data
      collection.set({
          count: 2,
          next: null,
          previous: null,
          results: [
              {
                  id: 1,
                  project: {
                      id: query.project__id
                  },
                  external_link: db.links.results[0]
              },
              {
                  id: 2,
                  project: {
                      id: query.project__id
                  },
                  external_link: db.links.results[1]
              }
          ]
      }, { parse: true });

      // look through all models in the collection and generate actions for any attributes
      // with nested data that should be normalized
      const actions = normalize(lore, 'projectLink').collection(collection);

      dispatch({
        type: ActionTypes.fetchPlural('projectLink'),
        payload: payloadCollection(collection, PayloadStates.RESOLVED, null, combinedQuery),
        query: combinedQuery
      });

      // dispatch any actions created from normalizing nested data
      actions.forEach(dispatch);
    }, 1000);

    return dispatch({
      type: ActionTypes.fetchPlural('projectLink'),
      payload: payloadCollection(collection, PayloadStates.FETCHING, null, combinedQuery),
      query: combinedQuery
    });
  };
};
