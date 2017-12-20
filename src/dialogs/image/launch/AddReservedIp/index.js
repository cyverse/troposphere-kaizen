import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { CardTitle } from 'material-ui';
import CloseButton from '../../../_templates/_common/CloseButton';
import AdvancedNavigation from '../_common/AdvancedNavigation';
import GenericForm from '../../../_templates/_forms/GenericForm';
import Steps from '../_common/Steps';

export default createReactClass({
    displayName: 'AddReservedIp',

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
                            <AdvancedNavigation
                                schema={schema}
                                actionMap={actionMap}
                                form={form}
                                activeStep={Steps.ADD_RESERVED_IP}
                                helpText="Instances are automatically assigned an IP address. If you want to keep an IP address to reuse, you can request up to as many Floating IPs as your provider has allocated."
                            />
                        </div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col">
                                    <CardTitle title="Add a Reserved IP to your Instance (placeholder)" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </GenericForm>
        );
    }

});
