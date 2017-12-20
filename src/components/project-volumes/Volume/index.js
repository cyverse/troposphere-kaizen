import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import {
    MediaCard,
    MediaCardSection
} from 'cyverse-ui-next';
import PayloadStates from '../../../constants/PayloadStates';
import Identity from './Identity';
import Status from './Status';
import Size from './Size';
import Provider from './Provider';
import Menu from './Menu';
import Polling from './Polling';

export default createReactClass({
    displayName: 'Volume',

    propTypes: {
        volume: PropTypes.object.isRequired,
        project: PropTypes.object.isRequired
    },

    getStyles: function() {
        const {
            volume
        } = this.props;

        if (
            volume.state === PayloadStates.CREATING ||
            volume.state === PayloadStates.UPDATING ||
            volume.state === PayloadStates.DELETING
        ) {
            return {
              opacity: '0.3'
            }
        }

        return {};
    },

    render: function () {
        const {
            volume,
            project
        } = this.props;
        const styles = this.getStyles();

        return (
            <MediaCard style={styles}>
                <Polling volume={volume} />
                <MediaCardSection width="30%">
                    <Identity volume={volume} />
                </MediaCardSection>
                <MediaCardSection left="30%" width="20%">
                    <Status volume={volume} />
                </MediaCardSection>
                <MediaCardSection left="50%" width="15%">
                    <Size volume={volume} />
                </MediaCardSection>
                <MediaCardSection left="65%" width="30%">
                    <Provider volume={volume} />
                </MediaCardSection>
                <MediaCardSection right="0%" width="inherit">
                    <Menu
                        volume={volume}
                        project={project}
                    />
                </MediaCardSection>
            </MediaCard>
        );
    }
});
