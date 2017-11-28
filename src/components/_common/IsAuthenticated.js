import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import PayloadStates from '../../constants/PayloadStates';

export default createReactClass({
  displayName: 'IsAuthenticated',

  contextTypes: {
    user: PropTypes.object.isRequired
  },

  render: function() {
    const {
      user
    } = this.context;

    if (user.state !== PayloadStates.ERROR_FETCHING) {
      return this.props.children;
    }

    return null;
  }

});
