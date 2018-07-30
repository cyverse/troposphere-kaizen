import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CreateOverlayBlueprint from '../_blueprints/create/Overlay';

export default createReactClass({
    displayName: 'Instance/Reboot',

    propTypes: {
        model: PropTypes.object.isRequired,
        onCancel: PropTypes.func
    },

    request: function (data) {
        const { model } = this.props;

        if (data.type === 'hard') {
            return lore.actions.instance.rebootHard(model).payload;
        }

        return lore.actions.instance.rebootSoft(model).payload;
    },

    render: function () {
        const { onCancel } = this.props;

        const {
            schemas,
            fieldMap,
            actionMap
        } = lore.config.dialogs;

        return (
            <CreateOverlayBlueprint
                modelName="instance"
                schema={schemas.default}
                fieldMap={fieldMap}
                actionMap={actionMap}
                onCancel={onCancel}
                request={this.request}
                title="Reboot Instance"
                information="WARNING Rebooting an instance will cause it to temporarily shut down and become inaccessible during that time."
                validators={{}}
                fields={[
                    {
                        key: 'confirm',
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
                ]}
                actions={[
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
                                label: 'Reboot',
                                primary: true,
                                disabled: form.hasError,
                                onClick: () => {
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
                                onClick: () => {
                                    form.callbacks.onSubmit({
                                        type: 'hard'
                                    })
                                }
                            }
                        }
                    }
                ]}
            />
        );
    }

});
