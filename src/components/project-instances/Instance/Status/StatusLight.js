import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import instanceUtils from '../../../../utils/instance';

export default createReactClass({
    displayName: 'StatusLight',

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

    getLightStatus(instance) {
        const {
            activity,
            status
        } = this.getInstanceState(instance);

        if (activity || status === 'build') {
            return 'transition breathe';
        }

        if (status === 'active') {
            return 'active';
        }

        if (instanceUtils(instance).isInactive()) {
            return 'inactive';
        }

        if (status === 'deleted') {
            return 'deleted';
        }

        if (instanceUtils(instance).isDeployError()) {
            return 'error';
        }

        return 'error';
    },

    render: function () {
        const { instance } = this.props;
        const status = this.getLightStatus(instance);

        return (
            <span className={`status-light ${status}`} />
        );
    }
});
