import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import ExternalLink from '../../components/_common/ExternalLink';
import CreateOverlayBlueprint from "../_blueprints/create/Overlay";

export default createReactClass({
    displayName: 'Volume/Detach',

    propTypes: {
        model: PropTypes.object.isRequired,
        instance: PropTypes.object.isRequired,
        onCancel: PropTypes.func
    },

    request: function (data) {
        const { model, instance } = this.props;
        return lore.actions.volume.detach(model, {
            instance: instance
        }).payload;
    },

    render: function () {
        const {
            model,
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
                title="Detach Volume"
                information="WARNING If data is being written to the volume when it's detached, the data may become corrupted. Therefore, we recommend you make sure there is no data being written to the volume before detaching it."
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
                                                Would you like to detach this volume?
                                            </div>
                                            <div>
                                                <ExternalLink href="https://pods.iplantcollaborative.org/wiki/display/atmman/Attaching+and+Detaching+Volumes">
                                                    Learn more about unmounting and detaching a volume
                                                </ExternalLink>
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
                                label: 'Detach',
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
