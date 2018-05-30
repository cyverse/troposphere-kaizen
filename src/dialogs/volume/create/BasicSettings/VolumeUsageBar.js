import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { connect, Connect } from 'lore-hook-connect';
import UsageBar from './UsageBar';
import PayloadStates from '../../../../constants/PayloadStates';

export default connect((getState, props) => {
    const {
        identity,
        size
    } = props.data;

    return {
        identity: identity ? getState('identity.byId', {
            id: identity
        }) : null,
        size: size ? Number(size) : null
    };
})(
createReactClass({
    displayName: 'VolumeUsageBar',

    propTypes: {
        identity: PropTypes.object,
        size: PropTypes.number,
    },

    render: function() {
        const {
            identity,
            size
        } = this.props;

        if (!identity || identity.state === PayloadStates.FETCHING) {
            return (
                <UsageBar
                    title="Please select a provider to view the number of available volumes"
                    startValue={0}
                    afterValue={0}
                />
            );
        }

        return (
            <Connect callback={(getState, props) => {
                return {
                    quota: getState('quota.byId', {
                        id: identity.data.quota
                    }),
                    volumes: getState('volume.find', {
                        where: {
                            provider: identity.data.provider
                        },
                        exclude: function(volume) {
                            return volume.data.provider !== identity.data.provider;
                        }
                    })
                }
            }}>
                {(props) => {
                    const {
                        quota,
                        volumes
                    } = props;

                    if (
                        quota.state === PayloadStates.FETCHING ||
                        volumes.state === PayloadStates.FETCHING
                    ) {
                        return (
                            <UsageBar
                                title="Calculating available volumes..."
                                startValue={0}
                                afterValue={0}
                            />
                        );
                    }

                    const startPercent = volumes.data.length/quota.data.storage_count*100;
                    const afterPercent = 1/quota.data.storage_count*100;

                    return (
                        <UsageBar
                            title={`Will use ${volumes.data.length + 1} of ${quota.data.storage_count} allotted volumes`}
                            startValue={startPercent}
                            afterValue={afterPercent}
                            alertMessage={(
                                <div>
                                    <strong>Volume quota exceeded.</strong> You must delete an existing volume before creating a new one.
                                </div>
                            )}
                        />
                    )
                }}
            </Connect>
        );
    }

})
);
