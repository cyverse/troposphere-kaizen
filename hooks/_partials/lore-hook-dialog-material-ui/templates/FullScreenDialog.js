import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import { Dialog } from 'material-ui';
import { connect } from 'lore-hook-connect';

export default connect(function() {
  return {};
}, { subscribe: true })(createReactClass({
  displayName: 'FullScreenDialog',

  propTypes: {
    dialog: PropTypes.node.isRequired
  },

  getInitialState: function() {
    return {
      isOpen: false
    }
  },

  /**
   * Have the dialog open after we mount the component to make sure
   * we see the opening transition - if we don't do this, it will
   * immediately snap into view on the screen (without a gentle transition)
   */
  componentDidMount: function() {
    this.setState({
      isOpen: true
    });
  },

  onDismiss: function() {
    this.setState({
      isOpen: false
    });
  },

  render: function () {
    const { dialog } = this.props;

    return (
      <Dialog
        modal={false}
        onRequestClose={this.onDismiss}
        open={this.state.isOpen}
        className="full-screen-dialog"
        contentClassName="content"
        paperClassName="paper"
        bodyClassName="body"
        bodyStyle={{ padding: 0, border: 'none' }}
        autoScrollBodyContent={true}
      >
        {React.cloneElement(dialog, {
          onCancel: this.onDismiss
        })}
      </Dialog>
    );
  }
}));
