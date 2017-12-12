import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import ImageBookmarks from './ImageBookmarks';

export default createReactClass({
    displayName: 'Layout',

    propTypes: {
        location: PropTypes.object.isRequired
    },

    render: function () {
        const { location } = this.props;

        return (
            <ImageBookmarks query={{
                search: location.query.search
            }} />
        );
    }

});
