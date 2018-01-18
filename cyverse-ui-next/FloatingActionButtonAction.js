import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import { FloatingActionButton } from 'material-ui';
import { Tooltip } from 'cyverse-ui-next';

export default createClass({
    displayName: 'FloatingActionButtonAction',

    propTypes: {
        direction: PropTypes.node.isRequired,
        icon: PropTypes.node,
        onClick: PropTypes.func.isRequired,
        tooltip: PropTypes.string.isRequired
    },

    getDefaultProps() {
      return {
          tooltip: '',
          direction: 'left',
          onClick: () => {}
      }
    },

    getStyles(isOpen) {
        return {
            li: {
                position: "relative",
                padding: "10px 0",
                transform: isOpen ? "scale(1)" : "scale(0)",
                transition: "transform ease .1s",
            }
        }
    },

    render() {
        const {
            direction,
            tooltip,
            icon,
            isOpen,
            ...other
        } = this.props;

        const styles = this.getStyles(isOpen);

        return (
            <li style={styles.li}>
                <Tooltip
                    direction={direction}
                    message={tooltip}
                >
                    <FloatingActionButton mini={true} {...other}>
                        {icon}
                    </FloatingActionButton>
                </Tooltip>
            </li>
       )
    }

});
