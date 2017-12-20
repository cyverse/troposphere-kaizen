import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui';
import { connect, Connect } from 'lore-hook-connect';
import StatusLight from './StatusLight';
import volumeUtils from '../../../utils/volume';
import PayloadStates from '../../../constants/PayloadStates';

const styles = {
    largePadding: {
        paddingTop: '27px',
        paddingBottom: '27px'
    },
    smallPadding: {
        paddingTop: '21px',
        paddingBottom: '21px'
    },
    text: {
        textTransform: 'capitalize'
    }
};

export default createReactClass({
    displayName: 'Status',

    propTypes: {
        volume: PropTypes.object.isRequired
    },

    render: function () {
        const { volume } = this.props;

        if (volume.state === PayloadStates.FETCHING) {
            return (
                <div style={styles.largePadding}>
                    ...
                </div>
            );
        }

        if (volume.data.state.status === 'available') {
            return (
                <div style={styles.largePadding}>
                    <StatusLight status="active" /> <span style={styles.text}>Unattached</span>
                </div>
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
                    }
                }}>
                    {(props) => {
                        const { instanceV1 } = props;

                        if (instanceV1.state === PayloadStates.FETCHING) {
                            return (
                                <div style={styles.largePadding}>
                                    ...
                                </div>
                            );
                        }

                        return (
                            <div style={styles.largePadding}>
                                <StatusLight status="active" /> <span>{`Attached to ${instanceV1.data.name}`}</span>
                            </div>
                        );
                    }}
                </Connect>
            );
        }

        const percentComplete = volumeUtils(volume).getPercentComplete();

        return (
            <div style={styles.smallPadding}>
                <div style={{ marginBottom: '8px' }}>
                    <StatusLight status="transition" /> <span style={styles.text}>{volume.data.state.status}</span>
                </div>
                <LinearProgress
                    mode="determinate"
                    value={percentComplete}
                    style={{ maxWidth: '80%' }}
                />
            </div>
        );
    }
});
