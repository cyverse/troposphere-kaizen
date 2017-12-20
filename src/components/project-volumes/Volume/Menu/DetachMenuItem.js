import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MenuItem } from 'material-ui';
import { connect, Connect } from 'lore-hook-connect';
import PayloadStates from '../../../../constants/PayloadStates';
import DetachVolumeDialog from '../../../../dialogs/volume/detach';

const DetachMenuItem = createReactClass({
    displayName: 'DetachMenuItem',

    propTypes: {
        volume: PropTypes.object.isRequired
    },

    actionEnabled(actionName) {
        const { actions } = this.props;

        return !!_.find(actions.data, (action) => {
            return action.data.name === actionName;
        })
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

                        return (
                            <MenuItem
                                primaryText="Detach"
                                // leftIcon={<IntercomIcon />}
                                // disabled={!this.actionEnabled('Redeploy')}
                                onClick={() => {
                                    lore.dialog.show(() => {
                                        return (
                                            <DetachVolumeDialog
                                                model={volume}
                                                instance={instanceV1}
                                            />
                                        );
                                    });
                                }}
                            />
                        );
                    }}
                </Connect>
            );
        }

        return (
            <MenuItem
                primaryText="Detach"
                // leftIcon={<IntercomIcon />}
                disabled={true}
            />
        );
    }
});

DetachMenuItem.muiName = 'MenuItem';

export default DetachMenuItem;
