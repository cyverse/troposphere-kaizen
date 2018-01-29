import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
    displayName: 'UrlText',

    propTypes: {
        link: PropTypes.object.isRequired
    },

    render: function () {
        const { link } = this.props;

        return (
            <a className="url-text" href={link.data.link} target="_blank">
                {link.data.link}
            </a>
        );
    }
});
