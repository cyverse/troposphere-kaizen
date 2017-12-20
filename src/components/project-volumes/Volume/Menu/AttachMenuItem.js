import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MenuItem } from 'material-ui';
import { connect, Connect } from 'lore-hook-connect';
import PayloadStates from '../../../../constants/PayloadStates';
import AttachVolumeDialog from '../../../../dialogs/volume/attach';

const DetachMenuItem = createReactClass({
    displayName: 'AttachMenuItem',

    propTypes: {
        volume: PropTypes.object.isRequired,
        project: PropTypes.object.isRequired
    },

    render: function () {
        const {
            volume,
            project
        } = this.props;

        if (volume.data.state.status === 'available') {
            return (
                <MenuItem
                    primaryText="Attach"
                    // leftIcon={<IntercomIcon />}
                    disabled={false}
                    onClick={() => {
                        lore.dialog.show(() => {
                            return (
                                <AttachVolumeDialog
                                    model={volume}
                                    project={project}
                                />
                            );
                        });
                    }}
                />
            );
        }

        return (
            <MenuItem
                primaryText="Attach"
                // leftIcon={<IntercomIcon />}
                disabled={true}
            />
        );
    }
});

DetachMenuItem.muiName = 'MenuItem';

export default DetachMenuItem;
