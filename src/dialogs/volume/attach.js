import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getState } from 'lore-hook-connect';
import Dialog from '../../../src/decorators/Dialog';
import OverlayTemplate from '../_templates/OverlayTemplate';
import validators from '../../utils/validators';

export default Dialog()(createReactClass({
    displayName: 'Volume/Attach',

    propTypes: {
        model: PropTypes.object.isRequired,
        project: PropTypes.object.isRequired,
        onCancel: PropTypes.func.isRequired
    },

    request: function (data) {
        const { model } = this.props;
        const instance = getState('instance.byId', {
            id: data.instance_id
        });
        return lore.actions.volume.attach(model, {
            instance: instance
        }).payload;
    },

    render: function () {
        const {
            model,
            project,
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
                            title: 'Attach Volume',
                            // subtitle: `Submit this form to destroy this ${modelName}`,
                            information: `Select the instance that you would like to attach the volume to`,
                            successMessage: {
                                title: 'Success!',
                                message: 'Volume attached.'
                            },
                            reducer: 'volume',
                            request: this.request
                        }
                    },
                    validators: {
                        instance_id: [validators.number.isRequired]
                    },
                    fields: {
                        instance_id: {
                            type: 'select',
                            props: {
                                floatingLabelText: 'Instance',
                                field: 'name',
                                options: (getState, props) => {
                                    return getState('instance.findAll', {
                                        exclude: {
                                            where: function(instance) {
                                                return (
                                                    instance.data.project !== project.id ||
                                                    instance.data.provider !== model.data.provider
                                                );
                                            }
                                        }
                                    })
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
                                    label: 'Attach',
                                    primary: true,
                                    disabled: form.hasError,
                                    onTouchTap: () => {
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

}));
