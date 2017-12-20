import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Dialog from '../../../src/decorators/Dialog';
import OverlayTemplate from '../_templates/OverlayTemplate';
import validators from '../../utils/validators';
import ExternalLink from '../../components/_common/ExternalLink';

export default Dialog()(createReactClass({
    displayName: 'Volume/Detach',

    propTypes: {
        model: PropTypes.object.isRequired,
        instance: PropTypes.object.isRequired,
        onCancel: PropTypes.func.isRequired
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
                            title: 'Detach Volume',
                            // subtitle: `Submit this form to destroy this ${modelName}`,
                            information: `WARNING If data is being written to the volume when it's detached, the data may become corrupted. Therefore, we recommend you make sure there is no data being written to the volume before detaching it.`,
                            successMessage: {
                                title: 'Success!',
                                message: 'Volume detached.'
                            },
                            reducer: 'volume',
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
                                    label: 'Detach',
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
