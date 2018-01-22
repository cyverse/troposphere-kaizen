import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { SkeletonList } from 'cyverse-ui';
import _ from 'lodash';
import { connect } from 'lore-hook-connect';
import InfiniteScrolling from '../../../decorators/InfiniteScrolling';
import PayloadStates from '../../../constants/PayloadStates';
import Image from './Image';
import LoadMoreButton from './LoadMoreButton';
import ListHeader from './ListHeader';

export default connect(function(getState, props) {
    const query = props.query || {};

    return {
        images: getState('image.find', {
            where: query,
            pagination: {
                page: '1',
                page_size: 10
            }
        }, { forceFetchOnMount: true })
    };
})(
InfiniteScrolling({ propName: 'images', modelName: 'image' })(
createReactClass({
    displayName: 'Images',

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

        const imageListItems = _.flatten(pages.map((images, pageIndex) => {
            if (images.state === PayloadStates.FETCHING) {
                return [];
            }

            return _.flatten(images.data.map((image, index) => {
                return [children ? children(image) : (
                    <Image
                        key={image.id || image.cid}
                        image={image}
                    />
                )];
            }))
        }));

        let title = '';

        if (!firstPage.meta || !firstPage.meta.totalCount) {
            title = `Showing ${imageListItems.length} images`;
        } else if (query.search) {
            title = `Showing ${imageListItems.length} of ${firstPage.meta.totalCount} images for "${query.search}"`;
        } else {
            title = `Showing ${imageListItems.length} of ${firstPage.meta.totalCount} images`;
        }

        return (
            <div>
                <ListHeader>
                    <div style={{ paddingLeft: '8px' }}>
                        {title}
                    </div>
                </ListHeader>
                <div>
                    {imageListItems}
                </div>
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
