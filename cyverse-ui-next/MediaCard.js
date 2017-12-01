import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

const styles = {
    height: '72px',
    position: 'relative'
};

export default createReactClass({
    displayName: 'MediaCard',

    propTypes: {
        children: PropTypes.node.isRequired
    },

    render: function () {
        let {
            children
        } = this.props;

        return (
            <div style={styles}>
                {children}
            </div>
        );
    }
});
