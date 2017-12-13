import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { MenuItem } from 'material-ui';
import {
    ContentSave,
    ActionPowerSettingsNew,
    ActionDelete,
    FileFolder,
    SocialPersonAdd,
    CommunicationVpnKey,
    NavigationChevronLeft
} from 'material-ui/svg-icons';
import {
    IntercomIcon,
    AttachInstanceIcon,
    BootscriptIcon,
    IPIcon
} from 'cyverse-ui/es/icons';
import {
    MediaCard,
    MediaCardSection,
    MediaCardMenu
} from 'cyverse-ui-next';
import PayloadStates from '../../../constants/PayloadStates';
import Identity from './Identity';
import Status from './Status';
import Size from './Size';
import Provider from './Provider';

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
                <MediaCardSection width="35%">
                    <Identity instance={instance} />
                </MediaCardSection>
                <MediaCardSection left="35%" width="15%">
                    <Status instance={instance} />
                </MediaCardSection>
                <MediaCardSection left="50%" width="15%">
                    <Size instance={instance} />
                </MediaCardSection>
                <MediaCardSection left="65%" width="30%">
                    <Provider instance={instance} />
                </MediaCardSection>
                <MediaCardSection right="0%" width="inherit">
                    <MediaCardMenu>
                        <MenuItem
                            primaryText="Report"
                            leftIcon={<IntercomIcon />}
                            disabled={true}
                        />
                        <MenuItem
                            primaryText="Request Image"
                            leftIcon={<ContentSave />}
                            disabled={true}
                        />
                        <MenuItem
                            primaryText="Reboot"
                            leftIcon={<ActionPowerSettingsNew />}
                            disabled={true}
                        />
                        <MenuItem
                            primaryText="Delete"
                            leftIcon={<ActionDelete />}
                            disabled={true}
                        />
                        <MenuItem
                            primaryText="Attach Volume"
                            leftIcon={<AttachInstanceIcon />}
                            disabled={true}
                        />
                        <MenuItem
                            primaryText="Move to Project"
                            leftIcon={<FileFolder />}
                            disabled={true}
                        />
                        <MenuItem
                            primaryText="Advanced"
                            leftIcon={<NavigationChevronLeft />}
                            menuItems={[
                                <MenuItem
                                    primaryText="Share"
                                    leftIcon={<SocialPersonAdd />}
                                    disabled={true}
                                />,
                                <MenuItem
                                    primaryText="Add SSH Key"
                                    leftIcon={<CommunicationVpnKey />}
                                    disabled={true}
                                />,
                                <MenuItem
                                    primaryText="Add Bootscript"
                                    leftIcon={<BootscriptIcon />}
                                    disabled={true}
                                />,
                                <MenuItem
                                    primaryText="Add Floating IP"
                                    leftIcon={<IPIcon />}
                                    disabled={true}
                                />,
                            ]}
                        />
                    </MediaCardMenu>
                </MediaCardSection>
            </MediaCard>
        );
    }
});
