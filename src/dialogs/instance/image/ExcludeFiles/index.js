import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { CardTitle } from 'material-ui';
import validators from '../../../../utils/validators';
import { GenericForm, SchemaFields } from 'lore-react-forms';
import CloseButton from '../../../_blueprints/_common/CloseButton';
import { RequestError } from 'lore-react-forms-material-ui';
import AdvancedNavigation from '../_common/AdvancedNavigation';
import Steps from '../_common/Steps';

export default createReactClass({
    displayName: 'ExcludeFiles',

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
                validators={config.validators}
            >
                {(form) => (
                    <div className="row" style={{ margin: 0, backgroundColor: '#f2f2f2', height: '100%' }}>
                        <CloseButton onClick={callbacks.onCancel} />
                        <div className="col" style={{ backgroundColor: 'white' }}>
                            <AdvancedNavigation
                                schema={schema}
                                actionMap={actionMap}
                                form={form}
                                activeStep={Steps.EXCLUDE_FILES}
                                helpText={(
                                    <div>
                                        <div>
                                            The following directories will automatically be excluded from the image:
                                        </div>
                                        <ul className="list-unstyled excluded-directories">
                                            <li>/home/</li>
                                            <li>/mnt/</li>
                                            <li>/tmp/</li>
                                            <li>/root/</li>
                                        </ul>
                                        <div style={{ marginTop: 12 }}>
                                            If your instance has additional files or directories you'd like to exclude, please list them here
                                        </div>
                                    </div>
                                )}
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
                                    <CardTitle title="Exclude Files" />
                                    <SchemaFields
                                        schema={schema}
                                        fieldMap={fieldMap}
                                        form={form}
                                        fields={[
                                            {
                                                key: 'exclude_files',
                                                type: 'text',
                                                props: {
                                                    floatingLabelText: 'Base Image',
                                                    description: 'Write one path per line'
                                                }
                                            }
                                        ]}
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
