import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getState } from 'lore-hook-connect';
import FullScreenDialog from '../../../../src/decorators/FullScreenDialog';
import Overlay from '../../_templates/_common/Overlay';
import Request from '../../_templates/_common/Request';
import SelectProject from './SelectProject';
import SelectImage from './SelectImage';
import BasicSettings from './BasicSettings';
import AddBootscripts from './AddBootscripts';
import AddReservedIp from './AddReservedIp';
import AddSshKeys from './AddSshKeys';
import ChangeImageVersion from './ChangeImageVersion';
import ConfirmationScreen from './ConfirmationScreen';
import Steps from './_common/Steps';

export default FullScreenDialog()(createReactClass({
    displayName: 'Image/Launch',

    propTypes: {
        project: PropTypes.object,
        image: PropTypes.object,
        router: PropTypes.object.isRequired,
        onCancel: PropTypes.func.isRequired
    },

    request: function(data) {
        const project = getState('project.byId', { id: data.project });
        const imageVersion = getState('imageVersion.byId', { id: data.image_version });
        const allocationSource = getState('allocationSource.byId', { id: data.allocation_source });
        const identity = getState('identity.byId', { id: data.identity });
        const size = getState('size.byId', { id: data.size });

        const machine = _.find(imageVersion.data.machines, (machine) => {
            return machine.provider.id === identity.data.provider;
        });

        return lore.actions.instance.create({
            project: project.data.uuid,
            name: data.name,
            source_alias: machine ? machine.uuid : 'image is not available on this provider',
            allocation_source_id: allocationSource.data.uuid,
            identity: identity.data.uuid,
            size_alias: size.data.alias,
            scripts: []
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

            if (!image) {
                return Steps.SELECT_IMAGE;
            }

            return Steps.BASIC_SETTINGS;
        }

        return {
            stepIndex: getInitialStepIndex(),
            data: _.extend({}, {
                image: image ? image.id : undefined,
                project: project ? project.id : undefined,
                name: image ? image.data.name : '',
                image_version: undefined,
                allocation_source: undefined,
                identity: undefined,
                size: undefined,
                scripts: []
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

    onNavigateToInstance() {
        const {
            router,
            onCancel
        } = this.props;
        const { data } = this.state;

        router.push(`/projects/${data.project}/instances`);
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

    onShowAdvancedSettings: function(newData) {
        const { data } = this.state;

        this.setState({
            data: _.extend({}, data, newData),
            stepIndex: Steps.ADD_BOOTSCRIPTS
        });
    },

    onHideAdvancedSettings: function(newData) {
        const { data } = this.state;

        this.setState({
            data: _.extend({}, data, newData),
            stepIndex: Steps.BASIC_SETTINGS
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
                                    this.onNext(newData, Steps.SELECT_IMAGE)
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
                        <SelectImage
                            {...props}
                            callbacks={{
                                onNext: (newData) => {
                                    this.onNext(newData, Steps.BASIC_SETTINGS)
                                },
                                onPrevious: (newData) => {
                                    this.onPrevious(newData, Steps.SELECT_PROJECT)
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
                                    this.onPrevious(newData, Steps.SELECT_IMAGE)
                                },
                                onShowAdvancedSettings: (newData) => {
                                    this.onChangeStep(newData, Steps.ADD_BOOTSCRIPTS)
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
                        <AddBootscripts
                            {...props}
                            callbacks={{
                                onChangeStep: this.onChangeStep,
                                onHideAdvancedSettings: this.onHideAdvancedSettings,
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
                        <AddReservedIp
                            {...props}
                            callbacks={{
                                onChangeStep: this.onChangeStep,
                                onHideAdvancedSettings: this.onHideAdvancedSettings,
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
                        <AddSshKeys
                            {...props}
                            callbacks={{
                                onChangeStep: this.onChangeStep,
                                onHideAdvancedSettings: this.onHideAdvancedSettings,
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
                        <ChangeImageVersion
                            {...props}
                            callbacks={{
                                onChangeStep: this.onChangeStep,
                                onHideAdvancedSettings: this.onHideAdvancedSettings,
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
                                onNavigateToInstance: this.onNavigateToInstance,
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
                            reducer="instance"
                            onSuccess={this.onRequestSuccess}
                            onError={this.onRequestError}
                        />
                    ) : null}
                    {step}
                </div>
            </Overlay>
        );
    }

}));
