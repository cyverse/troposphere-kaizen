import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default createReactClass({
    displayName: 'MediaCard',

    propTypes: {
        children: PropTypes.node.isRequired,
        style: PropTypes.object
    },

    getStyles: function() {
        const { style } = this.props;

        return _.merge({
            height: '72px',
            position: 'relative'
        }, style);
    },

    render: function () {
        let {
            children
        } = this.props;

        const styles = this.getStyles();

        return (
            <div style={styles}>
                {children}
            </div>
        );
    }
});
