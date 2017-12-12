import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
    displayName: 'MediaCardText',

    propTypes: {
        text: PropTypes.string.isRequired,
        maxCharacters:  PropTypes.number
    },

    getDefaultProps() {
      return {
          maxCharacters: 100
      }
    },

    getStyles(text) {
        const { maxCharacters } = this.props;

        return {
            color: 'rgba(0, 0, 0, 0.67)',
            marginTop: '18px',
            marginBottom: '18px',
            maxHeight: '36px',
            overflow: 'hidden',
            lineHeight: text.length < maxCharacters/2 ? '36px' : '18px'
        };
    },

    render: function () {
        let {
            text,
            maxCharacters
        } = this.props;

        const styles = this.getStyles(text);

        return (
            <div style={styles}>
                {text.length > (maxCharacters + 3) ? `${text.slice(0, maxCharacters)}...` : text}
            </div>
        );
    }
});
