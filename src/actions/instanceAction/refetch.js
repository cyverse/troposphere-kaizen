import _ from 'lodash';
import { ActionTypes, PayloadStates, payloadCollection, normalize } from 'lore-utils';
/*
 * Blueprint for Find method
 */

export default function refetch(query = {}, pagination = {}) {
    return function (dispatch) {
        const Collection = lore.collections.instanceAction;
        const collection = new Collection([], query);

        const queryParameters = _.extend({}, query, pagination);

        const combinedQuery = {
            where: query,
            pagination: pagination
        };

        collection.fetch({
            // data: queryParameters
        }).then(function() {
            // look through all models in the collection and generate actions for any attributes
            // with nested data that should be normalized
            const actions = normalize(lore, 'instanceAction').collection(collection);

            dispatch({
                type: ActionTypes.fetchPlural('instanceAction'),
                payload: payloadCollection(collection, PayloadStates.RESOLVED, null, combinedQuery),
                query: combinedQuery
            });

            // dispatch any actions created from normalizing nested data
            actions.forEach(dispatch);
        }).catch(function(response) {
            const error = response.data;

            dispatch({
                type: ActionTypes.fetchPlural('instanceAction'),
                payload: payloadCollection(collection, PayloadStates.ERROR_FETCHING, error, combinedQuery),
                query: combinedQuery
            });
        });

        return dispatch({
            type: ActionTypes.refetchPlural('instanceAction'),
            payload: payloadCollection(collection, PayloadStates.FETCHING, null, combinedQuery),
            query: combinedQuery
        });
    };
};
