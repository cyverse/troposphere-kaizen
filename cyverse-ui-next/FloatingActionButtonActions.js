import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createClass({
    displayName: 'FloatingActionButtonActions',

    propTypes: {
        children: PropTypes.node.isRequired
    },

    getStyles(isOpen) {
        return {
            actionList: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "absolute",
                width: "100%",
                top: "100%",
                listStyle: "none",
                padding: "0",
                transform: isOpen ? "scale(1)" : "scale(0)",
                transition: "transform ease .1s",
                transformOrigin: "top"
            }
        }
    },

    render() {
        const { children, isOpen } = this.props;
        const styles = this.getStyles(isOpen);

        return (
            <ul style={styles.actionList}>
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, { isOpen: isOpen })
                })}
            </ul>
       );
    }
});
