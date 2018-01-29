import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
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
import { MediaCardMenu } from 'cyverse-ui-next';
import AttachMenuItem from './AttachMenuItem';
import DetachMenuItem from './DetachMenuItem';

export default createReactClass({
    displayName: 'Menu',

    propTypes: {
        volume: PropTypes.object.isRequired,
        project: PropTypes.object.isRequired
    },

    render: function () {
        const { volume, project } = this.props;

        return (
            <MediaCardMenu>
                <MenuItem
                    primaryText="Actions"
                    leftIcon={<NavigationChevronLeft />}
                    menuItems={[
                        <AttachMenuItem
                            volume={volume}
                            project={project}
                        />,
                        <DetachMenuItem volume={volume} />
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
