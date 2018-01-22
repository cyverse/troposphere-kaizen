import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Avatar, MenuItem } from 'material-ui';
import { DeviceStorage, ContentSave, EditorModeEdit, ActionDelete } from 'material-ui/svg-icons';
import { VolumeIcon } from 'cyverse-ui/es/icons';
import { connect } from 'lore-hook-connect';
import moment from 'moment';
import ColorHash from 'color-hash';
import { MediaCardIdentity, MediaCardText, MediaCardIcons, MediaCardMenu } from 'cyverse-ui-next';
import ResourceCount from './ResourceCount';
import UpdateProjectDialog from '../../dialogs/project/update';
import DestroyProjectDialog from '../../dialogs/project/destroy';
import PayloadStates from '../../constants/PayloadStates';

export default connect((getState, props) => {
    const {project} = props;
    return {
        instances: getState('projectInstance.find', {
            where: {
                project__id: project.id
            }
        }),
        volumes: getState('projectVolume.find', {
            where: {
                project__id: project.id
            }
        }),
        images: getState('projectImage.find', {
            where: {
                project__id: project.id
            }
        })
    }
})(
withRouter(createReactClass({
    displayName: 'Project',

    propTypes: {
        project: PropTypes.object.isRequired,
        instances: PropTypes.object.isRequired,
        volumes: PropTypes.object.isRequired,
        images: PropTypes.object.isRequired,
    },

    getStyles: function() {
        const {
            project
        } = this.props;

        const styles = {
            cursor: 'pointer'
        };

        if (
            project.state === PayloadStates.CREATING ||
            project.state === PayloadStates.UPDATING ||
            project.state === PayloadStates.DELETING
        ) {
            styles.opacity = '0.3';
        }

        return styles;
    },

    onClick() {
      const {
          project,
          router
      } = this.props;

      router.push(`/projects/${project.id}`);
    },

    render: function () {
        const {
            project,
            instances,
            volumes,
            images,
        } = this.props;
        const colorHash = new ColorHash();
        const styles = this.getStyles();

        return (
            <div className="list-card">
                <div className="row clickable" style={styles}>
                    <div className="col-md-6 col-lg-4" onClick={this.onClick}>
                        <MediaCardIdentity
                            primaryText={project.data.name}
                            secondaryText={`Created ${moment(project.data.start_date).format('MMM DD YYYY')}`}
                            avatar={(
                                <Avatar backgroundColor={colorHash.hex(project.id)}>
                                    {project.data.name[0]}
                                </Avatar>
                            )}
                        />
                    </div>
                    <div className="d-none d-lg-block col-lg-4" onClick={this.onClick}>
                        <MediaCardText text={project.data.description} />
                    </div>
                    <div className="col-md-4 col-lg-3" onClick={this.onClick}>
                        <MediaCardIcons>
                            <ResourceCount
                                collection={instances}
                                icon={<DeviceStorage/>}
                            />
                            <ResourceCount
                                collection={volumes}
                                icon={<VolumeIcon/>}
                            />
                            <ResourceCount
                                collection={images}
                                icon={<ContentSave/>}
                            />
                        </MediaCardIcons>
                    </div>
                    <div className="col-md-2 col-lg-1 text-right">
                        <MediaCardMenu>
                            <MenuItem primaryText="Edit" leftIcon={<EditorModeEdit/>} onClick={() => {
                                lore.dialog.show(() => {
                                    return (
                                        <UpdateProjectDialog model={project} />
                                    );
                                });
                            }}/>
                            <MenuItem primaryText="Delete" leftIcon={<ActionDelete/>} onClick={() => {
                                lore.dialog.show(() => {
                                    return (
                                        <DestroyProjectDialog model={project} />
                                    );
                                });
                            }}/>
                        </MediaCardMenu>
                    </div>
                </div>
            </div>
        );
    }
}))
);
