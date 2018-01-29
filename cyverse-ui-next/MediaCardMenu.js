import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { IconButton, IconMenu } from 'material-ui';
import { NavigationMoreVert } from 'material-ui/svg-icons';
import _ from 'lodash';

const styles = {
    container: {
        paddingTop: '12px',
        paddingBottom: '12px',
        display: 'inline-block'
    },
    anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom'
    },
    targetOrigin: {
        horizontal: 'right',
        vertical: 'top'
    }
};

export default createReactClass({
    displayName: 'MediaCardMenu',

    propTypes: {
        children: PropTypes.node.isRequired,
        style: PropTypes.object
    },

    render: function () {
        let {
            children,
            style
        } = this.props;

        return (
            <div style={_.extend({}, styles.container, style)}>
                <IconMenu
                    desktop={false}
                    iconButtonElement={(
                        <IconButton>
                            <NavigationMoreVert/>
                        </IconButton>
                    )}
                    anchorOrigin={styles.anchorOrigin}
                    targetOrigin={styles.targetOrigin}
                >
                    {children}
                </IconMenu>
            </div>
        );
    }
});
