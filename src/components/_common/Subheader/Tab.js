import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import { ListTab } from 'cyverse-ui-next';

const styles = {
    style: {
        lineHeight: '48px',
        height: '56px'
    }
};

export default createReactClass({
    displayName: 'Subheader/Tab',

    propTypes: {
        children: PropTypes.node
    },

    render: function () {
        const {
            children,
            ...other
        } = this.props;

        return (
            <ListTab
                style={styles}
                {...other}
            />
        );
    }

});
