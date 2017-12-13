import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { connect } from 'lore-hook-connect';
import { CircularProgress } from 'material-ui';
import PayloadStates from '../../constants/PayloadStates';
import Header from '../_common/Header';
import Subheader from '../_common/Subheader';
import Tabs from './Tabs';
import ProjectIdentity from './ProjectIdentity';

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
        const {
            children,
            project
        } = this.props;
        const {  } = this.props;

        if (project.state === PayloadStates.FETCHING) {
            return (
                <div>
                    <Header zDepth={0} />
                    <Subheader title="Project Resources" />
                    <div className="container">
                        <div style={{ paddingTop: '32px', textAlign: 'center' }}>
                            <CircularProgress />
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Header zDepth={0}/>
                <Subheader title="Project Resources" />
                <div className="container">
                    <div style={{ paddingTop: '32px' }}>
                        <ProjectIdentity project={project} />
                        <Tabs project={project}/>
                        {children? React.cloneElement(children) : null}
                    </div>
                </div>
            </div>
        );
    }

})
);
