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
        instance: PropTypes.object.isRequired
    },

    render: function () {
        const { instance } = this.props;
        const colorHash = new ColorHash();

        return (
            <MediaCardIdentity
                primaryText={instance.data.name}
                secondaryText={`Created ${moment(instance.data.start_date).format('MMM DD YYYY')}`}
                avatar={(
                    <Avatar backgroundColor={colorHash.hex(instance.id)}>
                        {instance.data.name[0]}
                    </Avatar>
                )}
            />
        );
    }
});
