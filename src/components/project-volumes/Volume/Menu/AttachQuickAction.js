import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';
import { AttachInstanceIcon } from 'cyverse-ui/es/icons';
import AttachVolumeDialog from '../../../../dialogs/volume/attach';

const AttachQuickAction = createReactClass({
    displayName: 'AttachQuickAction',

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
                <IconButton tooltip="Attach" tooltipPosition="top-center" onClick={() => {
                    lore.dialog.show(() => {
                        return (
                            <AttachVolumeDialog
                                model={volume}
                                project={project}
                            />
                        );
                    });
                }}>
                    <AttachInstanceIcon/>
                </IconButton>
            );
        }

        return null;
    }
});

AttachQuickAction.muiName = 'IconButton';

export default AttachQuickAction;
