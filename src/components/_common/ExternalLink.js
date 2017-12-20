import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

export default createReactClass({
    displayName: 'ExternalLink',

    propTypes: {
        href: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired
    },

    contextTypes: {
      muiTheme: PropTypes.object.isRequired
    },

    render: function () {
        const {
            href,
            children
        } = this.props;

        const { muiTheme } = this.context;

        return (
            <a href={href} target="_blank" style={{ color: muiTheme.palette.primary1Color }}>
                {children}
            </a>
        );
    }

});
