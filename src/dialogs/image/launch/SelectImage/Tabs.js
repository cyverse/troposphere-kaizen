import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Paper } from 'material-ui';
import { Pill, ListTabs, ListTab } from 'cyverse-ui-next';
import { connect } from 'lore-hook-connect';
import TabValues from './TabValues';
import PayloadStates from '../../../../constants/PayloadStates';

const styles = {
    paper: {
        paddingLeft: '16px'
    }
};

export default connect((getState, props) => {
    const { user, query } = props;

    return {
        images: getState('image.find', {
            where: {
                search: query.search
            },
            pagination: {
                page_size: 10
            }
        }),
        featuredImages: getState('image.find', {
            where: {
                tags__name: 'Featured',
                search: query.search
            }
        }),
        authoredImages: getState('image.find', {
            where: {
                created_by__username: user.data.username,
                search: query.search
            }
        }),
        imageBookmarks: getState('imageBookmark.find', {
            pagination: {
                page_size: 10,
                image__search: query.search
            }
        })
    }
})(
createReactClass({
    displayName: 'Tabs',

    propTypes: {
        images: PropTypes.object.isRequired,
        featuredImages: PropTypes.object.isRequired,
        authoredImages: PropTypes.object.isRequired,
        imageBookmarks: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired
    },

    onChange: function(value) {
        const { onChange } = this.props;
        onChange(value);
    },

    render: function() {
        const {
            images,
            featuredImages,
            authoredImages,
            imageBookmarks,
            tabValue
        } = this.props;

        return (
            <Paper style={styles.paper}>
                <ListTabs value={tabValue} onChange={this.onChange}>
                    <ListTab
                        value={TabValues.ALL}
                        label="All Images"
                        icon={(
                            <Pill>
                                {images.state === PayloadStates.FETCHING ? '...' : images.meta.totalCount}
                            </Pill>
                        )}
                        isActive={tabValue === TabValues.ALL}
                    />
                    <ListTab
                        value={TabValues.FEATURED}
                        label="Featured"
                        icon={(
                            <Pill>
                                {featuredImages.state === PayloadStates.FETCHING ? '...' : featuredImages.meta.totalCount}
                            </Pill>
                        )}
                        isActive={tabValue === TabValues.FEATURED}
                    />
                    <ListTab
                        value={TabValues.FAVORITES}
                        label="Favorites"
                        icon={(
                            <Pill>
                                {imageBookmarks.state === PayloadStates.FETCHING ? '...' : imageBookmarks.meta.totalCount}
                            </Pill>
                        )}
                        isActive={tabValue === TabValues.FAVORITES}
                    />
                    <ListTab
                        value={TabValues.MINE}
                        label="My Images"
                        icon={(
                            <Pill>
                                {authoredImages.state === PayloadStates.FETCHING ? '...' : authoredImages.meta.totalCount}
                            </Pill>
                        )}
                        isActive={tabValue === TabValues.MINE}
                    />
                </ListTabs>
            </Paper>
        );
    }

})
);
