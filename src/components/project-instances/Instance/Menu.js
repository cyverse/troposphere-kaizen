import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MenuItem, Divider } from 'material-ui';
import {
    ContentSave,
    ActionPowerSettingsNew,
    ActionDelete,
    FileFolder,
    SocialPersonAdd,
    CommunicationVpnKey,
    NavigationChevronLeft,
    AvPlayArrow,
    AvPause,
    AvStop,
    NavigationRefresh,
    FileCloudUpload,
    FileCloudDownload
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
import ImageInstanceDialog from '../../../dialogs/instance/image';

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

    actionEnabled(actionName) {
        const {actions} = this.props;

        return !!_.find(actions.data, (action) => {
            return action.data.name === actionName;
        })
    },

    render: function () {
        const { instance } = this.props;

        return (
            <MediaCardMenu>
                <MenuItem
                    primaryText="Actions"
                    leftIcon={<NavigationChevronLeft />}
                    menuItems={[
                        <MenuItem
                            primaryText="Reboot"
                            leftIcon={<ActionPowerSettingsNew />}
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
                            leftIcon={<NavigationRefresh />}
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
                            leftIcon={<AvPlayArrow />}
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
                            leftIcon={<FileCloudUpload />}
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
                            leftIcon={<AvPlayArrow />}
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
                            leftIcon={<AvStop />}
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
                            leftIcon={<AvPause />}
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
                            leftIcon={<FileCloudDownload />}
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
                    disabled={false}
                    onClick={() => {
                        lore.dialog.show(() => {
                            return (
                                <ImageInstanceDialog instance={instance} />
                            );
                        }, { template: 'fullScreenDialog' });
                    }}
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
