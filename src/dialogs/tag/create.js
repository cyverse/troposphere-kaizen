import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Dialog from '../../../src/decorators/Dialog';
import OverlayTemplate from '../_templates/OverlayTemplate';
import validators from '../../utils/validators';

export default Dialog()(createReactClass({
    displayName: 'Tag/Create',

    propTypes: {
        onCancel: PropTypes.func.isRequired
    },

    contextTypes: {
        user: PropTypes.object.isRequired
    },

    request: function (data) {
        const { user } = this.context;
        return lore.actions.tag.create(data).payload;
    },

    render: function () {
        const {
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
                schema={schemas.default}
                fieldMap={fieldMap}
                actionMap={actionMap}
                onSubmit={onSubmit}
                onCancel={onCancel}
                config={{
                    props: {
                        title: 'Create Tag',
                        subtitle: 'Fill out the form to create a tag',
                        // information: 'This is an informational message',
                        successMessage: {
                            title: 'Success!',
                            message: 'Tag created.'
                        },
                        reducer: 'tag',
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
                                    label: 'Create',
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
