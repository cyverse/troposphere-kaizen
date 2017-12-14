import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Avatar } from 'material-ui';
import moment from 'moment';
import ColorHash from 'color-hash';
import { MediaCardIdentity } from 'cyverse-ui-next';

export default createReactClass({
    displayName: 'Identity',

    propTypes: {
        volume: PropTypes.object.isRequired
    },

    render: function () {
        const { volume } = this.props;
        const colorHash = new ColorHash();

        return (
            <MediaCardIdentity
                primaryText={volume.data.name}
                secondaryText={`Created ${moment(volume.data.start_date).format('MMM DD YYYY')}`}
                avatar={(
                    <Avatar backgroundColor={colorHash.hex(volume.id)}>
                        {volume.data.name[0]}
                    </Avatar>
                )}
            />
        );
    }
});
