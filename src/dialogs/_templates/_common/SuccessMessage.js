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
    success: {
        color: '#3c763d',
        backgroundColor: '#dff0d8',
        borderColor: '#d6e9c6'
    }
};

export default createReactClass({
    displayName: 'SuccessMessage',

    propTypes: {
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {
            isVisible: true
        };
    },

    componentDidMount: function () {
        this.isMounted = true;

        setTimeout(() => {
            if (this.isMounted) {
                this.setState({
                    isVisible: false
                });
            }
        }, 3000);
    },

    componentWillUnmount: function () {
        this.isMounted = false;
    },

    getDefaultProps: function () {
        return {
            title: 'Well done!',
            message: 'You successfully read this important alert message.'
        }
    },

    render: function () {
        const {isVisible} = this.state;

        return (
            <div style={_.merge({}, styles.alert, styles.success, { display: isVisible ? 'block' : 'none' })}>
                <strong>{this.props.title}</strong> {this.props.message}
            </div>
        );
    }

});
