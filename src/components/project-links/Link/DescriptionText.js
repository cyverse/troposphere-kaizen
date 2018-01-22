import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
    displayName: 'DescriptionText',

    propTypes: {
        link: PropTypes.object.isRequired
    },

    render: function () {
        const { link } = this.props;

        return (
            <span className="description-text">
                {link.data.description}
            </span>
        );
    }
});
