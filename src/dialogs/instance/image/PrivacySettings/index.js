import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { CardTitle } from 'material-ui';
import validators from '../../../../utils/validators';
import GenericForm from '../../../_templates/_forms/GenericForm';
import SchemaFields from '../../../_templates/_forms/SchemaFields';
import CloseButton from '../../../_templates/_common/CloseButton';
import RequestError from '../../../_templates/_common/RequestError';
import BasicNavigation from '../_common/BasicNavigation';

export default createReactClass({
    displayName: 'PrivacySettings',

    propTypes: {
        data: PropTypes.object,
        validators: PropTypes.object,
        onChange: PropTypes.func,
        hasError: PropTypes.bool,
        request: PropTypes.object,
        callbacks: PropTypes.object,
        schema: PropTypes.object.isRequired,
        fieldMap: PropTypes.object.isRequired,
        actionMap: PropTypes.object.isRequired,
    },

    getInitialState: function() {
        const { data } = this.props;

        return {
            data: _.merge({}, data)
        }
    },

    onChange: function(name, value) {
        const nextState = _.merge({}, this.state);
        nextState.data[name] = value;
        this.setState(nextState);
    },

    render: function() {
        const {
            schema,
            fieldMap,
            actionMap,
            callbacks,
            hasError,
            request
        } = this.props;

        const { data } = this.state;

        const config = {
            validators: {
                new_application_visibility: [validators.isRequired],
                access_list: data.new_application_visibility === 'select' ? [validators.isRequired] : []
            },
            fields: {}
        };

        return (
            <GenericForm
                data={data}
                onChange={this.onChange}
                callbacks={callbacks}
                schema={schema}
                fieldMap={fieldMap}
                actionMap={actionMap}
                config={{
                    validators: config.validators,
                    fields: {},
                    actions: []
                }}
            >
                {(form) => (
                    <div className="row" style={{ margin: 0, backgroundColor: '#f2f2f2', height: '100%' }}>
                        <CloseButton onClick={callbacks.onCancel} />
                        <div className="col" style={{ backgroundColor: 'white' }}>
                            <BasicNavigation
                                schema={schema}
                                actionMap={actionMap}
                                form={form}
                                activeStep={2}
                                helpText={(
                                    <div>
                                        <p>
                                            Please select the level of visibility this image should have.
                                        </p>
                                        <p>
                                            <strong>Public</strong> - The image will be visible to all users and anyone will be able to launch it.
                                        </p>
                                        <p>
                                            <strong>Private</strong> - The image will be visible only to you and only you will be able to launch it.
                                        </p>
                                        <p>
                                            <strong>Specific Users</strong> - The image will be visible to only you and the users you specify, and only you and those users will be able to launch it.
                                        </p>
                                    </div>
                                )}
                                nextButtonVisible={false}
                                previousButtonVisible={true}
                                otherButtonsVisible={true}
                            />
                        </div>
                        <div className="col-8" style={{ overflow: 'scroll', height: '100%' }}>
                            {hasError ? (
                                <div className="row">
                                    <div className="col" style={{ padding: 0 }}>
                                        <RequestError request={request}>
                                            {(request) => {
                                                return request.error;
                                            }}
                                        </RequestError>
                                    </div>
                                </div>
                            ) : null}
                            <div className="row">
                                <div className="col-8">
                                    <CardTitle title="Privacy Settings" />
                                    <SchemaFields
                                        schema={schema}
                                        fieldMap={fieldMap}
                                        form={form}
                                        fields={{
                                            new_application_visibility: {
                                                type: 'select2',
                                                props: {
                                                    floatingLabelText: 'Image Visibility *',
                                                    label: (option) => {
                                                        return `${option.data.name}`;
                                                    },
                                                    options: (getState, props) => {
                                                        return {
                                                            data: [
                                                                {
                                                                    id: 'public',
                                                                    data: {
                                                                        name: 'Public'
                                                                    }
                                                                },
                                                                {
                                                                    id: 'private',
                                                                    data: {
                                                                        name: 'Private'
                                                                    }
                                                                },
                                                                {
                                                                    id: 'select',
                                                                    data: {
                                                                        name: 'Specific Users'
                                                                    }
                                                                }
                                                            ]
                                                        };
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                    {data.new_application_visibility === 'select' ? (
                                        <SchemaFields
                                            schema={schema}
                                            fieldMap={fieldMap}
                                            form={form}
                                            fields={{
                                                access_list: {
                                                    type: 'string',
                                                    props: {
                                                        floatingLabelText: 'Usernames',
                                                        description: 'Please include a comma separated list of usernames that should be able to launch this image.'
                                                    }
                                                }
                                            }}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </GenericForm>
        );
    }

});
