import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import OverlayTemplate from '../_templates/OverlayTemplate';
import validators from '../../utils/validators';

export default createReactClass({
    displayName: 'Instance/Stop',

    propTypes: {
        model: PropTypes.object.isRequired,
        onCancel: PropTypes.func.isRequired
    },

    request: function (data) {
        const { model } = this.props;
        return lore.actions.instance.stop(model).payload;
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
                            title: 'Stop Instance',
                            // subtitle: `Submit this form to destroy this ${modelName}`,
                            information: 'NOTE: This will NOT affect your resources. To preserve resources and time allocation you must suspend your instance.',
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
                                                Would you like to stop this instance?
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
                                    label: 'Stop',
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
