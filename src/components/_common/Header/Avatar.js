import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import { Avatar } from 'material-ui';
import md5 from 'md5';

export default createReactClass({
    displayName: 'Header/Avatar',

    contextTypes: {
        user: PropTypes.object.isRequired
    },

    render: function () {
        const {
            user
        } = this.context;

        const defaultAvatar = encodeURIComponent("https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png");
        const url = user.data.avatar_url || ('https://www.gravatar.com/avatar/' + md5(user.data.email) + '?d=' + defaultAvatar);

        return (
            <Avatar src={url} size={32}/>
        );
    }

});
