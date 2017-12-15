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
        link: PropTypes.object.isRequired
    },

    render: function () {
        const { link } = this.props;
        const colorHash = new ColorHash();

        return (
            <MediaCardIdentity
                primaryText={link.data.title}
                secondaryText={`Created ???`}
                avatar={(
                    <Avatar backgroundColor={colorHash.hex(link.id)}>
                        {link.data.title[0]}
                    </Avatar>
                )}
            />
        );
    }
});
