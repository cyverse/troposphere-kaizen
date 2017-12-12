import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
    displayName: 'MediaCardSection',

    propTypes: {
        left: PropTypes.string,
        right: PropTypes.string,
        width: PropTypes.string,
    },

    getStyles() {
        let {
            left,
            right,
            width
        } = this.props;

        return {
            position: 'absolute',
            left: left,
            right: right,
            width: width || '100%'
        };
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
