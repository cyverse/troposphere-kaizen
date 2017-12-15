import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import PayloadStates from '../../../constants/PayloadStates';
import instanceUtils from '../../../utils/instance';

export default createReactClass({
    displayName: 'Polling',

    propTypes: {
        instance: PropTypes.object.isRequired
    },

    componentDidMount() {
        const { instance } = this.props;
        this.startPolling(instance);
    },

    componentWillUnmount() {
        if (this.poll) {
            this.poll.stop();
        }
    },

    componentWillReceiveProps(nextProps) {
        const {instance} = nextProps;
        this.startPolling(instance);
        this.stopPolling(instance);
    },

    startPolling(instance) {
        if (
            !this.poll &&
            !instanceUtils(instance).isInFinalState() &&
            instance.state !== PayloadStates.MANAGED
        ) {
            this.poll = lore.polling.instance.updateV1(instance);
            this.poll.start();

            this.pollActions = lore.polling.instanceAction.refetch({
                instance_id: instance.id,
                instance_uuid: instance.data.uuid
            });
            this.pollActions.start();
        }
    },

    stopPolling(instance) {
        if (
            this.poll &&
            this.poll.isPolling &&
            instanceUtils(instance).isInFinalState() &&
            instance.state !== PayloadStates.MANAGED
        ) {
            this.poll.stop();
            this.pollActions.stop();
            lore.actions.instanceAction.refetch({
                instance_id: instance.id,
                instance_uuid: instance.data.uuid
            });
        }
    },

    render: function() {
        return null;
    }
});
