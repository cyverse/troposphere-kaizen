import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui';

const styles = {
    primaryText: {
        textOverflow: 'ellipsis',
        overflow: 'auto',
        maxWidth: '95%',
        whiteSpace: 'nowrap'
    }
};

export default createReactClass({
    displayName: 'MediaCardIdentity',

    propTypes: {
        primaryText: PropTypes.string,
        secondaryText: PropTypes.string,
        avatar: PropTypes.node,
    },

    render: function () {
        const {
            primaryText,
            secondaryText,
            avatar
        } = this.props;

        return (
            <ListItem
                leftAvatar={avatar}
                primaryText={(
                    <div style={styles.primaryText}>
                        {primaryText}
                    </div>
                )}
                secondaryText={secondaryText}
                disabled={true}
            />
        );

    }
});
