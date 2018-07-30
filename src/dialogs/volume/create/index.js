import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getState } from 'lore-hook-connect';
import { Overlay, Request } from 'lore-react-forms-material-ui';
import SelectProject from './SelectProject';
import BasicSettings from './BasicSettings';
import ConfirmationScreen from './ConfirmationScreen';
import Steps from './_common/Steps';

export default createReactClass({
    displayName: 'Volume/Create',

    propTypes: {
        project: PropTypes.object,
        image: PropTypes.object,
        router: PropTypes.object.isRequired,
        onCancel: PropTypes.func
    },

    request: function(data) {
        const project = getState('project.byId', { id: data.project });
        const identity = getState('identity.byId', { id: data.identity });

        return lore.actions.volume.create({
            project: project.data.uuid,
            name: data.name,
            identity: identity.data.uuid,
            size: Number(data.size)
        }).payload;
    },

    getInitialState() {
        const {
            project,
            image,
            data
        } = this.props;

        function getInitialStepIndex() {
            if (!project) {
                return Steps.SELECT_PROJECT;
            }

            return Steps.BASIC_SETTINGS;
        }

        return {
            stepIndex: getInitialStepIndex(),
            data: _.extend({}, {
                project: project ? project.id : undefined,
                name: '',
                identity: undefined,
                size: 1
            }, data),
            isSaving: false,
            request: null,
            hasError: false
        }
    },

    onSubmit: function(newData) {
        const { data } = this.state;
        const nextData = _.extend({}, data, newData);

        this.setState({
            isSaving: true,
            hasError: false,
            data: nextData,
            request: this.request(nextData, this)
        });
    },

    onRequestSuccess: function(request) {
        this.setState({
            isSaving: false,
            request: request,
            hasError: false,
            stepIndex: Steps.CONFIRMATION
        });
    },

    onRequestError: function(request) {
        this.setState({
            isSaving: false,
            request: request,
            hasError: true
        });
    },

    onResetWizard: function() {
        this.setState(_.extend(this.getInitialState(), {
            stepIndex: 0
        }));
    },

    onNavigateToVolume() {
        const {
            router,
            onCancel
        } = this.props;
        const { data } = this.state;

        router.push(`/projects/${data.project}/volumes`);
        onCancel();
    },

    onNext: function(newData, newStepIndex) {
        const {
            data,
            stepIndex
        } = this.state;

        this.setState({
            stepIndex: newStepIndex || (stepIndex + 1),
            data: _.extend({}, data, newData)
        });
    },

    onPrevious: function(newData, newStepIndex) {
        const {
            data,
            stepIndex
        } = this.state;

        this.setState({
            stepIndex: newStepIndex || (stepIndex - 1),
            data: _.extend({}, data, newData)
        });
    },

    onChangeStep(newData, newStepIndex) {
        const { data } = this.state;

        this.setState({
            stepIndex: newStepIndex,
            data: _.extend({}, data, newData)
        });
    },

    render: function() {
        const {
            onSubmit,
            onCancel
        } = this.props;

        const {
            data,
            stepIndex,
            request,
            isSaving,
            hasError
        } = this.state;

        const {
            schemas,
            fieldMap,
            actionMap
        } = lore.config.dialogs;

        const steps = [
            {
                form: 'custom',
                render: (props) => {
                    return (
                        <SelectProject
                            {...props}
                            callbacks={{
                                onNext: (newData) => {
                                    this.onNext(newData, Steps.BASIC_SETTINGS)
                                },
                                onCancel: onCancel
                            }}
                        />
                    );
                }
            },
            {
                form: 'custom',
                render: (props) => {
                    return (
                        <BasicSettings
                            {...props}
                            hasError={hasError}
                            request={request}
                            callbacks={{
                                onPrevious: (newData) => {
                                    this.onPrevious(newData, Steps.SELECT_PROJECT)
                                },
                                onSubmit: this.onSubmit,
                                onCancel: onCancel
                            }}
                        />
                    );
                }
            },
            {
                form: 'custom',
                render: (props) => {
                    return (
                        <ConfirmationScreen
                            {...props}
                            callbacks={{
                                onResetWizard: this.onResetWizard,
                                onNavigateToVolume: this.onNavigateToVolume,
                                onCancel: onCancel
                            }}
                        />
                    );
                }
            }
        ];

        const step = steps[stepIndex].render({
            data: data,
            schema: schemas.default,
            fieldMap: fieldMap,
            actionMap: actionMap
        });

        return (
            <Overlay isVisible={isSaving}>
                <div>
                    {(request && isSaving) ? (
                        <Request
                            request={request}
                            reducer="volume"
                            onSuccess={this.onRequestSuccess}
                            onError={this.onRequestError}
                        />
                    ) : null}
                    {step}
                </div>
            </Overlay>
        );
    }

});
