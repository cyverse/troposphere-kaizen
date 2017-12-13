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
import Link from './Link';

export default connect(function(getState, props) {
    const { project } = props;

    return {
        projectLinks: getState('projectLink.find', {
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
InfiniteScrolling({ propName: 'projectLinks', modelName: 'projectLink' })(
createReactClass({
    displayName: 'ProjectLinks',

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
                        Fetching project links...
                    </ListHeader>
                    <SkeletonList cardCount={4} />
                </div>
            );
        }

        const linkListItems = _.flatten(pages.map((projectLinks, pageIndex) => {
            if (projectLinks.state === PayloadStates.FETCHING) {
                return [];
            }

            return _.flatten(projectLinks.data.map((projectVolume, index) => {
                const items = [(
                    <Connect key={projectVolume.id || projectVolume.cid} callback={(getState, props) => {
                        return {
                            link: getState('link.byId', {
                                id: projectVolume.data.external_link
                            })
                        };
                    }}>
                        {(props) => {
                            const { link } = props;

                            if (link.state === PayloadStates.FETCHING) {
                                return (
                                    <MediaCardPlaceholder
                                        key={link.id || link.cid}
                                    />
                                );
                            }
                            return (
                                <Link
                                    key={link.id || link.cid}
                                    link={link}
                                />
                            );
                        }}
                    </Connect>
                )];

                if (true || index < (projectLinks.data.length - 1)) {
                    items.push(
                        <Divider key={`divider-${projectVolume.id || projectVolume.cid}`}/>
                    );
                }

                return items;
            }))
        }));

        let title = '';

        if (!firstPage.meta || !firstPage.meta.totalCount) {
            title = `Showing ${linkListItems.length/2} links`;
        } else if (project) {
            title = `Showing ${linkListItems.length/2} links for "${project.data.name}"`;
        } else {
            title = `Showing ${linkListItems.length/2} of ${firstPage.meta.totalCount} links`;
        }

        return (
            <div>
                <ListHeader>
                    {title}
                </ListHeader>
                <Paper>
                    <List style={{padding: '0px'}}>
                        {linkListItems}
                    </List>
                </Paper>
                <LoadMoreButton
                    label="Show More Links"
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
