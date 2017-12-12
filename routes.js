import React from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';
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
import ImagesLayout from './src/components/images/Layout';
import ImageSearchLayout from './src/components/images-search/Layout';
import ImageSearchAllLayout from './src/components/images-search-all/Layout';
import ImageSearchFeaturedLayout from './src/components/images-search-featured/Layout';
import ImageSearchFavoritesLayout from './src/components/images-search-favorites/Layout';
import ImageSearchMineLayout from './src/components/images-search-mine/Layout';
import ImageTagsLayout from './src/components/images-tags/Layout';

// Placeholder Route
import Placeholder from './src/components/_common/Header';

export default (
    <Route>
        <Route path="/login" component={LoginLayout}/>
        <Route path="/logout" component={LogoutLayout}/>
        <Route path="/auth/oauth" component={OAuthLayout}/>

        <Route component={UserIsAuthenticated(withMuiTheme(Master))}>
            <Route component={Layout}>
                <Route path="/" component={() => <Placeholder zDepth={2} />} />
                <Route path="/projects" component={ProjectsLayout} />
                <Route path="/images" component={ImagesLayout}>
                    <IndexRedirect to="search" />
                    <Route path="search" component={ImageSearchLayout}>
                        <IndexRedirect to="all" />
                        <Route path="all" component={ImageSearchAllLayout} />
                        <Route path="featured" component={ImageSearchFeaturedLayout} />
                        <Route path="favorites" component={ImageSearchFavoritesLayout} />
                        <Route path="mine" component={ImageSearchMineLayout} />
                    </Route>
                    <Route path="tags" component={ImageTagsLayout} />
                    <Route path="my-image-requests" component={() => <div />} />
                </Route>
            </Route>
        </Route>
    </Route>
);
