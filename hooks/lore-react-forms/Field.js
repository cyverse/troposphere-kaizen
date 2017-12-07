/* eslint react/no-unused-prop-types: "off" */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Field extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = _.bind(this.onChange, this);
        this.onFocus = _.bind(this.onFocus, this);
        this.onBlur = _.bind(this.onBlur, this);
        this.state = {
            touched: false
        };
    }

    onChange(event, value) {
        const {
            name,
            onChange
        } = this.props;

        onChange(name, value);
    }

    onFocus() {
        // no op
    }

    onBlur() {
        this.setState({
            touched: true
        });
    }

    render() {
        const {
            name,
            data,
            validators,
            errors,
            hasError,
            children
        } = this.props;

        const {
            touched
        } = this.state;

        if (_.isFunction(children)) {
            return children({
                name: name,
                data: data,
                value: data[name],
                validators: validators,
                errors: errors,
                error: errors[name],
                hasError: hasError,
                touched: touched,
                onChange: this.onChange,
                onFocus: this.onFocus,
                onBlur: this.onBlur
            });
        }

        return (
            <div>{value}</div>
        );
    }

}

Field.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    validators: PropTypes.object.isRequired
};

Field.defaultProps = {
    name: '',
    data: {},
    validators: {},
    errors: {},
    onChange: function () {}
};

export default Field;
