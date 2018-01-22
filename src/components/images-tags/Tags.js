import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Paper, Divider, List } from 'material-ui';
import { SkeletonList } from 'cyverse-ui';
import _ from 'lodash';
import { connect } from 'lore-hook-connect';
import InfiniteScrolling from '../../decorators/InfiniteScrolling';
import PayloadStates from '../../constants/PayloadStates';
import Tag from './Tag';
import LoadMoreButton from '../images-search/_common/LoadMoreButton';
import ListHeader from '../images-search/_common/ListHeader';

export default connect(function(getState, props) {
    const query = props.query || {};

    return {
        tags: getState('tag.find', {
            where: query,
            pagination: {
                page: '1',
                page_size: 10
            }
        }, { forceFetchOnMount: true })
    };
})(
InfiniteScrolling({ propName: 'tags', modelName: 'tag' })(
createReactClass({
    displayName: 'Tags',

    propTypes: {
        query: PropTypes.object.isRequired,
        pages: PropTypes.array.isRequired,
        onLoadMore: PropTypes.func.isRequired
    },

    render: function () {
        const {
            query,
            pages,
            onLoadMore
        } = this.props;
        const numberOfPages = pages.length;
        const firstPage = pages[0];
        const lastPage = pages[pages.length - 1];

        // if we only have one page, and it's fetching, then it's the initial
        // page load so let the user know we're loading the data
        if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
            return (
                <div>
                    <ListHeader>
                        <div style={{ paddingLeft: '8px' }}>
                            {query.search ? `Searching for "${query.search}"` : `Searching...`}
                        </div>
                    </ListHeader>
                    <SkeletonList cardCount={4} />
                </div>
            );
        }

        const tagListItems = _.flatten(pages.map((tags, pageIndex) => {
            if (tags.state === PayloadStates.FETCHING) {
                return [];
            }

            return _.flatten(tags.data.map((tag, index) => {
                const items = [(
                    <Tag
                        key={tag.id || tag.cid}
                        tag={tag}
                    />
                )];

                if (true || index < (tags.data.length - 1)) {
                    items.push(
                        <Divider key={`divider-${tag.id || tag.cid}`}/>
                    );
                }

                return items;
            }))
        }));

        let title = '';

        if (!firstPage.meta || !firstPage.meta.totalCount) {
            title = `Showing ${tagListItems.length/2} tags`;
        } else if (query.search) {
            title = `Showing ${tagListItems.length/2} of ${firstPage.meta.totalCount} tags for "${query.search}"`;
        } else {
            title = `Showing ${tagListItems.length/2} of ${firstPage.meta.totalCount} tags`;
        }

        return (
            <div>
                <ListHeader>
                    <div style={{ paddingLeft: '8px' }}>
                        {title}
                    </div>
                </ListHeader>
                <Paper>
                    <List style={{ padding: '0px' }}>
                        {tagListItems}
                    </List>
                </Paper>
                <LoadMoreButton
                    label="Show More Tags"
                    lastPage={lastPage}
                    onLoadMore={() => {
                        onLoadMore({
                            forceFetch: true
                        })
                    }}
                    nextPageMetaField="nextPage"
                />
            </div>
        );
    }

})
)
);
