import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Paper } from 'material-ui';

const styles = {
    paper: {
        height: '28px',
        position: 'relative',
        marginTop: '4px',
        marginBottom: '4px'
    },
    table: {
        fontSize: '14px',
        width: '100%',
        color: 'rgba(0, 0, 0, 0.54)',
        lineHeight: '28px'
    }
};

export default createReactClass({
    displayName: 'ListHeader',

    propTypes: {
      children: PropTypes.node.isRequired
    },

    render: function () {
        const { children } = this.props;

        return (
            <Paper style={styles.paper}>
                <div style={styles.table}>
                    <div style={{ position: 'relative' }}>
                        {children}
                    </div>
                </div>
            </Paper>
        );
    }

});
