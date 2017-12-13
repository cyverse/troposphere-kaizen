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
import { MediaCardPlaceholder } from 'cyverse-ui-next';
import Instance from './Instance';
import ListHeader from './ListHeader';

export default connect(function(getState, props) {
    const { project } = props;

    return {
        projectInstances: getState('projectInstance.find', {
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
InfiniteScrolling({ propName: 'projectInstances', modelName: 'projectInstance' })(
createReactClass({
    displayName: 'ProjectInstances',

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
                        Fetching project instances...
                    </ListHeader>
                    <SkeletonList cardCount={4} />
                </div>
            );
        }

        const instanceListItems = _.flatten(pages.map((projectInstances, pageIndex) => {
            if (projectInstances.state === PayloadStates.FETCHING) {
                return [];
            }

            return _.flatten(projectInstances.data.map((projectInstance, index) => {
                const items = [(
                    <Connect key={projectInstance.id || projectInstance.cid} callback={(getState, props) => {
                        return {
                            instance: getState('instance.byId', {
                                id: projectInstance.data.instance
                            })
                        };
                    }}>
                        {(props) => {
                            const { instance } = props;

                            if (instance.state === PayloadStates.FETCHING) {
                                return (
                                    <MediaCardPlaceholder
                                        key={instance.id || instance.cid}
                                    />
                                );
                            }
                            return (
                                <Instance
                                    key={instance.id || instance.cid}
                                    instance={instance}
                                />
                            );
                        }}
                    </Connect>
                )];

                if (true || index < (projectInstances.data.length - 1)) {
                    items.push(
                        <Divider key={`divider-${projectInstance.id || projectInstance.cid}`}/>
                    );
                }

                return items;
            }))
        }));

        return (
            <div>
                <ListHeader />
                <Paper>
                    <List style={{ padding: '0px' }}>
                        {instanceListItems}
                    </List>
                </Paper>
                <LoadMoreButton
                    label="Show More Instances"
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
