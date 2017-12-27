import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { CardTitle, List, ListItem } from 'material-ui';
import SchemaActions from '../../../_templates/_forms/SchemaActions';
import InfoMessage from '../../../_templates/_common/InfoMessage';
import Steps from './Steps';

export default createReactClass({
    displayName: 'AdvancedNavigation',

    propTypes: {
        schema: PropTypes.object.isRequired,
        actionMap: PropTypes.object.isRequired,
        form: PropTypes.object.isRequired,
        activeStep: PropTypes.number.isRequired,
        helpText: PropTypes.node
    },

    render: function() {
        const {
            schema,
            actionMap,
            form,
            activeStep,
            helpText
        } = this.props;

        return (
            <div>
                <CardTitle
                    title="Instance Launch Wizard"
                    subtitle="(Advanced Settings)"
                />
                <List>
                    {[
                        { label: 'Bootscripts', stepIndex: Steps.ADD_BOOTSCRIPTS },
                        { label: 'Reserved IP', stepIndex: Steps.ADD_RESERVED_IP },
                        { label: 'SSH Keys', stepIndex: Steps.ADD_SSH_KEYS },
                        { label: 'Change Version', stepIndex: Steps.CHANGE_IMAGE_VERSION }
                    ].map((item, index) => {
                        return (
                            <ListItem
                                key={index}
                                primaryText={item.label}
                                style={{
                                    backgroundColor: item.stepIndex === activeStep ? '#f2f2f2' : 'white',
                                    marginLeft: -15,
                                    marginRight: -15
                                }}
                                innerDivStyle={{
                                    paddingLeft: 31,
                                    paddingRight: 31
                                }}
                                onClick={() => {
                                    form.callbacks.onChangeStep(form.data, item.stepIndex)
                                }}
                            />
                        );
                    })}
                </List>
                {helpText ? (
                    <InfoMessage>
                        {helpText}
                    </InfoMessage>
                ) : null}
                <SchemaActions
                    schema={schema}
                    actionMap={actionMap}
                    form={form}
                    actions={[
                        {
                            type: 'raised',
                            props: {
                                label: 'Exit Advanced Settings',
                                primary: true,
                                style: {
                                    display: 'block',
                                    width: '100%'
                                },
                                onTouchTap: () => {
                                    form.callbacks.onHideAdvancedSettings(form.data)
                                }
                            }
                        }
                    ]}
                />
            </div>
        );
    }

});
