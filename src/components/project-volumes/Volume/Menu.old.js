import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MenuItem, Divider } from 'material-ui';
import {
    ActionDelete,
    FileFolder,
    EditorModeEdit,
    NavigationChevronLeft
} from 'material-ui/svg-icons';
import {
    IntercomIcon
} from 'cyverse-ui/es/icons';
import { connect } from 'lore-hook-connect';
import { MediaCardMenu } from 'cyverse-ui-next';
import PayloadStates from '../../../constants/PayloadStates';
import AttachVolumeDialog from '../../../dialogs/volume/attach';
import DetachVolumeDialog from '../../../dialogs/volume/detach';

export default createReactClass({
    displayName: 'Menu',

    propTypes: {
        volume: PropTypes.object.isRequired
    },

    getStyles: function() {
        const { volume } = this.props;

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

    actionEnabled(actionName) {
        const {actions} = this.props;

        return !!_.find(actions.data, (action) => {
            return action.data.name === actionName;
        })
    },

    render: function () {
        const { volume } = this.props;
        const styles = this.getStyles();

        return (
            <MediaCardMenu>
                <MenuItem
                    primaryText="Actions"
                    leftIcon={<NavigationChevronLeft />}
                    menuItems={[
                        <MenuItem
                            primaryText="Attach"
                            // leftIcon={<IntercomIcon />}
                            // disabled={!this.actionEnabled('Reboot')}
                            onClick={() => {
                                lore.dialog.show(() => {
                                    return (
                                        <AttachVolumeDialog model={volume} />
                                    );
                                });
                            }}
                        />,
                        <MenuItem
                            primaryText="Detach"
                            // leftIcon={<IntercomIcon />}
                            // disabled={!this.actionEnabled('Redeploy')}
                            onClick={() => {
                                lore.dialog.show(() => {
                                    return (
                                        <DetachVolumeDialog model={volume} />
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
                    primaryText="Delete"
                    leftIcon={<ActionDelete />}
                    disabled={true}
                />
                <MenuItem
                    primaryText="Move Volume"
                    leftIcon={<FileFolder />}
                    disabled={true}
                />
                <MenuItem
                    primaryText="Edit"
                    leftIcon={<EditorModeEdit />}
                    disabled={true}
                />
            </MediaCardMenu>
        );
    }
});
