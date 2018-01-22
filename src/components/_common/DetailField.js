import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
    displayName: 'DetailField',

    propTypes: {
        label: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired
    },

    render: function () {
        const { label, children } = this.props;

        return (
            <div className="row detail-field">
                <div className="col-3 label">
                    {label}
                </div>
                <div className="col-9 value">
                    {children}
                </div>
            </div>
        );
    }
});
