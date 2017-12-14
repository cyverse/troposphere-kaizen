function InvalidGetStateCall(reducerKey) {
    const error = new Error(
    `
    Invalid call to 'getState('${reducerKey}')'. Missing required attribute.
    Expected method call to look like this:
    
    getState('${reducerKey}', {
      uuid: '7658f430-4dc2-4495-b266-72bda644ab41',
      provider_uuid: '2329fd4f-8a2b-4f4d-9cdd-8d1f431bf567',
      identity_uuid: 'be0ef052-570e-4136-9133-d186ffd89d5c'
    })`
    );
    error.name = 'InvalidGetStateCall';
    return error;
}

/**
 * Connection Blueprint used to generate a validate a complex key for the v1 API
 */

export default {

    defaults: {
        uuid: null,
        provider_uuid: null,
        identity_uuid: null
    },

    verifyParams: function (params) {
        if (
            !params.uuid ||
            !params.provider_uuid ||
            !params.identity_uuid
        ) {
            throw new InvalidGetStateCall(this.reducerKey);
        }
    },

    getPayload: function (reducerState, params) {
        const key = params.uuid;
        return reducerState[key];
    },

    callAction: function (action, params) {
        return action(params).payload;
    }

};
