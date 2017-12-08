import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { Form, FormSection } from 'lore-react-forms';
import { result as _result } from 'lore-utils';

export default createReactClass({
    displayName: 'SchemaForm',

    propTypes: {
        data: PropTypes.object,
        validators: PropTypes.object,
        onChange: PropTypes.func,
        callbacks: PropTypes.object,
        schema: PropTypes.object.isRequired,
        fieldMap: PropTypes.object.isRequired,
        actionMap: PropTypes.object.isRequired,
        config: PropTypes.object.isRequired,
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
            // data,
            // validators,
            // onChange,
            callbacks,
            schema,
            fieldMap,
            actionMap,
            config: {
                fields,
                actions
            }
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
                    <FormSection>
                        {schema.fields(form)(
                            _.keys(fields).map((key, index) => {
                                const field = fields[key];
                                const mappedField = fieldMap[field.type];
                                return (
                                    React.cloneElement(schema.field(form)(
                                        mappedField(form, _result(field.props, form), key)
                                    ), {
                                        key: key
                                    })
                                );
                            })
                        )}
                        {schema.actions(form)(
                            actions.map((action, index) => {
                                const mappedAction = actionMap[action.type];
                                return (
                                    React.cloneElement(schema.action(form)(
                                        mappedAction(form, _result(action.props, form))
                                    ), {
                                        key: index
                                    })
                                );
                            })
                        )}
                    </FormSection>
                )}
            </Form>
        );
    }

});
