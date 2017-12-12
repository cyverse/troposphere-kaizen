import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { FloatingActionButton } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';

export default createReactClass({
    displayName: 'FloatingActionButton',

    propTypes: {
        onClick: PropTypes.func.isRequired
    },

    getStyles() {
        const { style } = this.props;

        return _.merge({
            position: 'absolute',
            top: '50%',
            right: 15
        }, style);
    },

    render: function () {
        const { onClick } = this.props;
        const styles = this.getStyles();

        return (
            <FloatingActionButton
                backgroundColor="#5DCAFB"
                style={styles}
                onClick={onClick}
            >
                <ContentAdd />
            </FloatingActionButton>
        );
    }

});
