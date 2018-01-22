import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';
import { Connect } from 'lore-hook-connect';
import { DetachInstanceIcon } from 'cyverse-ui/es/icons';
import DetachVolumeDialog from '../../../../dialogs/volume/detach';
import PayloadStates from '../../../../constants/PayloadStates';

const DetachQuickAction = createReactClass({
    displayName: 'DetachQuickAction',

    propTypes: {
        volume: PropTypes.object.isRequired
    },

    render: function () {
        const { volume } = this.props;

        if (volume.data.state.status_raw === 'in-use') {
            return (
                <Connect callback={(getState, props) => {
                    return {
                        instanceV1: getState('instanceV1.byIdV1', {
                            uuid: volume.data.attach_data.instance_alias,
                            provider_uuid: volume.data.provider_uuid,
                            identity_uuid: volume.data.identity_uuid
                        })
                    }
                }}>
                    {(props) => {
                        const { instanceV1 } = props;

                        if (instanceV1.state === PayloadStates.FETCHING) {
                            return (
                                <IconButton tooltip="Detach" tooltipPosition="top-center" disabled={true}>
                                    <DetachInstanceIcon/>
                                </IconButton>
                            );
                        }

                        return (
                            <IconButton tooltip="Detach" tooltipPosition="top-center" onClick={() => {
                                lore.dialog.show(() => {
                                    return (
                                        <DetachVolumeDialog
                                            model={volume}
                                            instance={instanceV1}
                                        />
                                    );
                                });
                            }}>
                                <DetachInstanceIcon/>
                            </IconButton>
                        );
                    }}
                </Connect>
            );
        }

        return null;
    }
});

DetachQuickAction.muiName = 'IconButton';

export default DetachQuickAction;
