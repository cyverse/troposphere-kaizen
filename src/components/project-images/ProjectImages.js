import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Paper, Divider, List } from 'material-ui';
import { SkeletonList } from 'cyverse-ui';
import _ from 'lodash';
import { connect, Connect } from 'lore-hook-connect';
import InfiniteScrolling from '../../decorators/InfiniteScrolling';
import PayloadStates from '../../constants/PayloadStates';
import LoadMoreButton from '../images-search/_common/LoadMoreButton';
import ListHeader from '../images-search/_common/ListHeader';
import { MediaCardPlaceholder } from 'cyverse-ui-next';
import Image from './Image';

export default connect(function(getState, props) {
    const { project } = props;

    return {
        projectImages: getState('projectImage.find', {
            where: {
                project__id: project.id
            },
            pagination: {
                page: '1',
                page_size: 10
            }
        }, { forceFetchOnMount: true })
    };
})(
InfiniteScrolling({ propName: 'projectImages', modelName: 'projectImage' })(
createReactClass({
    displayName: 'ProjectImages',

    propTypes: {
        project: PropTypes.object.isRequired,
        pages: PropTypes.array.isRequired,
        onLoadMore: PropTypes.func.isRequired
    },

    render: function () {
        const {
            project,
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
                            Fetching project images...
                        </div>
                    </ListHeader>
                    <SkeletonList cardCount={4} />
                </div>
            );
        }

        const imageListItems = _.flatten(pages.map((projectImages, pageIndex) => {
            if (projectImages.state === PayloadStates.FETCHING) {
                return [];
            }

            return _.flatten(projectImages.data.map((projectImage, index) => {
                const items = [(
                    <Connect key={projectImage.id || projectImage.cid} callback={(getState, props) => {
                        return {
                            image: getState('image.byId', {
                                id: projectImage.data.image
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
                            return (
                                <Image
                                    key={image.id || image.cid}
                                    image={image}
                                />
                            );
                        }}
                    </Connect>
                )];

                if (true || index < (projectImages.data.length - 1)) {
                    items.push(
                        <Divider key={`divider-${projectImage.id || projectImage.cid}`}/>
                    );
                }

                return items;
            }))
        }));

        let title = '';

        if (!firstPage.meta || !firstPage.meta.totalCount) {
            title = `Showing ${imageListItems.length/2} images`;
        } else if (project) {
            title = `Showing ${imageListItems.length/2} images for "${project.data.name}"`;
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
