import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import { Paper } from 'material-ui';
import { Pill, ListTabs, ListTab } from 'cyverse-ui-next';
import { connect } from 'lore-hook-connect';
import PayloadStates from '../../constants/PayloadStates';
import IsAuthenticated from '../_common/IsAuthenticated';

const ROUTES = {
    ALL: '/images/search/all',
    FEATURED: '/images/search/featured',
    FAVORITES: '/images/search/favorites',
    MINE: '/images/search/mine'
};

const styles = {
    paper: {
        paddingLeft: '16px'
    }
};

export default withRouter(connect((getState, props) => {
    const { user, location } = props;

    return {
        images: getState('image.find', {
            where: {
                search: location.query.search
            },
            pagination: {
                page_size: 10
            }
        }),
        featuredImages: getState('image.find', {
            where: {
                tags__name: 'Featured',
                search: location.query.search
            }
        }),
        authoredImages: getState('image.find', {
            where: {
                created_by__username: user.data.username,
                search: location.query.search
            }
        }),
        imageBookmarks: getState('imageBookmark.find', {
            pagination: {
                page_size: 10,
                image__search: location.query.search
            }
        })
    }
})(
withRouter(createReactClass({
    displayName: 'Tabs',

    propTypes: {
        images: PropTypes.object.isRequired,
        featuredImages: PropTypes.object.isRequired,
        authoredImages: PropTypes.object.isRequired,
        imageBookmarks: PropTypes.object.isRequired,
    },

    getTabValue: function() {
        const { router } = this.props;

        if (router.isActive(ROUTES.ALL)) {
            return ROUTES.ALL;
        }

        if (router.isActive(ROUTES.FEATURED)) {
            return ROUTES.FEATURED;
        }

        if (router.isActive(ROUTES.FAVORITES)) {
            return ROUTES.FAVORITES;
        }

        if (router.isActive(ROUTES.MINE)) {
            return ROUTES.MINE;
        }
    },

    onChange: function(value) {
        const {
            router,
            location
        } = this.props;
        router.push({
            pathname: value,
            query: location.query
        });
    },

    render: function () {
        const {
            images,
            featuredImages,
            authoredImages,
            imageBookmarks
        } = this.props;
        const tabValue = this.getTabValue();

        return (
            <Paper style={styles.paper}>
                <ListTabs value={tabValue} onChange={this.onChange}>
                    <ListTab
                        value={ROUTES.ALL}
                        label="All Images"
                        icon={(
                            <Pill>
                                {images.state === PayloadStates.FETCHING ? '...' : images.meta.totalCount}
                            </Pill>
                        )}
                        isActive={tabValue === ROUTES.ALL}
                    />
                    <ListTab
                        value={ROUTES.FEATURED}
                        label="Featured"
                        icon={(
                            <Pill>
                                {featuredImages.state === PayloadStates.FETCHING ? '...' : featuredImages.meta.totalCount}
                            </Pill>
                        )}
                        isActive={tabValue === ROUTES.FEATURED}
                    />
                    <IsAuthenticated value={ROUTES.FAVORITES}>
                        <ListTab
                            value={ROUTES.FAVORITES}
                            label="Favorites"
                            icon={(
                                <Pill>
                                    {imageBookmarks.state === PayloadStates.FETCHING ? '...' : imageBookmarks.meta.totalCount}
                                </Pill>
                            )}
                            isActive={tabValue === ROUTES.FAVORITES}
                        />
                    </IsAuthenticated>
                    <IsAuthenticated value={ROUTES.MINE}>
                        <ListTab
                            value={ROUTES.MINE}
                            label="My Images"
                            icon={(
                                <Pill>
                                    {authoredImages.state === PayloadStates.FETCHING ? '...' : authoredImages.meta.totalCount}
                                </Pill>
                            )}
                            isActive={tabValue === ROUTES.MINE}
                        />
                    </IsAuthenticated>
                </ListTabs>
            </Paper>
        );
    }

}))
));
