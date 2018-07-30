import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { CardTitle } from 'material-ui';
import validators from '../../../../utils/validators';
import GenericForm from '../../../_templates/_forms/GenericForm';
import { SchemaFields } from 'lore-react-forms';
import CloseButton from '../../../_templates/_common/CloseButton';
import RequestError from '../../../_templates/_common/RequestError';
import BasicNavigation from '../_common/BasicNavigation';
import SetDefaults from './SetDefaults';

export default createReactClass({
    displayName: 'ImageInformation',

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
            data: _.merge({}, data),
            setDefaults: true
        }
    },

    onChange: function(name, value) {
        const nextState = _.merge({}, this.state);
        nextState.data[name] = value;

        if (name === 'identity') {
            nextState.data.size = undefined;
            if (value !== null) {
                nextState.setDefaults = true;
            }
        }

        this.setState(nextState);
    },

    onSetDefaults(defaults) {
        const data = _.merge({}, this.state.data, defaults);
        this.setState({
            data: data,
            setDefaults: false
        });
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

        const {
            data,
            setDefaults
        } = this.state;

        const config = {
            validators: {
                new_version_forked: [validators.boolean.isRequired],
                new_application_name: [validators.isRequired],
                new_application_description: [validators.isRequired]
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
                                activeStep={0}
                                helpText={(
                                    <div>
                                        <p>
                                            Please provide some information to help others discover this image. The information you provide here will be the primary means for others to discover this image.
                                        </p>
                                        <p>
                                            Fields marked with * are required.
                                        </p>
                                    </div>
                                )}
                                nextButtonVisible={true}
                                previousButtonVisible={false}
                                otherButtonsVisible={false}
                            />
                        </div>
                        {setDefaults ? (
                            <div className="col-8">
                                <SetDefaults
                                    data={data}
                                    onSetDefaults={this.onSetDefaults}
                                />
                            </div>
                        ) : (
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
                                        <CardTitle title="Image Information" />
                                        <SchemaFields
                                            schema={schema}
                                            fieldMap={fieldMap}
                                            form={form}
                                            fields={[
                                                {
                                                    key: 'new_version_forked',
                                                    type: 'select2',
                                                    props: {
                                                        floatingLabelText: 'Base Image *',
                                                        description: 'Selecting "New Image" will create a brand new image. Selecting "Same Image" will create a new version for the same image.',
                                                        label: (option) => {
                                                            return `${option.data.name}`;
                                                        },
                                                        options: (getState, props) => {
                                                            return {
                                                                data: [
                                                                    {
                                                                        id: true,
                                                                        data: {
                                                                            name: 'New Image'
                                                                        }
                                                                    },
                                                                    {
                                                                        id: false,
                                                                        data: {
                                                                            name: 'Same Image'
                                                                        }
                                                                    }
                                                                ]
                                                            };
                                                        }
                                                    }
                                                },
                                                {
                                                    key: 'new_application_name',
                                                    type: 'string',
                                                    props: {
                                                        floatingLabelText: 'Image Name *',
                                                        description: 'Something meaningful to help users find this image. Please limit name to 30 characters.'
                                                    }
                                                },
                                                {
                                                    key: 'new_application_description',
                                                    type: 'text',
                                                    props: {
                                                        floatingLabelText: 'Image Description *',
                                                        description: 'Concisely describe the tools installed and their purpose. Please include key words that will help users search for this image and decide whether it will suit their needs.'
                                                    }
                                                },
                                                {
                                                    key: 'new_version_tags',
                                                    type: 'string',
                                                    props: {
                                                        floatingLabelText: 'Image Tags',
                                                        description: (
                                                            <div>
                                                                <p>
                                                                    Please include tags that will help users decide whether this image will suit their needs. You can include the operating system, installed software, or configuration information. E.g. Ubuntu, NGS Viewers, MAKER, QIIME, etc.
                                                                </p>
                                                                <p>
                                                                    For your convenience, we've automatically added the tags that were already on the instance.
                                                                </p>
                                                            </div>
                                                        )
                                                    }
                                                }
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </GenericForm>
        );
    }

});
