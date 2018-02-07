import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Avatar } from 'material-ui';
import moment from 'moment';
import ColorHash from 'color-hash';
import { ProgressAvatar } from 'cyverse-ui-next';
import PayloadStates from '../../../constants/PayloadStates';
import volumeUtils from '../../../utils/volume';

export default createReactClass({
    displayName: 'Avatar',

    propTypes: {
        volume: PropTypes.object.isRequired
    },

    getOpacity() {
        const { volume } = this.props;
        const percentComplete = volumeUtils(volume).getPercentComplete();
        let opacity = 1;

        if (percentComplete < 100) {
            opacity = 0.5;
        }

        if (
            volume.state === PayloadStates.UPDATING ||
            volume.state === PayloadStates.MANAGED
        ) {
            opacity = 0.3;
        }

        return opacity;
    },

    render: function () {
        const { volume, ...other } = this.props;
        const percentComplete = volumeUtils(volume).getPercentComplete();
        const colorHash = new ColorHash();
        const opacity = this.getOpacity();

        if (percentComplete < 100) {
            return (
                <ProgressAvatar percent={percentComplete} {...other}>
                    <div style={{ padding: '3px' }}>
                        <Avatar size={34} className="avatar-breathe" backgroundColor={colorHash.hex(volume.id)}>
                            {_.toUpper(volume.data.name[0])}
                        </Avatar>
                    </div>
                </ProgressAvatar>
            );
        }

        return (
            <div { ...other }>
                <Avatar backgroundColor={colorHash.hex(volume.id)} style={{ opacity: opacity }}>
                    {_.toUpper(volume.data.name[0])}
                </Avatar>
            </div>
        );
    }
});
