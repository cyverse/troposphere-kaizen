import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CreateOverlayBlueprint from '../_blueprints/create/Overlay';

export default createReactClass({
    displayName: 'Instance/Stop',

    propTypes: {
        model: PropTypes.object.isRequired,
        onCancel: PropTypes.func
    },

    request: function (data) {
        const { model } = this.props;
        return lore.actions.instance.stop(model).payload;
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
                title="Stop Instance"
                information="NOTE: This will NOT affect your resources. To preserve resources and time allocation you must suspend your instance."
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
                                            Would you like to stop this instance?
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
                                label: 'Stop',
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
