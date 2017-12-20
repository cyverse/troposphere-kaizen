import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { IconButton } from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons';

const styles = {
    button: {
        position: 'absolute',
        top: '0px',
        right: '0px',
        zIndex: 10
    },
    icon: {
        color: 'rgba(0, 0, 0, 0.54)'
    }
};

export default createReactClass({
    displayName: 'CloseButton',

    propTypes: {
        onClick: PropTypes.func.isRequired
    },

    render() {
        const { onClick } = this.props;

        return (
            <IconButton style={styles.button} onClick={onClick}>
                <NavigationClose
                    color={styles.icon.color}
                    hoverColor="rgba(0, 0, 0, 0.67)"
                />
            </IconButton>
        )
    }
});
