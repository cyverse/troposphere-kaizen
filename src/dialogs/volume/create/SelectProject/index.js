import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { CardTitle } from 'material-ui';
import CloseButton from '../../../_templates/_common/CloseButton';
import BasicNavigation from '../_common/BasicNavigation';
import GenericForm from '../../../_templates/_forms/GenericForm';
import { SchemaFields } from 'lore-react-forms';
import validators from '../../../../utils/validators';
import SetDefaults from './SetDefaults';

export default createReactClass({
    displayName: 'SelectProject',

    propTypes: {
        data: PropTypes.object,
        validators: PropTypes.object,
        onChange: PropTypes.func,
        request: PropTypes.object,
        callbacks: PropTypes.object,
        schema: PropTypes.object.isRequired,
        fieldMap: PropTypes.object.isRequired,
        actionMap: PropTypes.object.isRequired
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
            callbacks
        } = this.props;

        const {
            data,
            setDefaults
        } = this.state;

        const config = {
            validators: {
                project: [validators.number.isRequired]
            },
            fields: [
                {
                    key: 'project',
                    type: 'select',
                    props: {
                        floatingLabelText: 'Project',
                        field: 'name',
                        options: (getState, props) => {
                            return getState('project.find')
                        }
                    }
                }
            ]
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
                                helpText="Which project would you like to add the volume to?"
                                nextButtonVisible={true}
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
                            <div className="col-8">
                                <div className="row">
                                    <div className="col">
                                        <CardTitle title="Project Selection" />
                                        <SchemaFields
                                            schema={schema}
                                            fieldMap={fieldMap}
                                            form={form}
                                            fields={config.fields}
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
