import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import axios from 'axios';
import auth from '../../utils/auth';
import LoadingScreen from '../_common/LoadingScreen';

export default createReactClass({
    displayName: 'OAuthLogin',

    propTypes: {
        router: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    },

    componentDidMount: function () {
        const {
            location: {
                query
            },
            router
        } = this.props;

        const state = query.state ? JSON.parse(query.state) : {
            redirect: JSON.stringify({
                pathname: '/'
            })
        };

        const accessTokenUrl = `${lore.config.cas.webtaskUrl}?code=${query.code}`;

        axios.get(accessTokenUrl).then(function (response) {
            const access_token = response.data.body.split('=')[1];
            auth.saveToken(access_token);
            router.push(JSON.parse(state.redirect));
        }).catch(function (response) {
            const error = response.data;

            if (response.status === 400) {
                console.log(`Bad request 400: ${error}`)
            } else {
                console.log(`Bad request non-400: ${error}`)
            }
        });
    },

    render: function () {
        return (
            <LoadingScreen/>
        );
    }

});
