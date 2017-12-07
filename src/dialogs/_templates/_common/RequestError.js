import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import { PayloadStates } from 'lore-utils';

export default createReactClass({
    displayName: 'RequestError',

    propTypes: {
        request: PropTypes.object,
        error: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.object
        ]),
        children: PropTypes.func
    },

    render: function () {
        const {
            request,
            error,
            children
        } = this.props;

        if (error) {
            return (
                <ErrorMessage error={error}/>
            );
        }

        if (request) {
            if (children) {
                let error = children(request);
                if (error) {
                    return (
                        <ErrorMessage error={error}/>
                    );
                }
            }

            if (
                request.state === PayloadStates.ERROR_CREATING ||
                request.state === PayloadStates.ERROR_UPDATING ||
                request.state === PayloadStates.ERROR_FETCHING ||
                request.state === PayloadStates.ERROR_DELETING
            ) {
                return (
                    <ErrorMessage error={request.error}/>
                );
            }
        }

        return null;
    }

});
