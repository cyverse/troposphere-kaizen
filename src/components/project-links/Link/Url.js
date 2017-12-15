import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { MediaCardLink } from 'cyverse-ui-next';

export default createReactClass({
    displayName: 'URL',

    propTypes: {
        link: PropTypes.object.isRequired
    },

    render: function () {
        const { link } = this.props;

        return (
          <MediaCardLink url={link.data.link} />
        );
    }
});
