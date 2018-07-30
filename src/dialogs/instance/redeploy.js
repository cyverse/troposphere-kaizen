import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CreateOverlayBlueprint from '../_blueprints/create/Overlay';

export default createReactClass({
    displayName: 'Instance/Redeploy',

    propTypes: {
        model: PropTypes.object.isRequired,
        onCancel: PropTypes.func
    },

    request: function (data) {
        const { model } = this.props;
        return lore.actions.instance.redeploy(model).payload;
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
                title="Redeploy Instance"
                information="NOTE Redeploying an instance will allow you to fix instances that show up as 'active - deploy_error'. If after executing a 'redeploy' you find that your VM returns to the deploy_error state, please contact support."
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
                                            Would you like to redeploy this instance?
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
                                label: 'Redeploy',
                                primary: true,
                                disabled: form.hasError,
                                onClick: () => {
                                    form.callbacks.onSubmit(form.data)
                                }
                            }
                        }
                    }
                ]}
            />
        );
    }

});
