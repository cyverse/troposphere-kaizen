import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { connect } from 'lore-hook-connect';
import UsageBar from './UsageBar';

export default connect((getState, props) => {
    const { allocation_source } = props.data;

    return {
      allocationSource: allocation_source ? getState('allocationSource.byId', {
          id: allocation_source
      }) : null
    };
})(
createReactClass({
    displayName: 'AllocationUsageBar',

    propTypes: {
        allocationSource: PropTypes.object
    },

    render: function() {
        const { allocationSource } = this.props;

        if (!allocationSource) {
            return (
                <UsageBar
                    title="Please select an allocation source to view the available allocation"
                    value={0}
                />
            );
        }

        return (
            <UsageBar
                title={`Have used ${allocationSource.data.compute_used} of ${allocationSource.data.compute_allowed} AUs from this Allocation Source`}
                value={40}
            />
        );
    }

})
);
