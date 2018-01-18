import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import ListHeader from './ListHeader';
import Projects from './Projects';
import Header from '../_common/Header';
import Subheader from '../_common/Subheader';
import FloatingActionButton from './FloatingActionButton';
import CreateProjectDialog from '../../dialogs/project/create';

export default createReactClass({
    displayName: 'Layout',

    contextTypes: {
        user: PropTypes.object.isRequired
    },

    render: function () {
        const { user } = this.context;

        return (
            <div>
                <Header zDepth={0}/>
                <Subheader title="Project List">
                    <FloatingActionButton onClick={() => {
                        lore.dialog.show(() => {
                            return (
                                <CreateProjectDialog />
                            );
                        });
                    }}/>
                </Subheader>
                <div className="container">
                    <div style={{ paddingTop: '64px' }}>
                        <ListHeader/>
                        <Projects/>
                    </div>
                </div>
            </div>
        );
    }

});
