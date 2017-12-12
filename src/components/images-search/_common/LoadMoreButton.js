import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import PayloadStates from '../../../constants/PayloadStates';

const styles = {
    container: {
        display: 'table',
        margin: 'auto',
        marginTop: '32px'
    }
};

export default createReactClass({
  displayName: 'LoadMoreButton',

  propTypes: {
    label: PropTypes.string.isRequired,
    lastPage: PropTypes.object.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    nextPageMetaField: PropTypes.string.isRequired
  },

  render: function() {
    const {
        lastPage,
        nextPageMetaField
    } = this.props;

    if (lastPage.state === PayloadStates.FETCHING) {
      return (
          <div style={styles.container}>
              <RaisedButton
                  disabled={true}
                  label="..."
              />
          </div>
      );
    }

    if (!lastPage.meta[nextPageMetaField]) {
      return (
        <div/>
      );
    }

    return (
      <div style={styles.container}>
        <RaisedButton
          onTouchTap={this.props.onLoadMore}
          label={this.props.label}
        />
      </div>
    );
  }

});
