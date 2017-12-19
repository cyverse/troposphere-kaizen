import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Dialog from '../../../src/decorators/Dialog';
import OverlayTemplate from '../_templates/OverlayTemplate';
import validators from '../../utils/validators';

export default Dialog()(createReactClass({
    displayName: 'Instance/Reboot',

    propTypes: {
        model: PropTypes.object.isRequired,
        onCancel: PropTypes.func.isRequired
    },

    request: function (data) {
        const { model } = this.props;

        if (data.type === 'hard') {
            return lore.actions.instance.rebootHard(model).payload;
        }

        return lore.actions.instance.rebootSoft(model).payload;
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
                            title: 'Reboot Instance',
                            // subtitle: `Submit this form to destroy this ${modelName}`,
                            information: `WARNING Rebooting an instance will cause it to temporarily shut down and become inaccessible during that time.`,
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
                                                    A 'Reboot' will send an 'ACPI Restart' request to the VM that
                                                    will start the reboot process for your VM.
                                                </div>
                                                <div style={{ marginBottom: '16px' }}>
                                                    If your VM does not respond to a 'Reboot', there is also the
                                                    option to send a 'Hard Reboot' which will forcibly restart
                                                    your VM.
                                                </div>
                                                <div>
                                                    Select one of the two options below to reboot your instance.
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
                                    onTouchTap: () => {
                                        form.callbacks.onCancel()
                                    }
                                }
                            }
                        },
                        {
                            type: 'raised',
                            props: (form) => {
                                return {
                                    label: 'Reboot',
                                    primary: true,
                                    disabled: form.hasError,
                                    onTouchTap: () => {
                                        form.callbacks.onSubmit({
                                            type: 'soft'
                                        })
                                    }
                                }
                            }
                        },
                        {
                            type: 'raised',
                            props: (form) => {
                                return {
                                    label: 'Hard Reboot',
                                    primary: true,
                                    disabled: form.hasError,
                                    onTouchTap: () => {
                                        form.callbacks.onSubmit({
                                            type: 'hard'
                                        })
                                    }
                                }
                            }
                        }
                    ]
                }}
            />
        );
    }

}));
