import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Avatar, MenuItem } from 'material-ui';
import { DeviceStorage, ContentSave, EditorModeEdit, ActionDelete } from 'material-ui/svg-icons';
import { VolumeIcon } from 'cyverse-ui/es/icons';
import { connect } from 'lore-hook-connect';
import moment from 'moment';
import ColorHash from 'color-hash';
import {
  MediaCard,
  MediaCardSection,
  MediaCardIdentity,
  MediaCardText,
  MediaCardIcons,
  MediaCardMenu
} from 'cyverse-ui-next';
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
createReactClass({
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

        if (
            project.state === PayloadStates.CREATING ||
            project.state === PayloadStates.UPDATING ||
            project.state === PayloadStates.DELETING
        ) {
            return {
              opacity: '0.3'
            }
        }

        return {};
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
            <MediaCard style={styles}>
                <MediaCardSection width="25%">
                    <MediaCardIdentity
                        primaryText={project.data.name}
                        secondaryText={`Created ${moment(project.data.start_date).format('MMM DD YYYY')}`}
                        avatar={(
                            <Avatar backgroundColor={colorHash.hex(project.id)}>
                                {project.data.name[0]}
                            </Avatar>
                        )}
                    />
                </MediaCardSection>
                <MediaCardSection left="25%" width="35%">
                    <MediaCardText text={project.data.description}/>
                </MediaCardSection>
                <MediaCardSection left="65%" width="30%">
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
                </MediaCardSection>
                <MediaCardSection right="0%" width="inherit">
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
                </MediaCardSection>
            </MediaCard>
        );
    }
})
);
