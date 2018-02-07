import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import PayloadStates from '../../../../constants/PayloadStates';

export default createReactClass({
    displayName: 'StatusLight',

    propTypes: {
        volume: PropTypes.object.isRequired
    },

    render: function () {
        const { volume } = this.props;
        const isUpdating = (
            volume.state === PayloadStates.UPDATING ||
            volume.state === PayloadStates.MANAGED
        );

        if (
            volume.data.state.status === 'available' ||
            volume.data.state.status === 'in-use'
        ) {
            return (
                <span className="status-light active" />
            );
        }

        return (
            <span className={`status-light transition ${isUpdating ? 'updating': ''}`} />
        );
    }
});
