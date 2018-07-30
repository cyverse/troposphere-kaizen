import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { ListItem, IconMenu, IconButton, MenuItem } from 'material-ui';
import { NavigationMoreVert, EditorModeEdit, ActionDelete } from 'material-ui/svg-icons';
import IsStaff from '../_common/IsStaff';
import PayloadStates from '../../constants/PayloadStates';

export default withRouter(createReactClass({
    displayName: 'Tag',

    propTypes: {
        tag: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired
    },

    onClick() {
        const { tag, router } = this.props;
        router.push({
            pathname: '/images/search/all',
            query: {
                search: tag.data.name
            }
        })
    },

    getStyles: function() {
        const { tag } = this.props;

        const styles = {
            listItem:  {},
            iconMenu: {
                anchorOrigin: {
                    horizontal: 'right',
                    vertical: 'bottom'
                },
                targetOrigin: {
                    horizontal: 'right',
                    vertical: 'top'
                }
            }
        };

        if (
            tag.state === PayloadStates.CREATING ||
            tag.state === PayloadStates.UPDATING ||
            tag.state === PayloadStates.DELETING
        ) {
            styles.listItem.opacity ='0.3';
        }

        return styles;
    },

    render: function () {
        const { tag } = this.props;
        const styles = this.getStyles();

        return (
            <ListItem
                key={tag.id || tag.cid}
                style={styles.listItem}
                primaryText={tag.data.name}
                secondaryText={tag.data.description}
                rightIconButton={(
                    <IsStaff>
                        <IconMenu
                            iconButtonElement={(
                                <IconButton>
                                    <NavigationMoreVert/>
                                </IconButton>
                            )}
                            anchorOrigin={styles.anchorOrigin}
                            targetOrigin={styles.targetOrigin}
                        >
                            <MenuItem
                                primaryText="Edit"
                                leftIcon={<EditorModeEdit/>}
                                onClick={() => {
                                    lore.dialog.show(() => {
                                        return lore.dialogs.tag.update(tag);
                                    });
                                }}
                            />
                            <MenuItem
                                primaryText="Delete"
                                leftIcon={<ActionDelete/>}
                                onClick={() => {
                                    lore.dialog.show(() => {
                                        return lore.dialogs.tag.destroy(tag);
                                    });
                                }}
                            />
                        </IconMenu>
                    </IsStaff>
                )}
                onClick={this.onClick}
            />
        );
    }
}));
