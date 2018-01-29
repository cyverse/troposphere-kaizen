import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import PayloadStates from '../../../constants/PayloadStates';
import { connect } from 'lore-hook-connect';

export default connect(function (getState, props) {
    const { instance } = props;

    return {
        size: getState('size.byId', {
            id: instance.data.size
        })
    }
})(
createReactClass({
    displayName: 'SizeText',

    propTypes: {
        size: PropTypes.object.isRequired
    },

    render: function () {
        const { size } = this.props;

        if (size.state === PayloadStates.FETCHING) {
            return (
                <span>...</span>
            );
        }

        return (
            <span>
                {size.data.name}
            </span>
        );
    }
})
);
