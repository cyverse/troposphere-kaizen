import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
    displayName: 'StatusText',

    propTypes: {
        instance: PropTypes.object.isRequired
    },

    getInstanceState(instance) {
        if (instance.data.end_date) {
            return {
                status: 'deleted',
                activity: ''
            }
        }

        return instance.data.state;
    },

    render: function() {
        const { instance } = this.props;
        const { status, activity } = this.getInstanceState(instance);

        return (
            <span className="status-text">
                {activity ? `${status} / ${activity}` : status}
            </span>
        );
    }
});
