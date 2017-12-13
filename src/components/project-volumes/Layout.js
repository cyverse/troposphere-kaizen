import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { connect } from 'lore-hook-connect';
import { CircularProgress } from 'material-ui';
import ProjectVolumes from './ProjectVolumes';
import PayloadStates from '../../constants/PayloadStates';

export default connect(function(getState, props) {
    return {
        project: getState('project.byId', {
            id: props.params.projectId
        })
    }
})(
createReactClass({
    displayName: 'Layout',

    propTypes: {
        project: PropTypes.object.isRequired
    },

    render: function () {
        const { project } = this.props;

        if (project.state === PayloadStates.FETCHING) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <CircularProgress />
                </div>
            );
        }

        return (
            <ProjectVolumes project={project} />
        );
    }

})
);
