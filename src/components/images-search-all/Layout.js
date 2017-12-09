import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Images from '../images-search/_common/Images';

export default createReactClass({
    displayName: 'Layout',

    propTypes: {
        location: PropTypes.object.isRequired
    },

    render: function () {
        const { location } = this.props;

        return (
            <Images query={{
                search: location.query.search
            }} />
        );
    }

});
