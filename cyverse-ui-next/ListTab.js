import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { Tab, FlatButton } from 'material-ui';
import _ from 'lodash';

const CustomTab = createReactClass({
    displayName: 'ListTab',

    propTypes: {
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.object.isRequired,
        isActive: PropTypes.bool.isRequired,
        style: PropTypes.object
    },

    getStyles(isActive, style) {
        return _.merge({
            backgroundColor: 'white',
            hoverColor: 'white',
            style: {
                color: isActive ? '#464646' : '#848484',
                lineHeight: '36px',
            },
            height: '56px'
        }, style);
    },

    render: function () {
        const {
            value,
            label,
            icon,
            isActive,
            style,
            ...other
        } = this.props;
        const styles = this.getStyles(isActive, style);

        return (
            <Tab
                value={value}
                label={(
                    <FlatButton
                        label={label}
                        containerElement={"div"}
                        primary={true}
                        icon={icon}
                        disableTouchRipple={true}
                        {...styles}
                    />
                )}
                {...other}
            />
        );
    }

});

// CustomTab.muiName = 'Tab';

export default CustomTab;
