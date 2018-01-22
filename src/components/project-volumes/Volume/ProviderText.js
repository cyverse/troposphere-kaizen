import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import PayloadStates from '../../../constants/PayloadStates';
import { connect } from 'lore-hook-connect';

const nameMap = {
    'CyVerse Cloud - Marana': 'Marana',
    'iPlant Cloud - Tucson': 'Tucson',
    'iPlant Workshop Cloud - Tucson': 'Workshop'
};

export default connect(function (getState, props) {
    const { volume } = props;

    return {
        provider: getState('provider.byId', {
            id: volume.data.provider
        })
    }
})(
createReactClass({
    displayName: 'Provider',

    propTypes: {
        provider: PropTypes.object.isRequired
    },

    render: function () {
        const { provider } = this.props;

        if (provider.state === PayloadStates.FETCHING) {
            return (
                <span>...</span>
            );
        }

        return (
            <span>
                {nameMap[provider.data.name] || provider.data.name}
            </span>
        );
    }
})
);
