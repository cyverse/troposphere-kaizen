import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { ActionInfo } from 'material-ui/svg-icons';

const styles = {
    container: {
        paddingLeft: '16px',
        position: 'relative',
        paddingBottom: '16px'
    },
    iconWrapper: {
        position: 'absolute'
    },
    icon: {
        color: 'rgba(0,0,0,.54)'
    },
    text: {
        marginLeft: '30px',
        lineHeight: '24px'
    }
};

export default createReactClass({
    displayName: 'InfoMessage',

    propTypes: {
        children: PropTypes.node.isRequired
    },

    render() {
        const { children } = this.props;

        return (
            <div style={styles.container}>
                <div style={styles.iconWrapper}>
                    <ActionInfo color={styles.icon.color} />
                </div>
                <div style={styles.text}>
                    {children}
                </div>
            </div>
        );
    }
});
