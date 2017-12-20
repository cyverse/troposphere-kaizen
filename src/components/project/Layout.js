import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import { connect } from 'lore-hook-connect';
import { CircularProgress } from 'material-ui';
import PayloadStates from '../../constants/PayloadStates';
import Header from '../_common/Header';
import Subheader from '../_common/Subheader';
import FloatingActionButton from '../projects/FloatingActionButton';
import Tabs from './Tabs';
import ProjectIdentity from './ProjectIdentity';
import ImageLaunchDialog from '../../dialogs/image/launch';

const styles = {
    container: {
        position :'relative'
    },
    floatingActionButton: {
        top: '-28px'
    },
    page: {
        paddingTop: '32px'
    },
    loader: {
        paddingTop: '32px',
        textAlign: 'center'
    }
};

export default connect(function(getState, props) {
    return {
        project: getState('project.byId', {
            id: props.params.projectId
        })
    }
})(
withRouter(createReactClass({
    displayName: 'Layout',

    propTypes: {
        project: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired
    },

    render: function () {
        const {
            children,
            project,
            router
        } = this.props;
        const {  } = this.props;

        if (project.state === PayloadStates.FETCHING) {
            return (
                <div>
                    <Header zDepth={0} />
                    <Subheader title="Project Resources" />
                    <div className="container">
                        <div style={styles.loader}>
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
                <div className="container" style={styles.container}>
                    <FloatingActionButton
                        style={styles.floatingActionButton}
                        onClick={() => {
                            lore.dialog.show(() => {
                                return (
                                    <ImageLaunchDialog
                                        project={project}
                                        router={router}
                                    />
                                )
                            });
                        }}
                    />
                    <div style={styles.page}>
                        <ProjectIdentity project={project} />
                        <Tabs project={project}/>
                        {children? React.cloneElement(children) : null}
                    </div>
                </div>
            </div>
        );
    }

}))
);
