import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { RaisedButton, FlatButton } from 'material-ui';
import { NavigationCheck } from 'material-ui/svg-icons';
import CloseButton from '../../../_templates/_common/CloseButton';
import BasicNavigation from '../_common/BasicNavigation';
import GenericForm from '../../../_templates/_forms/GenericForm';

export default createReactClass({
    displayName: 'ConfirmationScreen',

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

        const { data } = this.state;

        return (
            <GenericForm
                data={data}
                onChange={this.onChange}
                callbacks={callbacks}
                schema={schema}
                fieldMap={fieldMap}
                actionMap={actionMap}
                config={{
                    validators: {},
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
                                activeStep={3}
                                helpText={(
                                    <div>
                                        <div>
                                            Success, you are almost ready to do science. Instances can take up to 2 hours to be fully deployed and ready to connect to.
                                        </div>
                                        <div style={{ marginTop: 12 }}>
                                            You will be notified when your instance is ready both in app and by email. You can also see the status of your instance in the project you created it in by clicking "Continue to Instance".
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col" style={{ textAlign: 'center', marginTop: 72 }}>
                                    <NavigationCheck
                                        color="#359121"
                                        style={{
                                            height: 72,
                                            width: 72
                                        }}
                                    />
                                    <h1>
                                        Instance has launched successfully!
                                    </h1>
                                    <div>
                                        Please allow up to 2 hours for your instance to finish building before it is available to connect to.
                                    </div>
                                    <div style={{ marginTop: 32 }}>
                                        <RaisedButton
                                            primary={false}
                                            label="Continue to Instance"
                                            onClick={() => {
                                                form.callbacks.onNavigateToInstance()
                                            }}
                                        />
                                    </div>
                                    <div style={{ marginTop: 24 }}>
                                        <FlatButton
                                            primary={false}
                                            label="Launch Another Instance"
                                            onClick={() => {
                                                form.callbacks.onResetWizard()
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </GenericForm>
        );
    }

});
