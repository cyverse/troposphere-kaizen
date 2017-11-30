import React from 'react';
import createReactClass from 'create-react-class';
import { Paper } from 'material-ui';

const styles = {
  table: {
    fontSize: '14px',
    width: '100%',
    color: 'rgba(0, 0, 0, 0.54)',
    lineHeight: '28px'
  }
};

export default createReactClass({
  displayName: 'Layout',

  render: function() {
    return (
      <Paper style={{ height: '28px', position: 'relative', marginBottom: '8px' }}>
        <div style={styles.table}>
          <div style={{ position: 'absolute', left: '8px' }}>
            Name
          </div>
          <div style={{ position: 'absolute', left: '25%' }}>
            Summary
          </div>
          <div style={{ position: 'absolute', left: '65%' }}>
            Resources
          </div>
        </div>
      </Paper>
    );
  }

});
