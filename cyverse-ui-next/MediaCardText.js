import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
    displayName: 'MediaCardText',

    propTypes: {
        text: PropTypes.string.isRequired
    },

    getDefaultProps() {
        return {
            text: ''
        }
    },

    getStyles() {
        return {
            color: 'rgba(0, 0, 0, 0.67)',
            marginTop: '18px',
            marginBottom: '18px',
            maxHeight: '36px',
            overflow: 'hidden',
            lineHeight: '36px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        };
    },

    render: function () {
        let { text } = this.props;
        const styles = this.getStyles();

        return (
            <div style={styles}>
                {text}
            </div>
        );
    }
});
