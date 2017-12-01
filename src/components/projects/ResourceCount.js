import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { FlatButton } from 'material-ui';
import PayloadStates from '../../constants/PayloadStates';

const styles = {
    icon: {
        color: 'rgba(0,0,0,0.67)'
    },
    resource: {
        disabled: true,
        style: {
            color: 'rgba(0,0,0,0.67)',
            minWidth: '0px'
        }
    }
};

export default createReactClass({
    displayName: 'ResourceCount',

    propTypes: {
        collection: PropTypes.object.isRequired,
        icon: PropTypes.node.isRequired
    },

    render: function () {
        const {
            collection,
            icon
        } = this.props;

        const label = collection.state === PayloadStates.FETCHING ? '-' : String(collection.data.length);

        return (
            <FlatButton
                label={label}
                icon={React.cloneElement(icon, {...styles.icon})}
                {...styles.resource}
            />
        );
    }
});
