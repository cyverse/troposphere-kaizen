import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getState } from 'lore-hook-connect';
import FullScreenDialog from '../../../../src/decorators/FullScreenDialog';
import Overlay from '../../_templates/_common/Overlay';
import Request from '../../_templates/_common/Request';
import ImageInformation from './ImageInformation';
import VersionInformation from './VersionInformation';
import PrivacySettings from './PrivacySettings';
import AddBootscripts from './AddBootscripts';
import AddLicenses from './AddLicenses';
import ExcludeFiles from './ExcludeFiles';
import ConfirmationScreen from './ConfirmationScreen';
import Steps from './_common/Steps';

export default FullScreenDialog()(createReactClass({
    displayName: 'Instance/Image',

    propTypes: {
        instance: PropTypes.object,
        // router: PropTypes.object.isRequired,
        onCancel: PropTypes.func
    },

    request: function(data) {
        return lore.actions.machineRequest.create({
            image: data.image,
            access_list: data.access_list || '',
            exclude_files: data.exclude_files || '[no files specified]',
            identity: data.identity,
            installed_software: data.installed_software || '[no files specified]',
            instance: data.instance,
            iplant_sys_files: data.iplant_sys_files || '[no files specified]',
            new_application_access_list: data.new_application_access_list || [],
            new_application_description: data.new_application_description,
            new_application_name: data.new_application_name,
            new_application_visibility: data.new_application_visibility,
            new_machine_owner: data.new_machine_owner,
            new_version_allow_imaging: data.new_version_allow_imaging,
            new_version_change_log: data.new_version_change_log,
            new_version_cpu_min: data.new_version_cpu_min || '0',
            new_version_forked: data.new_version_forked,
            new_version_licenses: data.new_version_licenses || [],
            new_version_memory_min: data.new_version_memory_min || '0',
            new_version_name: data.new_version_name,
            new_version_scripts: data.new_version_scripts || [],
            new_version_tags: data.new_version_tags || ''
        }).payload;
    },

    getInitialState() {
        const {
            instance,
            data
        } = this.props;

        return {
            stepIndex: Steps.IMAGE_INFORMATION,
            data: _.extend({}, {
                image: instance.data.image,
                access_list: '',
                exclude_files: '',
                identity: instance.data.identity,
                installed_software: '',
                instance: instance.id,
                iplant_sys_files: '',
                new_application_access_list: [],
                new_application_description: '',
                new_application_name: instance.data.name,
                new_application_visibility: 'private',
                new_machine_owner: instance.data.user,
                new_version_allow_imaging: true,
                new_version_change_log: '',
                new_version_cpu_min: '0',
                new_version_forked: true,
                new_version_licenses: [],
                new_version_memory_min: '0',
                new_version_name: '1.0',
                new_version_scripts: [],
                new_version_tags: ''
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
        const { onCancel } = this.props;
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
            stepIndex: Steps.EXCLUDE_FILES
        });
    },

    onHideAdvancedSettings: function(newData) {
        const { data } = this.state;

        this.setState({
            data: _.extend({}, data, newData),
            stepIndex: Steps.PRIVACY_SETTINGS
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
                        <ImageInformation
                            {...props}
                            hasError={hasError}
                            request={request}
                            callbacks={{
                                onNext: (newData) => {
                                    this.onNext(newData, Steps.VERSION_INFORMATION)
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
                        <VersionInformation
                            {...props}
                            hasError={hasError}
                            request={request}
                            callbacks={{
                                onNext: (newData) => {
                                    this.onNext(newData, Steps.PRIVACY_SETTINGS)
                                },
                                onPrevious: (newData) => {
                                    this.onPrevious(newData, Steps.IMAGE_INFORMATION)
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
                        <PrivacySettings
                            {...props}
                            hasError={hasError}
                            request={request}
                            callbacks={{
                                onPrevious: (newData) => {
                                    this.onPrevious(newData, Steps.VERSION_INFORMATION)
                                },
                                onShowAdvancedSettings: (newData) => {
                                    this.onChangeStep(newData, Steps.EXCLUDE_FILES)
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
                        <ExcludeFiles
                            {...props}
                            hasError={hasError}
                            request={request}
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
                        <AddBootscripts
                            {...props}
                            hasError={hasError}
                            request={request}
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
                        <AddLicenses
                            {...props}
                            hasError={hasError}
                            request={request}
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
                            reducer="machineRequest"
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
