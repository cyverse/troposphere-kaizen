import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { CardTitle } from 'material-ui';
import { Connect } from 'lore-hook-connect';
import validators from '../../../../utils/validators';
import GenericForm from '../../../_templates/_forms/GenericForm';
import SchemaFields from '../../../_templates/_forms/SchemaFields';
import CloseButton from '../../../_templates/_common/CloseButton';
import RequestError from '../../../_templates/_common/RequestError';
import BasicNavigation from '../_common/BasicNavigation';
import SetDefaults from './SetDefaults';
import AllocationUsageBar from './AllocationUsageBar';
import CpuUsageBar from './CpuUsageBar';
import MemoryUsageBar from './MemoryUsageBar';

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
                name: [validators.isRequired],
                image_version: [validators.isRequired],
                allocation_source: [validators.number.isRequired],
                identity: [validators.number.isRequired],
                size: [validators.number.isRequired]
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
                                helpText="Please review the default settings and modify as needed. Once the settings reflect what you want, click the 'Launch Instance' button."
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
                                            fields={{
                                                name: {
                                                    type: 'string',
                                                    props: {
                                                        floatingLabelText: 'Instance Name'
                                                    }
                                                },
                                                image_version: {
                                                    type: 'select',
                                                    props: {
                                                        floatingLabelText: 'Base Image',
                                                        field: 'name',
                                                        options: (getState, props) => {
                                                            return getState('imageVersion.find', {
                                                                where: {
                                                                    image_id: form.data.image
                                                                },
                                                                exclude: (imageVersion) => {
                                                                    return imageVersion.data.end_date;
                                                                }
                                                            })
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="col">
                                        <CardTitle title="Instance Resources" />
                                        <SchemaFields
                                            schema={schema}
                                            fieldMap={fieldMap}
                                            form={form}
                                            fields={{
                                                allocation_source: {
                                                    type: 'select',
                                                    props: {
                                                        floatingLabelText: 'Allocation Source',
                                                        field: 'name',
                                                        options: (getState, props) => {
                                                            return getState('allocationSource.find')
                                                        }
                                                    }
                                                },
                                                identity: {
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
                                                size: {
                                                    type: 'select2',
                                                    props: {
                                                        floatingLabelText: 'Instance Size',
                                                        label: (size) => {
                                                            return `${size.data.name} (CPU: ${size.data.cpu}, Mem: ${size.data.mem/1024}GB, Disk: ${size.data.root}GB)`;
                                                        },
                                                        options: (getState, props) => {
                                                            if (form.data.identity) {
                                                                const identity = getState('identity.byId', {
                                                                    id: form.data.identity
                                                                });

                                                                return getState('size.find', {
                                                                    where: {
                                                                        provider__id: identity.data.provider
                                                                    }
                                                                })
                                                            }

                                                            return {
                                                                data: []
                                                            };
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <CardTitle title="Resource Consumption" />
                                        <AllocationUsageBar data={data} />
                                        <CpuUsageBar data={data} />
                                        <MemoryUsageBar data={data} />
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
