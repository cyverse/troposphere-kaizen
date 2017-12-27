import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { LinearProgress } from 'material-ui';

export default createReactClass({
    displayName: 'UsageBar',

    propTypes: {
        title: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
    },

    render: function() {
        const {
            title,
            value
        } = this.props;

        return (
            <div style={{ padding: 16 }}>
                <div>{title}</div>
                <LinearProgress
                    mode="determinate"
                    value={value}
                    color="#5E9E21"
                    style={{ marginTop: 8, height: 8 }}
                />
            </div>
        );
    }

});
