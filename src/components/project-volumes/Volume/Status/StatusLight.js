import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
    displayName: 'StatusLight',

    propTypes: {
        volume: PropTypes.object.isRequired
    },

    render: function () {
        const { volume } = this.props;

        if (
            volume.data.state.status === 'available' ||
            volume.data.state.status === 'in-use'
        ) {
            return (
                <span className="status-light active" />
            );
        }

        return (
            <span className="status-light transition breathe" />
        );
    }
});
