import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import PayloadStates from '../../../constants/PayloadStates';
import { connect } from 'lore-hook-connect';

const styles = {
    paddingTop: '27px',
    paddingBottom: '27px'
};

export default connect(function (getState, props) {
    const { instance } = props;

    return {
        size: getState('size.byId', {
            id: instance.data.size
        })
    }
})(
createReactClass({
    displayName: 'Size',

    propTypes: {
        size: PropTypes.object.isRequired
    },

    render: function () {
        const {size} = this.props;

        if (size.state === PayloadStates.FETCHING) {
            return (
                <div style={styles}>
                    ...
                </div>
            );
        }

        return (
            <div style={styles}>
                {size.data.name}
            </div>
        );
    }
})
);
