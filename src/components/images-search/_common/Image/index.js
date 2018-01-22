import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { Avatar, IconButton, MenuItem } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';
import moment from 'moment';
import ColorHash from 'color-hash';
import { LaunchIcon } from 'cyverse-ui/es/icons';
import { MediaCardIdentity, MediaCardText, MediaCardMenu } from 'cyverse-ui-next';
import { ListCard, ListCardDetail, MDBlock } from 'cyverse-ui';
import ExpandableMediaCard from '../../../../decorators/ExpandableMediaCard';
import PayloadStates from '../../../../constants/PayloadStates';
import ImageLaunchDialog from '../../../../dialogs/image/launch';
import Tags from './Tags';
import Versions from './Versions';

export default ExpandableMediaCard()(withRouter(createReactClass({
    displayName: 'Image',

    propTypes: {
        image: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired,
        project: PropTypes.object,
        isExpanded: PropTypes.bool.isRequired,
        onExpand: PropTypes.func.isRequired,
        onCollapse: PropTypes.func.isRequired,
        onToggleExpansion: PropTypes.func.isRequired
    },

    getStyles: function() {
        const { image } = this.props;

        if (
            image.state === PayloadStates.CREATING ||
            image.state === PayloadStates.UPDATING ||
            image.state === PayloadStates.DELETING
        ) {
            return {
              opacity: '0.3'
            }
        }

        return {};
    },

    onClick(event) {
        const { onToggleExpansion } = this.props;
        const { buttons, menu } = this.refs;

        const buttonsNode = ReactDOM.findDOMNode(buttons);
        const menuNode = ReactDOM.findDOMNode(menu);

        if (
            buttonsNode.contains(event.target) ||
            menuNode.contains(event.target)
        ) {
            return;
        }

        onToggleExpansion();
    },

    render: function () {
        const {
            image,
            router,
            project,
            isExpanded
        } = this.props;
        const colorHash = new ColorHash();
        const styles = this.getStyles();

        return (
            <div>
                <div className="row clickable" style={styles} onClick={this.onClick}>
                    <div className="col-md-9 col-lg-4">
                        <MediaCardIdentity
                            primaryText={image.data.name}
                            secondaryText={`Created ${moment(image.data.start_date).format('MMM DD YYYY')}`}
                            avatar={(
                                <Avatar backgroundColor={colorHash.hex(image.id)}>
                                    {_.toUpper(image.data.name[0])}
                                </Avatar>
                            )}
                        />
                    </div>
                    <div className="d-none d-lg-block col-lg-6">
                        <MediaCardText text={image.data.description} />
                    </div>
                    <div className="col-md-3 col-lg-2 text-right">
                        <div ref="buttons" style={{ paddingTop: '12px', paddingBottom: '12px', display: 'inline-block' }}>
                            <IconButton tooltip="Launch Instance" tooltipPosition="top-center" onClick={() => {
                                lore.dialog.show(() => {
                                    return (
                                        <ImageLaunchDialog
                                            image={image}
                                            router={router}
                                            project={project}
                                        />
                                    );
                                });
                            }}>
                                <LaunchIcon/>
                            </IconButton>
                        </div>
                        <MediaCardMenu ref="menu">
                            <MenuItem
                                ref="menuItemAddProject"
                                primaryText="Add to Project"
                                leftIcon={<ContentAdd/>}
                                disabled={true}
                            />
                        </MediaCardMenu>
                    </div>
                </div>
                {isExpanded ? <hr/> : null}
                {isExpanded ? (
                    <div className="list-card-detail">
                        <MDBlock text={image.data.description} />
                        <Tags image={image} />
                        <Versions image={image} />
                    </div>
                ) : null}
                {/*<ListCardDetail hide={!isExpanded}>*/}
                    {/*{isExpanded ? (*/}
                        {/*<div>*/}
                            {/*<div style={{ marginBottom: '16px' }}>*/}
                                {/*<MDBlock text={image.data.description} />*/}
                            {/*</div>*/}
                            {/*<Tags image={image} />*/}
                            {/*<Versions image={image} />*/}
                        {/*</div>*/}
                    {/*) : null}*/}
                {/*</ListCardDetail>*/}
            </div>
        );
    }
})));
