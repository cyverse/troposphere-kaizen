import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import OverlayTemplate from '../_templates/OverlayTemplate';
import validators from '../../utils/validators';

export default createReactClass({
    displayName: 'Instance/Shelve',

    propTypes: {
        model: PropTypes.object.isRequired,
        onCancel: PropTypes.func.isRequired
    },

    request: function (data) {
        const { model } = this.props;
        return lore.actions.instance.shelve(model).payload;
    },

    render: function () {
        const {
            model,
            onSubmit,
            onCancel
        } = this.props;

        const {
            schemas,
            fieldMap,
            actionMap
        } = lore.config.dialogs;

        return (
            <OverlayTemplate
                model={model}
                schema={schemas.default}
                fieldMap={fieldMap}
                actionMap={actionMap}
                onSubmit={onSubmit}
                onCancel={onCancel}
                config={{
                    props: (form) => {
                        return {
                            title: 'Shelve Instance',
                            // subtitle: `Submit this form to destroy this ${modelName}`,
                            information: 'Shelving an instance will freeze its state, and the IP address be removed from the instance.',
                            successMessage: {
                                title: 'Success!',
                                message: 'Project destroyed.'
                            },
                            reducer: 'instance',
                            request: this.request
                        }
                    },
                    validators: {},
                    fields: {
                        confirm: {
                            type: 'custom',
                            props: (form) => {
                                return {
                                    render: () => {
                                        return (
                                            <div>
                                                <div style={{ marginBottom: '16px' }}>
                                                    Shelving will safely preserve the state of your instance for later
                                                    use. And, it frees up resources for other users . In fact, it is
                                                    the best way to reduce resource usage when compared with other
                                                    actions, like "suspend" and "stop". Your time allocation no longer
                                                    counts against you in the shelved mode.
                                                </div>
                                                <div style={{ marginBottom: '16px' }}>
                                                    Your resource usage charts will only reflect the freed resources
                                                    once the state of the instance is "shelved."
                                                </div>
                                                <div>
                                                    Would you like to shelve this instance?
                                                </div>
                                            </div>
                                        );
                                    }
                                }
                            }
                        }
                    },
                    actions: [
                        {
                            type: 'raised',
                            props: (form) => {
                                return {
                                    label: 'Cancel',
                                    onClick: () => {
                                        form.callbacks.onCancel()
                                    }
                                }
                            }
                        },
                        {
                            type: 'raised',
                            props: (form) => {
                                return {
                                    label: 'Shelve',
                                    primary: true,
                                    disabled: form.hasError,
                                    onClick: () => {
                                        form.callbacks.onSubmit(form.data)
                                    }
                                }
                            }
                        }
                    ]
                }}
            />
        );
    }

});
