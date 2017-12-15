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
    displayName: 'Instance',

    propTypes: {
        instance: PropTypes.object.isRequired
    },

    getStyles: function() {
        const { instance } = this.props;

        if (
            instance.state === PayloadStates.CREATING ||
            instance.state === PayloadStates.UPDATING ||
            instance.state === PayloadStates.DELETING
        ) {
            return {
              opacity: '0.3'
            }
        }

        return {};
    },

    render: function () {
        const { instance } = this.props;
        const styles = this.getStyles();

        return (
            <MediaCard style={styles}>
                <Polling instance={instance} />
                <MediaCardSection width="30%">
                    <Identity instance={instance} />
                </MediaCardSection>
                <MediaCardSection left="30%" width="20%">
                    <Status instance={instance} />
                </MediaCardSection>
                <MediaCardSection left="50%" width="15%">
                    <Size instance={instance} />
                </MediaCardSection>
                <MediaCardSection left="65%" width="30%">
                    <Provider instance={instance} />
                </MediaCardSection>
                <MediaCardSection right="0%" width="inherit">
                    <Menu instance={instance} />
                </MediaCardSection>
            </MediaCard>
        );
    }
});
