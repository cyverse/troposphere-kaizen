import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import PayloadStates from '../../constants/PayloadStates';

export default createReactClass({
    displayName: 'IsPublic',

    contextTypes: {
        user: PropTypes.object.isRequired
    },

    render: function () {
        const {
            user
        } = this.context;

        const {
            children,
            ...other
        } = this.props;

        if (user.state === PayloadStates.ERROR_FETCHING) {
            return React.Children.map(children, (child) => {
                return React.cloneElement(child, {...other});
            });
        }

        return null;
    }

});
