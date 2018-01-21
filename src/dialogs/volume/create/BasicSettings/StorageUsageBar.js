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
    displayName: 'StorageUsageBar',

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
                    title="Please select a provider to view the amount of available storage"
                    startValue={0}
                    afterValue={0}
                />
            );
        }

        if (!size) {
            return (
                <UsageBar
                    title="Please specify a size to view the amount of available storage"
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
                        exclude: {
                            where: function(volume) {
                                return volume.data.provider !== identity.data.provider;
                            }
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
                                title="Calculating available storage..."
                                startValue={0}
                                afterValue={0}
                            />
                        );
                    }

                    const usedStorageSum = _.reduce(volumes.data, function(sum, volume) {
                        return sum + volume.data.size;
                    }, 0);

                    const startPercent = usedStorageSum/quota.data.storage*100;
                    const afterPercent = size/quota.data.storage*100;

                    return (
                        <UsageBar
                            title={`Will use ${usedStorageSum + size} of ${quota.data.storage} allotted GBs of storage`}
                            startValue={startPercent}
                            afterValue={afterPercent}
                            alertMessage={(
                                <div>
                                    <strong>Storage quota exceeded.</strong> Choose a smaller size or delete an existing volume.
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
