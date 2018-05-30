import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Dialog from '../../../src/decorators/Dialog';
import OverlayTemplate from '../_templates/OverlayTemplate';
import validators from '../../utils/validators';

export default Dialog()(createReactClass({
    displayName: 'Instance/Redeploy',

    propTypes: {
        model: PropTypes.object.isRequired,
        onCancel: PropTypes.func.isRequired
    },

    request: function (data) {
        const { model } = this.props;
        return lore.actions.instance.redeploy(model).payload;
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
                            title: 'Redeploy Instance',
                            // subtitle: `Submit this form to destroy this ${modelName}`,
                            information: `NOTE Redeploying an instance will allow you to fix instances that show up as 'active - deploy_error'. If after executing a 'redeploy' you find that your VM returns to the deploy_error state, please contact support.`,
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
                                                Would you like to redeploy this instance?
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
                                    label: 'Redeploy',
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

}));
