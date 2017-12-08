import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';

const styles = {
    alert: {
        padding: '15px',
        marginBottom: '20px',
        border: '1px solid transparent',
        fontSize: '14px'
    },
    danger: {
        color: '#a94442',
        backgroundColor: '#f2dede',
        borderColor: '#ebccd1'
    }
};

export default createReactClass({
    displayName: 'Error',

    propTypes: {
        error: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array,
            PropTypes.object
        ]).isRequired
    },

    render: function () {
        const { error } = this.props;
        let text = '';

        if (_.isPlainObject(error)) {
            text = JSON.stringify(error);
        } else if (_.isArray(error)) {
            text = JSON.stringify(error);
        } else {
            text = error;
        }

        return (
            <div style={_.merge({}, styles.alert, styles.danger)}>
                <strong>Error!</strong> {text}
            </div>
        );
    }

});
