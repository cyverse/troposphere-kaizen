import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';

const styles = {
    statusLight: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '5px',
        background: 'gray'
    },
    active: {
        background: 'green'
    },
    transition: {
        background: '#f9cb49'
    },
    error: {
        background: 'crimson'
    },
    inactive: {
        background: 'crimson'
    },
    deleted: {
        background: 'gray'
    }
};

export default createReactClass({
    displayName: 'StatusLight',

    propTypes: {
        status: PropTypes.string.isRequired
    },

    render: function () {
        const { status } = this.props;

        return (
            <span style={_.merge({},
                styles.statusLight,
                styles[status]
            )}/>
        );
    }
});
