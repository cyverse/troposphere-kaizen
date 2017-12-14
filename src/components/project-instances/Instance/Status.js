import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui';
import StatusLight from './StatusLight';
import instanceUtils from '../../../utils/instance';

export default createReactClass({
    displayName: 'Status',

    propTypes: {
        instance: PropTypes.object.isRequired
    },

    getLightStatus() {
        const { instance } = this.props;

        const {
            activity,
            status
        } = this.getInstanceState();

        if (activity || status === 'build') {
            return 'transition';
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

    getInstanceState() {
        const { instance } = this.props;

        if (instance.data.end_date) {
            return {
                status: 'deleted',
                activity: ''
            }
        }

        return instance.data.state;
    },

    render: function () {
        const { instance } = this.props;
        const { status } = this.getInstanceState();
        const lightStatus = this.getLightStatus();
        const percentComplete = instanceUtils(instance).getPercentComplete();

        if (!percentComplete || percentComplete === 100) {
            return (
                <div style={{ paddingTop: '27px', paddingBottom: '27px' }}>
                    <StatusLight status={lightStatus} /> <span style={{ textTransform: 'capitalize' }}>{status}</span>
                </div>
            );
        }

        return (
            <div style={{ paddingTop: '21px', paddingBottom: '21px' }}>
                <div style={{ marginBottom: '8px' }}>
                    <StatusLight status={lightStatus} /> <span style={{ textTransform: 'capitalize' }}>{status}</span>
                </div>
                <LinearProgress
                    mode="determinate"
                    value={percentComplete}
                    style={{ maxWidth: '80%' }}
                />
            </div>
        );
    }
});
