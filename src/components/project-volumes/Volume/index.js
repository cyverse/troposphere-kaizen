import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { MenuItem } from 'material-ui';
import {
    ActionDelete,
    FileFolder,
    EditorModeEdit
} from 'material-ui/svg-icons';
import {
    IntercomIcon
} from 'cyverse-ui/es/icons';
import {
    MediaCard,
    MediaCardSection,
    MediaCardMenu
} from 'cyverse-ui-next';
import PayloadStates from '../../../constants/PayloadStates';
import Identity from './Identity';
import Status from './Status';
import Size from './Size';
import Provider from './Provider';

export default createReactClass({
    displayName: 'Volume',

    propTypes: {
        volume: PropTypes.object.isRequired
    },

    getStyles: function() {
        const {
            volume
        } = this.props;

        if (
            volume.state === PayloadStates.CREATING ||
            volume.state === PayloadStates.UPDATING ||
            volume.state === PayloadStates.DELETING
        ) {
            return {
              opacity: '0.3'
            }
        }

        return {};
    },

    render: function () {
        const {
            volume
        } = this.props;
        const styles = this.getStyles();

        return (
            <MediaCard style={styles}>
                <MediaCardSection width="30%">
                    <Identity volume={volume} />
                </MediaCardSection>
                <MediaCardSection left="30%" width="20%">
                    <Status volume={volume} />
                </MediaCardSection>
                <MediaCardSection left="50%" width="15%">
                    <Size volume={volume} />
                </MediaCardSection>
                <MediaCardSection left="65%" width="30%">
                    <Provider volume={volume} />
                </MediaCardSection>
                <MediaCardSection right="0%" width="inherit">
                    <MediaCardMenu>
                        <MenuItem
                            primaryText="Report"
                            leftIcon={<IntercomIcon />}
                            disabled={true}
                        />
                        <MenuItem
                            primaryText="Delete"
                            leftIcon={<ActionDelete />}
                            disabled={true}
                        />
                        <MenuItem
                            primaryText="Move Volume"
                            leftIcon={<FileFolder />}
                            disabled={true}
                        />
                        <MenuItem
                            primaryText="Edit"
                            leftIcon={<EditorModeEdit />}
                            disabled={true}
                        />
                    </MediaCardMenu>
                </MediaCardSection>
            </MediaCard>
        );
    }
});
