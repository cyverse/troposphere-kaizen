import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
    displayName: 'MediaCardUrl',

    propTypes: {
        url: PropTypes.string.isRequired,
        maxCharacters:  PropTypes.number
    },

    contextTypes: {
        muiTheme: PropTypes.object.isRequired
    },

    getDefaultProps() {
      return {
          url: '',
          maxCharacters: 100
      }
    },

    getStyles(url) {
        const { maxCharacters } = this.props;
        const { muiTheme } = this.context;

        return {
            container: {
                color: 'rgba(0, 0, 0, 0.67)',
                marginTop: '18px',
                marginBottom: '18px',
                maxHeight: '36px',
                overflow: 'hidden',
                lineHeight: url.length < maxCharacters/2 ? '36px' : '18px'
            },
            link: {
                color: muiTheme.palette.primary1Color
            }
        };
    },

    render: function () {
        let {
            url,
            maxCharacters
        } = this.props;

        const styles = this.getStyles(url);

        return (
            <div style={styles.container}>
                <a href={url} target="_blank" style={styles.link}>
                    {url.length > (maxCharacters + 3) ? `${url.slice(0, maxCharacters)}...` : url}
                </a>
            </div>
        );
    }
});
