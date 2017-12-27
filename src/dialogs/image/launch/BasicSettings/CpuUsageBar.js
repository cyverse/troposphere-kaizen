import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { connect, Connect } from 'lore-hook-connect';
import PayloadStates from '../../../../constants/PayloadStates';
import UsageBar from './UsageBar';

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
    displayName: 'CpuUsageBar',

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
                    title="Please select a provider to view the number of available CPUs"
                    value={0}
                />
            );
        }

        if (!size || size.state === PayloadStates.FETCHING) {
            return (
                <UsageBar
                    title="Please select a size to view the number of available CPUs"
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
                                title="Calculating available CPUs..."
                                value={0}
                            />
                        );
                    }

                    return (
                        <UsageBar
                            title={`Will use ${size.data.cpu} of ${quota.data.cpu} allotted CPUs`}
                            value={size.data.cpu/quota.data.cpu*100}
                        />
                    )
                }}
            </Connect>
        );
    }

})
);
