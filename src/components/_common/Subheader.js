import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Paper } from 'material-ui';

const styles = {
  paper: {
    zDepth: 2
  },
  title: {
    style: {
      fontSize: '20px',
      fontWeight: '400',
      letterSpacing: '1px',
      margin: '0px',
      lineHeight: '56px'
    }
  }
};

export default createReactClass({
  displayName: 'Layout',

  propTypes: {
    title: PropTypes.string.isRequired
  },

  render: function() {
    const { title } = this.props;

    return (
      <Paper {...styles.paper}>
        <div className="container">
          <h1 {...styles.title}>
            {title}
          </h1>
        </div>
      </Paper>
    );
  }

});
