import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Paper, Divider, List } from 'material-ui';
import { SkeletonList } from 'cyverse-ui';
import { connect } from 'lore-hook-connect';
import _ from 'lodash';
import PayloadStates from '../../constants/PayloadStates';
import Project from './Project';

export default connect((getState, props) => {
    return {
        projects: getState('project.findAll')
    };
})(
    createReactClass({
        displayName: 'Projects',

        propTypes: {
            projects: PropTypes.object.isRequired
        },

        render: function () {
            const { projects } = this.props;

            if (projects.state === PayloadStates.FETCHING) {
                return (
                    <SkeletonList cardCount={4}/>
                );
            }

            return (
                <Paper>
                    <List style={{padding: '0px'}}>
                        {_.flatten(projects.data.map((project, index) => {
                            const items = [(
                                <Project
                                    key={project.id || project.cid}
                                    project={project}
                                />
                            )];

                            if (index < (projects.data.length - 1)) {
                                items.push(
                                    <Divider key={`divider-${project.id || project.cid}`}/>
                                );
                            }

                            return items;
                        }))}
                    </List>
                </Paper>
            );
        }

    }));
