/* eslint consistent-return: "off" */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default createReactClass({
    displayName: 'FormSection',

    propTypes: {
        element: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        children: PropTypes.node.isRequired
    },

    getDefaultProps: function () {
        return {
            element: 'div',
            className: '',
            style: {}
        };
    },

    createFields: function () {
        return React.Children.map(this.props.children, (child) => {
            if (React.isValidElement(child)) {
                const props = _.omit(this.props, ['className', 'style', 'children']);
                return React.cloneElement(child, props);
            }
        });
    },

    render: function () {
        const element = this.props.element;
        const className = this.props.className;
        const style = this.props.style;

        const props = {
            className: className || null,
            style: style || null
        };

        return React.createElement(element, props,
            this.createFields()
        );
    }

});
