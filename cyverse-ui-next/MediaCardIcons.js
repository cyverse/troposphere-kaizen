import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

const styles = {
    paddingTop: '18px',
    paddingBottom: '18px',
    marginLeft: '-12px'
};

export default createReactClass({
    displayName: 'MediaCardIcons',

    propTypes: {
        children: PropTypes.node.isRequired,
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
