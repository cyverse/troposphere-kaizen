import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { CardTitle, Stepper, Step, StepLabel, StepContent } from 'material-ui';
import { NavigationArrowForward, NavigationArrowBack } from 'material-ui/svg-icons';
import SchemaActions from '../../../_templates/_forms/SchemaActions';
import InfoMessage from '../../../_templates/_common/InfoMessage';

export default createReactClass({
    displayName: 'BasicNavigation',

    propTypes: {
        schema: PropTypes.object.isRequired,
        actionMap: PropTypes.object.isRequired,
        form: PropTypes.object.isRequired,
        activeStep: PropTypes.number.isRequired,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        helpText: PropTypes.node,
        previousButtonVisible: PropTypes.bool,
        nextButtonVisible: PropTypes.bool,
        otherButtonsVisible: PropTypes.bool,
    },

    getDefaultProps() {
        return {
            previousButtonVisible: false,
            nextButtonVisible: false,
            otherButtonsVisible: false
        };
    },

    render: function() {
        const {
            schema,
            actionMap,
            form,
            activeStep,
            title,
            subtitle,
            helpText,
            previousButtonVisible,
            nextButtonVisible,
            otherButtonsVisible
        } = this.props;

        return (
            <div>
                <CardTitle
                    title={title || 'Create Volume Wizard'}
                    subtitle={subtitle}
                />
                <Stepper activeStep={activeStep} orientation="vertical" style={{ marginBottom: '16px' }}>
                    {[
                        'Project Select',
                        'Basic Info',
                    ].map((step, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel>
                                    {step}
                                </StepLabel>
                                <StepContent/>
                            </Step>
                        );
                    })}
                </Stepper>
                {helpText ? (
                    <InfoMessage>
                        {helpText}
                    </InfoMessage>
                ) : null}
                <div className="clearfix" style={{ minHeight: 52 }}>
                <SchemaActions
                    schema={schema}
                    actionMap={actionMap}
                    form={form}
                    actions={_.flatten([
                        previousButtonVisible ? {
                            type: 'flat',
                            props: {
                                label: 'Back',
                                icon: <NavigationArrowBack />,
                                primary: true,
                                style: {
                                    float: 'left'
                                },
                                onClick: () => {
                                    form.callbacks.onPrevious(form.data)
                                }
                            }
                        } : [],
                        nextButtonVisible ? {
                            type: 'flat',
                            props: {
                                label: 'Next',
                                labelPosition: 'before',
                                icon: <NavigationArrowForward />,
                                primary: true,
                                disabled: form.hasError,
                                onClick: () => {
                                    form.callbacks.onNext(form.data)
                                }
                            }
                        } : [],
                    ])}
                />
                </div>
                {otherButtonsVisible ? (
                    <div>
                    <SchemaActions
                        schema={schema}
                        actionMap={actionMap}
                        form={form}
                        actions={[
                            {
                                type: 'raised',
                                props: {
                                    label: 'Create Volume',
                                    primary: true,
                                    disabled: form.hasError,
                                    style: {
                                        display: 'block',
                                        width: '100%'
                                    },
                                    onClick: () => {
                                        form.callbacks.onSubmit(form.data)
                                    }
                                }
                            }
                        ]}
                    />
                    </div>
                ) : null}
            </div>
        );
    }

});
