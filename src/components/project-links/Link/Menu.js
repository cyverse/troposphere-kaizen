import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { MenuItem } from 'material-ui';
import { ActionDelete, EditorModeEdit } from 'material-ui/svg-icons';
import { MediaCardMenu } from 'cyverse-ui-next';

export default createReactClass({
    displayName: 'Menu',

    propTypes: {
        link: PropTypes.object.isRequired
    },

    render: function () {
        const { link } = this.props;

        return (
            <MediaCardMenu>
                <MenuItem
                    primaryText="Edit"
                    leftIcon={<EditorModeEdit />}
                    disabled={true}
                />
                <MenuItem
                    primaryText="Delete"
                    leftIcon={<ActionDelete />}
                    disabled={true}
                />
            </MediaCardMenu>
        );
    }
});
