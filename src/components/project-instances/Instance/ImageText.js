import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import PayloadStates from '../../../constants/PayloadStates';
import { connect } from 'lore-hook-connect';

export default connect(function (getState, props) {
    const { instance } = props;

    return {
        image: getState('image.byId', {
            id: instance.data.image
        })
    }
})(
createReactClass({
    displayName: 'ImageText',

    propTypes: {
        image: PropTypes.object.isRequired
    },

    render: function () {
        const { image } = this.props;

        if (image.state === PayloadStates.FETCHING) {
            return (
                <span>...</span>
            );
        }

        return (
            <span>
                {image.data.name}
            </span>
        );
    }
})
);
