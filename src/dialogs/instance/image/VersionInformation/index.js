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
    displayName: 'VersionInformation',

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
                new_version_name: [validators.isRequired],
                new_version_change_log: [validators.isRequired]
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
                                activeStep={1}
                                helpText={(
                                    <div>
                                        <p>
                                            Versioning can be an important part of the Imaging process.Use this area to help track how your image changes over time. The information you provide here will be shown to users who wish to use your image.
                                        </p>
                                        <p>
                                            Fields marked with * are required.
                                        </p>
                                    </div>
                                )}
                                nextButtonVisible={true}
                                previousButtonVisible={true}
                                otherButtonsVisible={false}
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
                                    <CardTitle title="Version Information" />
                                    <SchemaFields
                                        schema={schema}
                                        fieldMap={fieldMap}
                                        form={form}
                                        fields={{
                                            new_version_name: {
                                                type: 'string',
                                                props: {
                                                    floatingLabelText: 'Version Name *',
                                                    description: 'Versioning helps users understand how your changes relate to the overall progress of the Application. Versions are alphanumeric (e.g. 2.0-stable, 2.1-beta, 2.2-testing). Please limit name to 30 characters and keep versioning consistent.'
                                                }
                                            },
                                            new_version_change_log: {
                                                type: 'text',
                                                props: {
                                                    floatingLabelText: 'Change Log *',
                                                    description: `Concisely describe what you've changed in this specific version. This description will help users understand how your application has changed over time.`
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </GenericForm>
        );
    }

});
