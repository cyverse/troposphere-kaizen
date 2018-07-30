import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CreateOverlayBlueprint from '../_blueprints/create/Overlay';

export default createReactClass({
    displayName: 'Instance/Start',

    propTypes: {
        model: PropTypes.object.isRequired,
        onCancel: PropTypes.func
    },

    request: function (data) {
        const { model } = this.props;
        return lore.actions.instance.start(model).payload;
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
                title="Start Instance"
                information="WARNING In order to start a stopped instance, you must have sufficient quota and the cloud must have enough room to support your instance's size."
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
                                            Would you like to start this instance?
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
                                label: 'Start',
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
