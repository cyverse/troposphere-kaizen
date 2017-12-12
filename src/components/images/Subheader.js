import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import Subheader from '../_common/Subheader';
import { ActionSearch, MapsLocalOffer, ContentSave } from 'material-ui/svg-icons';
import IsAuthenticated from '../_common/IsAuthenticated';
import Tabs from '../_common/Subheader/Tabs';
import Tab from '../_common/Subheader/Tab';

const ROUTES = {
    SEARCH: '/images/search',
    TAGS: '/images/tags',
    REQUESTS: '/images/my-image-requests'
};

export default withRouter(createReactClass({
    displayName: 'Subheader',

    propTypes: {
        router: PropTypes.object.isRequired
    },

    getTabValue: function() {
        const { router } = this.props;

        if (router.isActive(ROUTES.SEARCH)) {
            return ROUTES.SEARCH;
        }

        if (router.isActive(ROUTES.TAGS)) {
            return ROUTES.TAGS;
        }

        if (router.isActive(ROUTES.REQUESTS)) {
            return ROUTES.REQUESTS;
        }
    },

    onChange: function(value) {
        const { router } = this.props;
        router.push(value);
    },

    render: function () {
        const tabValue = this.getTabValue();

        return (
            <Subheader>
                <Tabs value={tabValue} onChange={this.onChange}>
                    <Tab
                        value={ROUTES.SEARCH}
                        label="Image Search"
                        icon={<ActionSearch />}
                        isActive={tabValue === ROUTES.SEARCH}
                    />
                    <Tab
                        value={ROUTES.TAGS}
                        label="Tag List"
                        icon={<MapsLocalOffer />}
                        isActive={tabValue === ROUTES.TAGS}
                    />
                    <IsAuthenticated value={ROUTES.REQUESTS}>
                        <Tab
                            value={ROUTES.REQUESTS}
                            label="Image Requests"
                            icon={<ContentSave />}
                            isActive={tabValue === ROUTES.REQUESTS}
                        />
                    </IsAuthenticated>
                </Tabs>
            </Subheader>
        );
    }

}));
