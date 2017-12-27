import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { Form, PropBarrier } from 'lore-react-forms';

export default createReactClass({
    displayName: 'GenericForm',

    propTypes: {
        data: PropTypes.object,
        validators: PropTypes.object,
        onChange: PropTypes.func,
        callbacks: PropTypes.object,
        schema: PropTypes.object.isRequired,
        config: PropTypes.object.isRequired,
        children: PropTypes.func.isRequired,
    },

    getInitialState: function () {
        const {
            config: {
                fields
            }
        } = this.props;

        return _.mapValues(fields, function (value, key) {
            return value.initialValue;
        });
    },

    onChange: function (name, value) {
        const {onChange} = this.props;

        if (onChange) {
            return onChange(name, value);
        }

        const state = {};
        state[name] = value;
        this.setState(state);
    },

    getValidators: function (data) {
        const {
            config: {
                validators,
                fields
            }
        } = this.props;

        if (validators) {
            if (_.isFunction(validators)) {
                return validators(data);
            }
            return validators;
        }

        return _.mapValues(fields, function (value, key) {
            return _.isFunction(value.validators) ? value.validators(data) : value.validators;
        });
    },

    render: function () {
        const {
            callbacks,
            children
        } = this.props;
        const data = this.props.data || this.state;
        const validators = this.getValidators(data);

        return (
            <Form
                data={data}
                validators={validators}
                onChange={this.onChange}
                callbacks={callbacks}>
                {(form) => (
                    <PropBarrier>
                        {children(form)}
                    </PropBarrier>
                )}
            </Form>
        );
    }

});
