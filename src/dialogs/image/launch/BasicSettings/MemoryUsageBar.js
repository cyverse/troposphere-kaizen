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
        size: size ? getState('size.byId', {
            id: size
        }) : null
    };
})(
createReactClass({
    displayName: 'MemoryUsageBar',

    propTypes: {
        identity: PropTypes.object,
        size: PropTypes.object,
    },

    render: function() {
        const {
            identity,
            size
        } = this.props;

        if (!identity || identity.state === PayloadStates.FETCHING) {
            return (
                <UsageBar
                    title="Please select a provider to view the amount of available memory"
                    value={0}
                />
            );
        }

        if (!size || size.state === PayloadStates.FETCHING) {
            return (
                <UsageBar
                    title="Please select a size to view the amount of available memory"
                    value={0}
                />
            );
        }

        return (
            <Connect callback={(getState, props) => {
                return {
                    quota: getState('quota.byId', {
                        id: identity.data.quota
                    })
                }
            }}>
                {(props) => {
                    const { quota } = props;

                    if (quota.state === PayloadStates.FETCHING) {
                        return (
                            <UsageBar
                                title="Calculating available memory..."
                                value={0}
                            />
                        );
                    }

                    return (
                        <UsageBar
                            title={`Will use ${size.data.mem/1024} of ${quota.data.memory} allotted GBs of memory`}
                            value={size.data.mem/1024/quota.data.memory*100}
                        />
                    )
                }}
            </Connect>
        );
    }

})
);
