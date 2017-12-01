import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import auth from '../utils/auth';
import { withRouter } from 'react-router';
import { ActionTypes } from 'lore-utils';
import LoadingScreen from './_common/LoadingScreen';

export default withRouter(createReactClass({
  displayName: 'Logout',

    propTypes: {
        router: PropTypes.object.isRequired
    },

    componentDidMount: function () {
        const { logoutUrl } = lore.config.cas;

        // remove user's auth token from localStorage
        auth.logout();

        // If logoutUrl is specified, redirect the user to it, otherwise
        // reset the store and navigate back to the home route
        if (logoutUrl) {
            window.location.href = lore.config.cas.logoutUrl;
        } else {
            lore.store.dispatch({
                type: ActionTypes.RESET_STORE,
                payload: {}
            });
            this.props.router.push('/');
        }
    },

    render: function () {
        return (
            <LoadingScreen/>
        );
    }

}));
