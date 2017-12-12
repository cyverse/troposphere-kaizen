import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import { ListTabs } from 'cyverse-ui-next';

const styles = {
    tabItemContainerStyle: {
        height: '56px'
    }
};

export default createReactClass({
    displayName: 'Subheader/Tabs',

    propTypes: {
        children: PropTypes.node.isRequired
    },

    render: function () {
        const {
            children,
            ...other
        } = this.props;

        return (
            <ListTabs tabWidth={200} height="56px" style={styles} {...other}>
                {children}
            </ListTabs>
        );
    }

});
