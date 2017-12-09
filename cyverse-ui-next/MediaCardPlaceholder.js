import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MediaCard } from 'cyverse-ui';
import { Avatar } from 'material-ui';
import SkeletonText from './SkeletonText';

export default createReactClass({
    displayName: 'MediaCardPlaceholder',

    render: function () {
        return (
            <MediaCard
                image={<Avatar size={40} backgroundColor="#EFEFEF" />}
                title={<SkeletonText/>}
                summary={<SkeletonText/>}
            />
        )
    }
});
