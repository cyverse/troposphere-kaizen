import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import { Paper } from 'material-ui';
import { Pill, ListTabs, ListTab } from 'cyverse-ui-next';
import { DeviceStorage, ContentSave  } from 'material-ui/svg-icons';
import { VolumeIcon, LinkIcon } from 'cyverse-ui/es/icons';

function getRoutes(project) {
    return {
        INSTANCES: `/projects/${project.id}/instances`,
        VOLUMES: `/projects/${project.id}/volumes`,
        IMAGES: `/projects/${project.id}/images`,
        LINKS: `/projects/${project.id}/links`
    };
}

const styles = {
    paper: {
        paddingLeft: '16px'
    }
};

export default withRouter(createReactClass({
    displayName: 'Tabs',

    getTabValue: function() {
        const {
            project,
            router
        } = this.props;
        const ROUTES = getRoutes(project);

        if (router.isActive(ROUTES.INSTANCES)) {
            return ROUTES.INSTANCES;
        }

        if (router.isActive(ROUTES.VOLUMES)) {
            return ROUTES.VOLUMES;
        }

        if (router.isActive(ROUTES.IMAGES)) {
            return ROUTES.IMAGES;
        }

        if (router.isActive(ROUTES.LINKS)) {
            return ROUTES.LINKS;
        }
    },

    onChange: function(value) {
        const { router } = this.props;
        router.push(value);
    },

    render: function () {
        const { project } = this.props;
        const tabValue = this.getTabValue();
        const ROUTES = getRoutes(project);

        return (
            <Paper style={styles.paper}>
                <ListTabs value={tabValue} onChange={this.onChange}>
                    <ListTab
                        value={ROUTES.INSTANCES}
                        label="Instances"
                        icon={<DeviceStorage/>}
                        isActive={tabValue === ROUTES.INSTANCES}
                    />
                    <ListTab
                        value={ROUTES.VOLUMES}
                        label="Volumes"
                        icon={<VolumeIcon/>}
                        isActive={tabValue === ROUTES.VOLUMES}
                    />
                    <ListTab
                        value={ROUTES.IMAGES}
                        label="Images"
                        icon={<ContentSave/>}
                        isActive={tabValue === ROUTES.IMAGES}
                    />
                    <ListTab
                        value={ROUTES.LINKS}
                        label="Links"
                        icon={<LinkIcon/>}
                        isActive={tabValue === ROUTES.LINKS}
                    />
                </ListTabs>
            </Paper>
        );
    }

}));
