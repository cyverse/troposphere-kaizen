import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { getState } from 'lore-hook-connect';
import validators from '../../utils/validators';
import CreateOverlayBlueprint from '../_blueprints/create/Overlay';

export default createReactClass({
    displayName: 'Volume/Attach',

    propTypes: {
        model: PropTypes.object.isRequired,
        project: PropTypes.object.isRequired,
        onCancel: PropTypes.func
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
            onCancel
        } = this.props;

        const {
            schemas,
            fieldMap,
            actionMap
        } = lore.config.dialogs;

        return (
            <CreateOverlayBlueprint
                modelName="volume"
                schema={schemas.default}
                fieldMap={fieldMap}
                actionMap={actionMap}
                onCancel={onCancel}
                request={this.request}
                title="Attach Volume"
                information="Select the instance that you would like to attach the volume to"
                validators={{
                    instance_id: [validators.number.isRequired]
                }}
                fields={[
                    {
                        key: 'instance_id',
                        type: 'select',
                        props: {
                            floatingLabelText: 'Instance',
                            field: 'name',
                            options: (getState, props) => {
                                return getState('instance.findAll', {
                                    exclude: function(instance) {
                                        return (
                                            instance.data.project !== project.id ||
                                            instance.data.provider !== model.data.provider
                                        );
                                    }
                                })
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
                                label: 'Attach',
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
