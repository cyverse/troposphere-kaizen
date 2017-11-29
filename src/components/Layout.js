/**
 * This component is intended to reflect the high level structure of your application,
 * and render any components that are common across all views, such as the header or
 * top-level navigation. All other components should be rendered by route handlers.
 **/

import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Header from './_common/Header';

export default createReactClass({

  render() {
    return (
      <div>
        <Header/>
        {/*{React.cloneElement(this.props.children)}*/}
      </div>
    );
  }

});
