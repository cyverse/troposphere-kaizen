import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { CardTitle } from 'material-ui';
import { result as _result } from 'lore-utils';
import SchemaForm from './_forms/SchemaForm';
import Overlay from './_common/Overlay';
import Request from './_common/Request';
import RequestError from './_common/RequestError';
import SuccessMessage from './_common/SuccessMessage';
import CloseButton from './_common/CloseButton';
import InfoMessage from './_common/InfoMessage';

export default createReactClass({
    displayName: 'OverlayTemplate',

    propTypes: {
        data: PropTypes.object,
        validators: PropTypes.object,
        onChange: PropTypes.func,
        request: PropTypes.object,
        callbacks: PropTypes.object,
        schema: PropTypes.object.isRequired,
        fieldMap: PropTypes.object.isRequired,
        actionMap: PropTypes.object.isRequired,
        config: PropTypes.object.isRequired,
        model: PropTypes.object
    },

    getInitialState: function () {
        const {
            data,
            model,
            config
        } = this.props;

        return {
            isSaving: false,
            showSuccessMessage: false,
            hasError: false,
            request: null,
            data: model ? model.data : data || config.data || {}
        }
    },

    getTemplateProps: function () {
        const {
            config
        } = this.props;

        return _result(config.props, this.props);
    },

    onSubmit: function () {
        const { data } = this.state;

        const {
            request
        } = this.getTemplateProps();

        this.setState({
            isSaving: true,
            showSuccessMessage: false,
            hasError: false,
            request: request(data, this)
        });
    },

    onChange: function (name, value) {
        const data = _.merge({}, this.state.data);
        data[name] = value;
        this.setState({
            data: data
        });
    },

    onRequestSuccess: function (request) {
        this.setState({
            isSaving: false,
            request: request,
            showSuccessMessage: true,
            hasError: false
        });
        this.props.onSubmit(request);
    },

    onRequestError: function (request) {
        this.setState({
            isSaving: false,
            request: request,
            hasError: true
        });
    },

    render: function () {
        const {
            schema,
            formMap,
            fieldMap,
            actionMap,
            config,
            onCancel
        } = this.props;

        const {
            data,
            request,
            isSaving,
            showSuccessMessage,
            hasError
        } = this.state;

        const callbacks = {
            onSubmit: this.onSubmit,
            onCancel: onCancel
        };

        const {
            title,
            subtitle,
            information,
            reducer,
            successMessage,
            formatError
        } = this.getTemplateProps();

        const requestProps = {
            request: request,
            reducer: reducer,
            onSuccess: this.onRequestSuccess,
            onError: this.onRequestError
        };

        return (
            <Overlay isVisible={isSaving}>
                <div>
                    <CardTitle
                        title={title}
                        subtitle={subtitle}
                    />
                    <CloseButton onClick={onCancel} />
                    {information ? (
                        <InfoMessage>
                            {information}
                        </InfoMessage>
                    ) : null}
                    {(request && isSaving) ? (
                        <Request {...requestProps} />
                    ) : null}
                    {showSuccessMessage ? (
                        <SuccessMessage {..._.defaults(successMessage, {
                            title: 'Success!',
                            message: 'Data saved.'
                        })} />
                    ) : null}
                    {hasError ? (
                        <RequestError request={request}>
                            {(request) => {
                                if (_.isFunction(formatError)) {
                                    return formatError(request.error);
                                }
                                return request.error;
                            }}
                        </RequestError>
                    ) : null}
                    <SchemaForm
                        data={data}
                        // validators={validators}
                        onChange={this.onChange}
                        callbacks={callbacks}
                        schema={schema}
                        fieldMap={fieldMap}
                        actionMap={actionMap}
                        config={config}
                    />
                </div>
            </Overlay>
        );
    }

});
