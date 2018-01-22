import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default createReactClass({
    displayName: 'IpAddressText',

    propTypes: {
        instance: PropTypes.object.isRequired
    },

    render: function() {
        const { instance } = this.props;
        const { ip_address } = instance.data;

        return (
            <span>
                {_.startsWith(ip_address, '0') ? 'N/A' : `${ip_address} (Floating)`}
            </span>
        );
    }
});
