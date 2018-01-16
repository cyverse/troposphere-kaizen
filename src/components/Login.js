import React from 'react';
import createReactClass from 'create-react-class';
import LoadingScreen from './_common/LoadingScreen';

export default createReactClass({
    displayName: 'Login',

    componentDidMount: function () {
        const {
            serverUrl,
            clientId,
            redirectUri
        } = lore.config.cas;
        const { location } = this.props;
        const state = JSON.stringify(location.query);

        window.location.href = `${serverUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
    },

    render: function () {
        return (
            <LoadingScreen/>
        );
    }

});
