import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { connect } from 'lore-hook-connect';
import PayloadStates from '../../../constants/PayloadStates';
import volumeUtils from '../../../utils/volume';

export default createReactClass({
    displayName: 'Polling',

    propTypes: {
        volume: PropTypes.object.isRequired
    },

    componentDidMount() {
        const { volume } = this.props;
        this.startPolling(volume);
    },

    componentWillUnmount() {
        if (this.poll) {
            this.poll.stop();
        }
    },

    componentWillReceiveProps(nextProps) {
        const { volume } = nextProps;
        this.startPolling(volume);
        this.stopPolling(volume);
    },

    startPolling(volume) {
        if (
            !this.poll &&
            !volumeUtils(volume).isInFinalState() &&
            volume.state !== PayloadStates.MANAGED
        ) {
            this.poll = lore.polling.volume.get(volume.id);
            this.poll.start();
        }
    },

    stopPolling(volume) {
        if (
            this.poll &&
            this.poll.isPolling &&
            volumeUtils(volume).isInFinalState() &&
            volume.state !== PayloadStates.MANAGED
        ) {
            this.poll.stop();
        }
    },

    render: function() {
        return null;
    }
});
