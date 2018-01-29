import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Connect } from 'lore-hook-connect';
import PayloadStates from '../../../../constants/PayloadStates';

export default createReactClass({
    displayName: 'StatusText',

    propTypes: {
        volume: PropTypes.object.isRequired
    },

    render: function () {
        const { volume } = this.props;

        if (volume.data.state.status === 'available') {
            return (
                <span className="status-text">
                    Unattached
                </span>
            );
        }

        if (volume.data.state.status === 'in-use') {
            return (
                <Connect callback={(getState, props) => {
                    return {
                        instanceV1: getState('instanceV1.byIdV1', {
                            uuid: volume.data.attach_data.instance_alias,
                            provider_uuid: volume.data.provider_uuid,
                            identity_uuid: volume.data.identity_uuid
                        })
                    };
                }}>
                    {(props) => {
                        const { instanceV1 } = props;

                        if (instanceV1.state === PayloadStates.FETCHING) {
                            return (
                                <span className="status-text">
                                    ...
                                </span>
                            );
                        }

                        return (
                            <span className="status-text">
                                {`Attached to ${instanceV1.data.name}`}
                            </span>
                        );
                    }}
                </Connect>
            );
        }

        return (
            <span className="status-text">
                {volume.data.state.status}
            </span>
        );
    }
});
