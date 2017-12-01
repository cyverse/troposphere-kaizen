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

        window.location.href = `${serverUrl}?client_id=${clientId}&redirect_uri=${redirectUri}`;
    },

    render: function () {
        return (
            <LoadingScreen/>
        );
    }

});
