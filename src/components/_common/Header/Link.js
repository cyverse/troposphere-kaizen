import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import { Link, withRouter } from 'react-router';
import { FlatButton } from 'material-ui';
import _ from 'lodash';

export default withRouter(createReactClass({
  displayName: 'Header/Link',

  propTypes: {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    matches: PropTypes.array.isRequired,
    icon: PropTypes.node,
  },

  getDefaultProps: function() {
    return {
      matches: []
    }
  },

  getInitialState() {
    return {
      hovered: false
    }
  },

  getStyles() {
    const { hovered } = this.state;
    const isActive = this.isActive();

    return {
      backgroundColor: isActive ? '#075c8c' : '#1572A8',
      hoverColor: isActive ? '#075c8c' : '#1572A8',
      style: {
        height: '56px',
        color: (isActive || hovered) ? 'white' : 'hsla(0, 0%, 100%, 0.7)'
      }
    }
  },

  isActive() {
    const {
      to,
      matches,
      router
    } = this.props;

    const currentRoute = router.getCurrentLocation().pathname;

    return _.find(matches, (regex) => {
      return currentRoute.match(regex);
    }) || router.isActive(to);
  },

  onMouseEnter(event) {
    this.setState({
      hovered: true
    });
  },

  onMouseLeave(event) {
    this.setState({
      hovered: false
    });
  },

  onClick() {
    const {
      to,
      router
    } = this.props;
    router.push(to);
  },

  render: function() {
    const styles = this.getStyles();
    const {
      label,
      icon
    } = this.props;

    return (
      <FlatButton
        label={label}
        primary={true}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        icon={icon}
        onClick={this.onClick}
        {...styles}
      />
    );
  }

}));
