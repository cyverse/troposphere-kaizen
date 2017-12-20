import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { ListItem, Checkbox, RadioButton } from 'material-ui';

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
        isCheckable: PropTypes.bool,
        checked: PropTypes.bool,
        onCheck: PropTypes.func
    },

    getDefaultProps() {
      return {
          isCheckable: false,
          checked: false,
          onCheck: () => {}
      };
    },

    render: function () {
        const {
            primaryText,
            secondaryText,
            avatar,
            isCheckable,
            checked,
            onCheck
        } = this.props;

        return (
            <ListItem
                leftAvatar={isCheckable ? null : avatar}
                leftCheckbox={isCheckable ? (
                    <RadioButton
                        style={{ left: 24 }}
                        checked={checked}
                        onCheck={onCheck}
                    />
                ) : null}
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
