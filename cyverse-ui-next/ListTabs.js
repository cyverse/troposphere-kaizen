import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Tabs } from 'material-ui';
import _ from 'lodash';

export default createReactClass({
    displayName: 'ListTabs',

    propTypes: {
        children: PropTypes.node.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        tabWidth: PropTypes.number
    },

    contextTypes: {
        muiTheme: PropTypes.object.isRequired
    },

    getStyles() {
        const { muiTheme } = this.context;
        const { children, tabWidth, height, style } = this.props;

        return _.merge({
            tabItemContainerStyle: {
                background: 'white',
                // height: height || '56px'
            },
            inkBarStyle: {
                backgroundColor: muiTheme.palette.primary1Color
            },
            style: {
                maxWidth: children.length*(tabWidth || 150)
            },
            contentContainerStyle: {
                display: 'none'
            }
        }, style);
    },

    render: function () {
        const {
            children,
            value,
            onChange
        } = this.props;

        const styles = this.getStyles();

        const muiChildren = React.Children.map(children, (child) => {
            child.type.muiName = 'Tab';
            return child;
        });

        return (
            <Tabs value={value} onChange={onChange} {...styles}>
                {muiChildren}
            </Tabs>
        );
    }

});
