import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Dialog from '../../../src/decorators/Dialog';
import OverlayTemplate from '../_templates/OverlayTemplate';
import validators from '../../utils/validators';

export default Dialog()(createReactClass({
    displayName: 'Project/Update',

    propTypes: {
        model: PropTypes.object.isRequired,
        onCancel: PropTypes.func.isRequired
    },

    request: function (data) {
        const { model } = this.props;
        return lore.actions.project.update(model, data).payload;
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
                    props: {
                        title: 'Update Project',
                        subtitle: 'Fill out the form to update the project',
                        // information: 'This is an informational message',
                        successMessage: {
                            title: 'Success!',
                            message: 'Project updated.'
                        },
                        reducer: 'project',
                        request: this.request
                    },
                    data: {
                        name: '',
                        description: '',
                    },
                    validators: {
                        name: [validators.isRequired],
                        description: [validators.isRequired]
                    },
                    fields: {
                        name: {
                            type: 'string',
                            props: {
                                floatingLabelText: 'Name'
                            }
                        },
                        description: {
                            type: 'text',
                            props: {
                                floatingLabelText: 'Description'
                            }
                        },
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
                                    label: 'Update',
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
