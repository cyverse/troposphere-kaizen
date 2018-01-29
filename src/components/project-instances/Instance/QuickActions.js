import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { IconButton } from 'material-ui';
import {
    ActionPowerSettingsNew,
    AvPlayArrow,
    AvPause,
    AvStop,
    NavigationRefresh,
    FileCloudUpload,
    FileCloudDownload
} from 'material-ui/svg-icons';
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

import { LaunchIcon } from 'cyverse-ui/es/icons';

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
    displayName: 'QuickActions',

    propTypes: {
        instance: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    },

    actionEnabled(actionName) {
        const { actions } = this.props;

        return !!_.find(actions.data, (action) => {
            return action.data.name === actionName;
        })
    },

    render: function () {
        const { instance } = this.props;

        return (
            <div ref="buttons" style={{ paddingTop: '12px', paddingBottom: '12px', display: 'inline-block' }}>
                {this.actionEnabled('Reboot') ? (
                    <IconButton tooltip="Reboot" tooltipPosition="top-center" onClick={() => {
                        lore.dialog.show(() => {
                            return (
                                <RebootInstanceDialog model={instance} />
                            );
                        });
                    }}>
                        <ActionPowerSettingsNew/>
                    </IconButton>
                ) : null}
                {this.actionEnabled('Redeploy') ? (
                    <IconButton tooltip="Redeploy" tooltipPosition="top-center" onClick={() => {
                        lore.dialog.show(() => {
                            return (
                                <RedeployInstanceDialog model={instance} />
                            );
                        });
                    }}>
                        <NavigationRefresh/>
                    </IconButton>
                ) : null}
                {this.actionEnabled('Resume') ? (
                    <IconButton tooltip="Resume" tooltipPosition="top-center" onClick={() => {
                        lore.dialog.show(() => {
                            return (
                                <ResumeInstanceDialog model={instance} />
                            );
                        });
                    }}>
                        <AvPlayArrow/>
                    </IconButton>
                ) : null}
                {this.actionEnabled('Shelve') ? (
                    <IconButton tooltip="Shelve" tooltipPosition="top-center" onClick={() => {
                        lore.dialog.show(() => {
                            return (
                                <ShelveInstanceDialog model={instance} />
                            );
                        });
                    }}>
                        <FileCloudUpload/>
                    </IconButton>
                ) : null}
                {this.actionEnabled('Start') ? (
                    <IconButton tooltip="Start" tooltipPosition="top-center" onClick={() => {
                        lore.dialog.show(() => {
                            return (
                                <StartInstanceDialog model={instance} />
                            );
                        });
                    }}>
                        <AvPlayArrow/>
                    </IconButton>
                ) : null}
                {this.actionEnabled('Stop') ? (
                    <IconButton tooltip="Stop" tooltipPosition="top-center" onClick={() => {
                        lore.dialog.show(() => {
                            return (
                                <StopInstanceDialog model={instance} />
                            );
                        });
                    }}>
                        <AvStop/>
                    </IconButton>
                ) : null}
                {this.actionEnabled('Suspend') ? (
                    <IconButton tooltip="Suspend" tooltipPosition="top-center" onClick={() => {
                        lore.dialog.show(() => {
                            return (
                                <SuspendInstanceDialog model={instance} />
                            );
                        });
                    }}>
                        <AvPause/>
                    </IconButton>
                ) : null}
                {this.actionEnabled('Unshelve') ? (
                    <IconButton tooltip="Unshelve" tooltipPosition="top-center" onClick={() => {
                        lore.dialog.show(() => {
                            return (
                                <UnshelveInstanceDialog model={instance} />
                            );
                        });
                    }}>
                        <FileCloudDownload/>
                    </IconButton>
                ) : null}
            </div>
        );
    }
})
);
