import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { IconButton, IconMenu } from 'material-ui';
import { NavigationMoreVert } from 'material-ui/svg-icons';

const styles = {
  container: {
    paddingTop: '12px',
    paddingBottom: '12px'
  },
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'bottom'
  },
  targetOrigin: {
    horizontal: 'right',
    vertical: 'top'
  }
};

export default createReactClass({
  displayName: 'MediaCardMenu',

  propTypes: {
    children: PropTypes.node.isRequired
  },

  render: function() {
    let {
      children
    } = this.props;

    return (
      <div style={styles.container}>
        <IconMenu
          iconButtonElement={(
            <IconButton>
              <NavigationMoreVert />
            </IconButton>
          )}
          anchorOrigin={styles.anchorOrigin}
          targetOrigin={styles.targetOrigin}
        >
          {children}
        </IconMenu>
      </div>
    );
  }
});
