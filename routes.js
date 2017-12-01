import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import withMuiTheme from './src/decorators/withMuiTheme';

/**
 * Wrapping the Master component with this decorator provides an easy way
 * to redirect the user to a login experience if we don't know who they are.
 */
import UserIsAuthenticated from './src/decorators/UserIsAuthenticated';

/**
 * Routes are used to declare your view hierarchy
 * See: https://github.com/rackt/react-router/blob/master/docs/API.md
 */
import Master from './src/components/Master';
import Layout from './src/components/Layout';

// Login
import LoginLayout from './src/components/Login';
import LogoutLayout from './src/components/Logout';
import OAuthLayout from './src/components/auth-oauth/Layout';

// Other
import ProjectsLayout from './src/components/projects/Layout';

// Placeholder Route
import Placeholder from './src/components/_common/Header';

export default (
    <Route>
        <Route path="/login" component={LoginLayout}/>
        <Route path="/logout" component={LogoutLayout}/>
        <Route path="/auth/oauth" component={OAuthLayout}/>

        <Route component={UserIsAuthenticated(withMuiTheme(Master))}>
            <Route component={Layout}>
                <Route path="/" component={() => <Placeholder zDepth={2}/>}/>
                <Route path="/projects" component={ProjectsLayout}/>
                <Route path="/images" component={() => <Placeholder zDepth={2}/>}/>
            </Route>
        </Route>
    </Route>
);
