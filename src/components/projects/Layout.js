import React from 'react';
import createReactClass from 'create-react-class';
import ListHeader from './ListHeader';
import Projects from './Projects';
import Header from '../_common/Header';
import Subheader from '../_common/Subheader';

export default createReactClass({
    displayName: 'Layout',

    render: function () {
        return (
            <div>
                <Header zDepth={0}/>
                <Subheader title="Project List"/>
                <div className="container">
                    <div style={{paddingTop: '64px'}}>
                        <ListHeader/>
                        <Projects/>
                    </div>
                </div>
            </div>
        );
    }

});
