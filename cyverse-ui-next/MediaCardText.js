import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
    displayName: 'MediaCardText',

    propTypes: {
        text: PropTypes.string.isRequired
    },

    getStyles(text) {
        return {
            color: 'rgba(0, 0, 0, 0.67)',
            marginTop: '18px',
            marginBottom: '18px',
            maxHeight: '36px',
            overflow: 'hidden',
            lineHeight: text.length < 50 ? '36px' : '18px'
        };
    },

    render: function () {
        let {
            text
        } = this.props;

        const styles = this.getStyles(text);

        return (
            <div style={styles}>
                {text.length > 103 ? `${text.slice(0, 100)}...` : text}
            </div>
        );
    }
});
