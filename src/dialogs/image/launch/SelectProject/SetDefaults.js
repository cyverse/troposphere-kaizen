import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { CircularProgress } from 'material-ui';
import { Connect } from 'lore-hook-connect';
import PayloadStates from '../../../../constants/PayloadStates';

export default createReactClass({
    displayName: 'SetDefaults',

    propTypes: {
        data: PropTypes.object.isRequired,
        onSetDefaults: PropTypes.func.isRequired
    },

    render: function() {
        const {
            data,
            onSetDefaults
        } = this.props;

        return (
            <div style={{ textAlign: 'center', marginTop: 72 }}>
                <Connect callback={(getState, props) => {
                    return {
                        project: data.project ? getState('project.byId', {
                            id: data.project
                        }) : getState('project.first')
                    }
                }}>
                    {(props) => {
                        const { project } = props;

                        if (project.state === PayloadStates.FETCHING) {
                            return (
                                <CircularProgress />
                            );
                        }

                        return (
                            <Connect callback={(getState, props) => {
                                const data = {
                                    project: project.id
                                };
                                onSetDefaults(data);
                                return {};
                            }}>
                                <CircularProgress />
                            </Connect>
                        );
                    }}
                </Connect>
            </div>
        );
    }

});
