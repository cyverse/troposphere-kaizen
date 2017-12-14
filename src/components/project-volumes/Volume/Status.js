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

export default connect(function(getState, props) {
    const { volume } = props;

    return {
        volumeV1: getState('volumeV1.byIdV1', {
            uuid: volume.data.uuid,
            provider_uuid: volume.data.provider_uuid,
            identity_uuid: volume.data.identity_uuid
        })
    }
})(
createReactClass({
    displayName: 'Status',

    propTypes: {
        volumeV1: PropTypes.object.isRequired
    },

    render: function () {
        const {
            volume,
            volumeV1
        } = this.props;

        if (volumeV1.state === PayloadStates.FETCHING) {
            return (
                <div style={styles.largePadding}>
                    ...
                </div>
            );
        }

        if (volumeV1.data.status === 'available') {
            return (
                <div style={styles.largePadding}>
                    <StatusLight status="active" /> <span style={styles.text}>Unattached</span>
                </div>
            );
        }

        if (volumeV1.data.status === 'in-use') {
            return (
                <Connect callback={(getState, props) => {
                    return {
                        instanceV1: getState('instanceV1.byIdV1', {
                            uuid: volumeV1.data.attach_data.instance_alias,
                            provider_uuid: volume.data.provider_uuid,
                            identity_uuid: volume.data.identity_uuid
                        })
                    }
                }}>
                    {(props) => {
                        const { instanceV1 } = props;
                        const percentComplete = volumeUtils(volumeV1).getPercentComplete();

                        if (instanceV1.state === PayloadStates.FETCHING) {
                            return (
                                <div style={styles.largePadding}>
                                    ...
                                </div>
                            );
                        }

                        if (!percentComplete || percentComplete === 100) {
                            return (
                                <div style={styles.largePadding}>
                                    <StatusLight status="active" /> <span style={styles.text}>{`Attached to ${instanceV1.data.name}`}</span>
                                </div>
                            );
                        }

                        return (
                            <div style={styles.smallPadding}>
                                <div style={{ marginBottom: '8px' }}>
                                    <StatusLight status="transition" /> <span style={styles.text}>{volumeV1.data.status}</span>
                                </div>
                                <LinearProgress
                                    mode="determinate"
                                    value={percentComplete}
                                    style={{ maxWidth: '80%' }}
                                />
                            </div>
                        );
                    }}
                </Connect>
            );
        }


        return (
            <div style={styles.largePadding}>
                <StatusLight status="transition" /> <span style={styles.text}>Unattached</span>
            </div>
        );
    }
})
);
