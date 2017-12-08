/* eslint consistent-return: "off" */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default createReactClass({
    displayName: 'Form',

    propTypes: {
        data: PropTypes.object.isRequired,
        errors: PropTypes.object,
        validators: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        isSaving: PropTypes.bool.isRequired
    },

    getDefaultProps: function () {
        return {
            errors: {},
            isSaving: false
        };
    },

    getInitialState: function () {
        return {
            isSaving: this.props.isSaving,
            isModified: false
        };
    },

    componentWillReceiveProps: function (nextProps) {
        const nextIsSaving = nextProps.isSaving;
        const isSaving = this.state.isSaving;

        if (nextIsSaving !== isSaving) {
            this.setState({
                isSaving: nextIsSaving
            });
        }

        if (isSaving === true && nextIsSaving === false) {
            this.setState({
                isModified: false
            });
        }
    },

    onChange: function (name, value) {
        if (!this.state.isModified) {
            this.setState({
                isModified: true
            });
        }

        this.props.onChange(name, value);
    },

    getErrors: function (validatorDictionary, data) {
        if (this.props.getErrors) {
            return this.props.getErrors(validatorDictionary, data);
        }

        // make sure we include errors for validator keys that aren't in data yet
        const _data = _.merge({}, data);
        _.keys(validatorDictionary).map(function (key, index) {
            if (_data[key] === undefined) {
                _data[key] = undefined;
            }
        });

        return _.mapValues(_data, function (value, key) {
            const validators = validatorDictionary[key];
            let error = null;
            if (validators) {
                validators.forEach(function (validator) {
                    error = error || validator(value);
                });
            }
            return error;
        });
    },

    hasError: function (errors) {
        if (this.props.hasError) {
            return this.props.hasError(errors);
        }

        const errorCount = _.reduce(errors, function (result, value, key) {
            if (value) {
                return result + 1;
            }

            return result;
        }, 0);
        return errorCount > 0;
    },

    createFields: function (errors, hasError, options) {
        let children = this.props.children;

        if (_.isFunction(children)) {
            children = children(options);
        }

        const handlers = {
            onChange: this.onChange
        };

        return React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                const props = {
                    data: this.props.data,
                    errors: errors,
                    hasError: hasError
                };

                return React.cloneElement(child, _.assign(props, handlers));
            }
        });
    },

    render: function () {
        const data = this.props.data;
        const validators = this.props.validators || {};
        const errors = this.getErrors(validators, data);
        const hasError = this.hasError(errors);
        const parentErrors = this.props.errors;
        const allErrors = _.assign({}, errors, parentErrors);

        const other = _.omit(this.props, ['data', 'validators', 'errors']);

        return (
            <div>
                {this.createFields(allErrors, hasError, _.merge({
                    data: data,
                    validators: validators,
                    errors: errors,
                    hasError: hasError,
                    parentErrors: parentErrors,
                    allErrors: allErrors,
                    isModified: this.state.isModified,
                    isSaving: this.state.isSaving
                }, other))}
            </div>
        );
    }

});
