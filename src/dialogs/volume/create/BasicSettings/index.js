import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { CardTitle } from 'material-ui';
import { Connect } from 'lore-hook-connect';
import validators from '../../../../utils/validators';
import { GenericForm, SchemaFields } from 'lore-react-forms';
import CloseButton from '../../../_blueprints/_common/CloseButton';
import { RequestError } from 'lore-react-forms-material-ui';
import BasicNavigation from '../_common/BasicNavigation';
import SetDefaults from './SetDefaults';
import VolumeUsageBar from './VolumeUsageBar';
import StorageUsageBar from './StorageUsageBar';

export default createReactClass({
    displayName: 'BasicSettings',

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
                name: [validators.isRequired],
                identity: [validators.number.isRequired],
                size: [
                    validators.isNumber,
                    validators.number.minimum(1),
                    validators.number.isRequired
                ]
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
                            <BasicNavigation
                                schema={schema}
                                actionMap={actionMap}
                                form={form}
                                activeStep={2}
                                helpText="Please review the default settings and modify as needed. Once the settings reflect what you want, click the 'Create Volume' button."
                                nextButtonVisible={false}
                                previousButtonVisible={true}
                                otherButtonsVisible={true}
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
                                    <div className="col">
                                        <CardTitle title="Basic Information" />
                                        <SchemaFields
                                            schema={schema}
                                            fieldMap={fieldMap}
                                            form={form}
                                            fields={[
                                                {
                                                    key: 'name',
                                                    type: 'string',
                                                    props: {
                                                        floatingLabelText: 'Volume Name'
                                                    }
                                                }
                                            ]}
                                        />
                                    </div>
                                    <div className="col">
                                        <CardTitle title="Volume Resources" />
                                        <SchemaFields
                                            schema={schema}
                                            fieldMap={fieldMap}
                                            form={form}
                                            fields={[
                                                {
                                                    key: 'identity',
                                                    type: 'select2',
                                                    props: {
                                                        floatingLabelText: 'Identity',
                                                        label: (identity) => {
                                                            return (
                                                                <Connect callback={(getState, props) => {
                                                                    return {
                                                                        provider: getState('provider.byId', {
                                                                            id: identity.data.provider
                                                                        })
                                                                    };
                                                                }}>
                                                                    {(props) => {
                                                                        return props.provider.data.name;
                                                                    }}
                                                                </Connect>
                                                            )
                                                        },
                                                        options: (getState, props) => {
                                                            return getState('identity.find')
                                                        }
                                                    }
                                                },
                                                {
                                                    key: 'size',
                                                    type: 'string',
                                                    props: {
                                                        floatingLabelText: 'Volume Size (GB)'
                                                    }
                                                }
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <CardTitle title="Resource Consumption" />
                                        <VolumeUsageBar data={data} />
                                        <StorageUsageBar data={data} />
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
