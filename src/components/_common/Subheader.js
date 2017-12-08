import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Paper } from 'material-ui';

const styles = {
    paper: {
        zDepth: 2
    },
    container: {
        position: 'relative'
    },
    title: {
        style: {
            fontSize: '20px',
            fontWeight: '400',
            letterSpacing: '1px',
            margin: '0px',
            lineHeight: '56px'
        }
    }
};

export default createReactClass({
    displayName: 'Layout',

    propTypes: {
        title: PropTypes.string.isRequired,
        children: PropTypes.node
    },

    render: function () {
        const {
            title,
            children
        } = this.props;

        return (
            <Paper {...styles.paper}>
                <div className="container" style={styles.container}>
                    <h1 {...styles.title}>
                        {title}
                    </h1>
                    {children}
                </div>
            </Paper>
        );
    }

});
