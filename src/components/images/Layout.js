import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Header from '../_common/Header';
import Subheader from './Subheader';

export default createReactClass({
    displayName: 'Layout',

    render: function () {
        const { children } = this.props;

        return (
            <div>
                <Header zDepth={0} />
                <Subheader />
                <div className="container">
                    {children ? React.cloneElement(children) : null}
                </div>
            </div>
        );
    }

});
