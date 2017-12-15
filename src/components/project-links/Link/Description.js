import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { MediaCardText } from 'cyverse-ui-next';

export default createReactClass({
    displayName: 'Description',

    propTypes: {
        link: PropTypes.object.isRequired
    },

    render: function () {
        const { link } = this.props;

        return (
            <MediaCardText text={link.data.description} />
        );
    }
});
