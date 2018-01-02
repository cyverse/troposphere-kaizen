import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Paper, Divider, List } from 'material-ui';
import { SkeletonList } from 'cyverse-ui';
import _ from 'lodash';
import { connect, Connect } from 'lore-hook-connect';
import InfiniteScrolling from '../../decorators/InfiniteScrolling';
import PayloadStates from '../../constants/PayloadStates';
import Image from '../images-search/_common/Image';
import LoadMoreButton from '../images-search/_common/LoadMoreButton';
import ListHeader from '../images-search/_common/ListHeader';
import { MediaCardPlaceholder } from 'cyverse-ui-next';

export default connect(function(getState, props) {
    const query = props.query || {};

    return {
        imageBookmarks: getState('imageBookmark.find', {
            // where: query,
            pagination: {
                page: '1',
                page_size: 10
            }
        }, { forceFetchOnMount: true })
    };
})(
InfiniteScrolling({ propName: 'imageBookmarks', modelName: 'imageBookmark' })(
createReactClass({
    displayName: 'ImageBookmarks',

    propTypes: {
        query: PropTypes.object.isRequired,
        pages: PropTypes.array.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        children: PropTypes.func
    },

    render: function () {
        const {
            query,
            pages,
            onLoadMore,
            children
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

        const imageListItems = _.flatten(pages.map((imageBookmarks, pageIndex) => {
            if (imageBookmarks.state === PayloadStates.FETCHING) {
                return [];
            }

            return _.flatten(imageBookmarks.data.map((imageBookmark, index) => {
                const items = [(
                    <Connect key={imageBookmark.id || imageBookmark.cid} callback={(getState, props) => {
                        return {
                            image: getState('image.byId', {
                                id: imageBookmark.data.image
                            })
                        };
                    }}>
                        {(props) => {
                            const { image } = props;

                            if (image.state === PayloadStates.FETCHING) {
                                return (
                                    <MediaCardPlaceholder
                                        key={image.id || image.cid}
                                    />
                                );
                            }
                            return children ? children(image) : (
                                <Image
                                    key={image.id || image.cid}
                                    image={image}
                                />
                            );
                        }}
                    </Connect>
                )];

                if (true || index < (imageBookmarks.data.length - 1)) {
                    items.push(
                        <Divider key={`divider-${imageBookmark.id || imageBookmark.cid}`}/>
                    );
                }

                return items;
            }))
        }));

        let title = '';

        if (!firstPage.meta || !firstPage.meta.totalCount) {
            title = `Showing ${imageListItems.length/2} images`;
        } else if (query.search) {
            title = `Showing ${imageListItems.length/2} images for "${query.search}"`;
        } else {
            title = `Showing ${imageListItems.length/2} of ${firstPage.meta.totalCount} images`;
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
                        {imageListItems}
                    </List>
                </Paper>
                <LoadMoreButton
                    label="Show More Images"
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
