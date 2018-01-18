import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { FloatingActionButton } from 'cyverse-ui-next';

const styles = {
    position: 'absolute',
    top: '-28px',
    right: 15
};

export default createReactClass({
    displayName: 'FloatingActionButton',

    propTypes: {
        onClick: PropTypes.func.isRequired
    },

    render: function () {
        const { onClick } = this.props;

        return (
            <FloatingActionButton
                backgroundColor="#5DCAFB"
                style={styles}
                onClick={onClick}
            />
        );
    }

});
