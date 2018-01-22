import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Paper, Divider, List } from 'material-ui';
import { SkeletonList } from 'cyverse-ui';
import _ from 'lodash';
import { connect, Connect } from 'lore-hook-connect';
import { MediaCardPlaceholder } from 'cyverse-ui-next';
import InfiniteScrolling from '../../decorators/InfiniteScrolling';
import PayloadStates from '../../constants/PayloadStates';
import LoadMoreButton from '../images-search/_common/LoadMoreButton';
import Volume from './Volume';
import ListHeader from './ListHeader';

export default connect(function(getState, props) {
    const { project } = props;

    return {
        cachedProjectVolumes: getState('volume.all', {
            where: function(volume) {
                return volume.data.project === project.id;
            }
        }),
        projectVolumes: getState('projectVolume.find', {
            where: {
                project__id: project.id
            },
            pagination: {
                page: '1',
                page_size: 100
            }
        }, { forceFetchOnMount: true })
    };
})(
InfiniteScrolling({ propName: 'projectVolumes', modelName: 'projectVolume' })(
createReactClass({
    displayName: 'ProjectVolumes',

    propTypes: {
        project: PropTypes.object.isRequired,
        pages: PropTypes.array.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        cachedProjectVolumes: PropTypes.object.isRequired
    },

    render: function () {
        const {
            pages,
            onLoadMore,
            project,
            cachedProjectVolumes
        } = this.props;
        const numberOfPages = pages.length;
        const firstPage = pages[0];
        const lastPage = pages[pages.length - 1];

        // if we only have one page, and it's fetching, then it's the initial
        // page load so let the user know we're loading the data
        if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
            return (
                <div>
                    <ListHeader />
                    <SkeletonList cardCount={4} />
                </div>
            );
        }

        const volumeListItems = _.flatten(pages.map((projectVolumes) => {
            if (projectVolumes.state === PayloadStates.FETCHING) {
                return [];
            }

            return _.flatten(projectVolumes.data.map((projectVolume) => {
                return [(
                    <Connect key={projectVolume.id || projectVolume.cid} callback={(getState, props) => {
                        return {
                            volume: getState('volume.byId', {
                                id: projectVolume.data.volume
                            })
                        };
                    }}>
                        {(props) => {
                            const { volume } = props;

                            if (volume.state === PayloadStates.FETCHING) {
                                return (
                                    <MediaCardPlaceholder
                                        key={volume.id || volume.cid}
                                    />
                                );
                            }
                            return (
                                <Volume
                                    key={volume.id || volume.cid}
                                    volume={volume}
                                    project={project}
                                />
                            );
                        }}
                    </Connect>
                )];
            }))
        }));

        const allProjectVolumes = _.flatten(pages.map((page) => {
            return page.data;
        }));

        const cachedVolumeListItems = _.flatten(cachedProjectVolumes.data.map((volume) => {
            const matchingProjectVolume = _.find(allProjectVolumes, (projectVolume) => {
                return projectVolume.data.volume === volume.id;
            });

            if (matchingProjectVolume) {
                return [];
            }

            return [
                <Volume
                    key={volume.id || volume.cid}
                    volume={volume}
                    project={project}
                />
            ];
        }));

        return (
            <div>
                <ListHeader />
                {cachedVolumeListItems}
                {volumeListItems}
                <LoadMoreButton
                    label="Show More Volumes"
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
