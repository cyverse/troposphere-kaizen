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
import Url from './Url';
import Description from './Description';

export default createReactClass({
    displayName: 'Link',

    propTypes: {
        link: PropTypes.object.isRequired
    },

    getStyles: function() {
        const {
            link
        } = this.props;

        if (
            link.state === PayloadStates.CREATING ||
            link.state === PayloadStates.UPDATING ||
            link.state === PayloadStates.DELETING
        ) {
            return {
              opacity: '0.3'
            }
        }

        return {};
    },

    render: function () {
        const {
            link
        } = this.props;
        const styles = this.getStyles();

        return (
            <MediaCard style={styles}>
                <MediaCardSection width="25%">
                    <Identity link={link} />
                </MediaCardSection>
                <MediaCardSection left="25%" width="30%">
                    <Url link={link} />
                </MediaCardSection>
                <MediaCardSection left="60%" width="30%">
                    <Description link={link} />
                </MediaCardSection>
                <MediaCardSection right="0%" width="inherit">
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
                </MediaCardSection>
            </MediaCard>
        );
    }
});
