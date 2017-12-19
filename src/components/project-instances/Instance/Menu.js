import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MenuItem, Subheader, Divider } from 'material-ui';
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
import { connect } from 'lore-hook-connect';
import { MediaCardMenu } from 'cyverse-ui-next';
import PayloadStates from '../../../constants/PayloadStates';
import RebootInstanceDialog from '../../../dialogs/instance/reboot';
import RedeployInstanceDialog from '../../../dialogs/instance/redeploy';
import ResumeInstanceDialog from '../../../dialogs/instance/resume';
import ShelveInstanceDialog from '../../../dialogs/instance/shelve';
import StartInstanceDialog from '../../../dialogs/instance/start';
import StopInstanceDialog from '../../../dialogs/instance/stop';
import SuspendInstanceDialog from '../../../dialogs/instance/suspend';
import UnshelveInstanceDialog from '../../../dialogs/instance/unshelve';

export default connect(function(getState, props) {
    const { instance } = props;

    return {
        actions: getState('instanceAction.find', {
            where: {
                instance_id: instance.id,
                instance_uuid: instance.data.uuid
            }
        })
    }
})(
createReactClass({
    displayName: 'Menu',

    propTypes: {
        instance: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
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

    actionEnabled(actionName) {
        const {actions} = this.props;

        return !!_.find(actions.data, (action) => {
            return action.data.name === actionName;
        })
    },

    render: function () {
        const { instance } = this.props;
        const styles = this.getStyles();

        return (
            <MediaCardMenu>
                <MenuItem
                    primaryText="Actions"
                    leftIcon={<NavigationChevronLeft />}
                    menuItems={[
                        <MenuItem
                            primaryText="Reboot"
                            // leftIcon={<IntercomIcon />}
                            disabled={!this.actionEnabled('Reboot')}
                            onClick={() => {
                                lore.dialog.show(() => {
                                    return (
                                        <RebootInstanceDialog model={instance} />
                                    );
                                });
                            }}
                        />,
                        <MenuItem
                            primaryText="Redeploy"
                            // leftIcon={<IntercomIcon />}
                            disabled={!this.actionEnabled('Redeploy')}
                            onClick={() => {
                                lore.dialog.show(() => {
                                    return (
                                        <RedeployInstanceDialog model={instance} />
                                    );
                                });
                            }}
                        />,
                        <MenuItem
                            primaryText="Resume"
                            // leftIcon={<IntercomIcon />}
                            disabled={!this.actionEnabled('Resume')}
                            onClick={() => {
                                lore.dialog.show(() => {
                                    return (
                                        <ResumeInstanceDialog model={instance} />
                                    );
                                });
                            }}
                        />,
                        <MenuItem
                            primaryText="Shelve"
                            // leftIcon={<IntercomIcon />}
                            disabled={!this.actionEnabled('Shelve')}
                            onClick={() => {
                                lore.dialog.show(() => {
                                    return (
                                        <ShelveInstanceDialog model={instance} />
                                    );
                                });
                            }}
                        />,
                        <MenuItem
                            primaryText="Start"
                            // leftIcon={<IntercomIcon />}
                            disabled={!this.actionEnabled('Start')}
                            onClick={() => {
                                lore.dialog.show(() => {
                                    return (
                                        <StartInstanceDialog model={instance} />
                                    );
                                });
                            }}
                        />,
                        <MenuItem
                            primaryText="Stop"
                            // leftIcon={<IntercomIcon />}
                            disabled={!this.actionEnabled('Stop')}
                            onClick={() => {
                                lore.dialog.show(() => {
                                    return (
                                        <StopInstanceDialog model={instance} />
                                    );
                                });
                            }}
                        />,
                        <MenuItem
                            primaryText="Suspend"
                            // leftIcon={<IntercomIcon />}
                            disabled={!this.actionEnabled('Suspend')}
                            onClick={() => {
                                lore.dialog.show(() => {
                                    return (
                                        <SuspendInstanceDialog model={instance} />
                                    );
                                });
                            }}
                        />,
                        <MenuItem
                            primaryText="Unshelve"
                            // leftIcon={<IntercomIcon />}
                            disabled={!this.actionEnabled('Unshelve')}
                            onClick={() => {
                                lore.dialog.show(() => {
                                    return (
                                        <UnshelveInstanceDialog model={instance} />
                                    );
                                });
                            }}
                        />
                    ]}
                />
                <Divider />
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
        );
    }
})
);
