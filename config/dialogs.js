import React from 'react';
import { Field, FormSection, PropBarrier } from 'lore-react-forms';
import { TextField, Checkbox, SelectField, MenuItem, FlatButton, RaisedButton } from 'material-ui';
import { Connect } from 'lore-hook-connect';

export default {

    schemas: {
        default: {
            fields: function(form) {
                return (fields) => {
                    return (
                        <FormSection style={{ padding: 16, position: 'relative' }}>
                            {fields}
                        </FormSection>
                    );
                };
            },
            field: function(form) {
                return (field) => {
                    return (
                        <FormSection>
                            {field}
                        </FormSection>
                    );
                }
            },
            actions: function(form) {
                return (actions) => {
                    return (
                        <FormSection style={{ padding: 8, position: 'relative', textAlign: 'right' }}>
                            <PropBarrier>
                                {actions}
                            </PropBarrier>
                        </FormSection>
                    );
                };
            },
            action: function(form) {
                return (action) => {
                    return (
                        <span style={{ marginLeft: 8 }}>
                            {action}
                        </span>
                    );
                }
            }
        }
    },

    fieldMap: {
        custom: function(form, props, name) {
            return (
                <Field name={name}>
                    {(field) => {
                        return props.render(field, props);
                    }}
                </Field>
            );
        },
        text: function(form, props, name) {
            return (
                <Field name={name}>
                    {(field) => {
                        return (
                            <TextField
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onFocus={field.onFocus}
                                onBlur={field.onBlur}
                                errorText={field.touched && field.error}
                                multiLine={true}
                                style={{ width: '100%' }}
                                {...props}
                            />
                        )
                    }}
                </Field>
            );
        },
        password: function(form, props, name) {
            return (
                <Field name={name}>
                    {(field) => {
                        return (
                            <TextField
                                type="password"
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onFocus={field.onFocus}
                                onBlur={field.onBlur}
                                errorText={field.touched && field.error}
                                style={{ width: '100%' }}
                                {...props}
                            />
                        )
                    }}
                </Field>
            );
        },
        checkbox: function(form, props, name) {
            return (
                <Field name={name}>
                    {(field) => {
                        return (
                            <Checkbox
                                checked={field.value}
                                onCheck={(event, checked) => {
                                    field.onBlur();
                                    field.onChange(field.name, checked);
                                }}
                                {...props}
                            />
                        )
                    }}
                </Field>
            );
        },
        select: function(form, props, name) {
            const {
                options,
                field,
                ...other
            } = props;

            function mapDatumToOption(datum) {
                return {
                    value: datum.id,
                    text: datum.data[field]
                };
            }

            function mapDataToOptions(data) {
                return data.map(mapDatumToOption);
            }

            function renderOption({ text, value }) {
                return (
                    <MenuItem
                        key={value}
                        value={value}
                        primaryText={text}
                    />
                );
            }

            return (
                <Field name={name}>
                    {(field) => {
                        return (
                            <Connect callback={(getState, props) => {
                                return {
                                    options: _.isFunction(options) ? options(getState, props) : options
                                };
                            }}>
                                {(connect) => {
                                    return (
                                        <SelectField
                                            value={field.value}
                                            onChange={(event, key, value) => {
                                                field.onBlur();
                                                field.onChange(field.name, value);
                                            }}
                                            errorText={field.touched && field.error}
                                            style={{ width: '100%' }}
                                            {...other}
                                        >
                                            {[renderOption({ value: null, text: '' })].concat(
                                                mapDataToOptions(connect.options.data).map(renderOption)
                                            )}
                                        </SelectField>
                                    )
                                }}
                            </Connect>
                        )
                    }}
                </Field>
            )
        },
        string: function(form, props, name) {
            return (
                <Field name={name}>
                    {(field) => {
                        return (
                            <TextField
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                onFocus={field.onFocus}
                                onBlur={field.onBlur}
                                errorText={field.touched && field.error}
                                style={{ width: '100%' }}
                                {...props}
                            />
                        )
                    }}
                </Field>
            );
        },
    },

    actionMap: {
        flat: function(form, props) {
            return (
                <FlatButton
                    {...props}
                />
            );
        },
        raised: function(form, props) {
            return (
                <RaisedButton
                    {...props}
                />
            );
        }
    }
}
