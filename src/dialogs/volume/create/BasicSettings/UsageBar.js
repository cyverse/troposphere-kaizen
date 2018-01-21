import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { BarGraph } from 'cyverse-ui-next';

export default createReactClass({
    displayName: 'UsageBar',

    propTypes: {
        title: PropTypes.string.isRequired,
        startValue: PropTypes.number.isRequired,
        afterValue: PropTypes.number.isRequired,
        alertMessage: PropTypes.node
    },

    render: function() {
        const {
            title,
            startValue,
            afterValue,
            alertMessage
        } = this.props;

        const isOverLimit = (startValue + afterValue) > 100;
        const color = isOverLimit ? '#F2453D' : 'rgba(0, 0, 0, 0.87)';
        const barColor = isOverLimit ? '#F2453D' : '#5FB760';

        return (
            <div style={{ padding: 16 }}>
                <div style={{ marginBottom: 8, color: color }}>
                    {title}
                </div>
                <BarGraph
                    startValue={startValue}
                    afterValue={afterValue}
                    barColor={barColor}
                />
                {alertMessage && (startValue + afterValue > 100) ? (
                    <div style={{ marginTop: 8, fontSize: '15px', color: color }}>
                        {alertMessage}
                    </div>
                ) :null}
            </div>
        );
    }

});
