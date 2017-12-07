import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
    displayName: 'PropBarrier',

    propTypes: {
        element: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object
    },

    getDefaultProps: function () {
        return {
            element: 'div',
            className: '',
            style: {},
        };
    },

    render: function () {
        const {
            element,
            className,
            style,
            children
        } = this.props;

        const props = {
            className: className || null,
            style: style || {}
        };

        if (children.length) {
            return React.createElement(element, props,
                this.props.children
            );
        }

        return React.createElement(element, props,
            this.props.children
        );
    }

});
