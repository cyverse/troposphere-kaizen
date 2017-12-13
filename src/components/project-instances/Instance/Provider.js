import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import PayloadStates from '../../../constants/PayloadStates';
import { connect } from 'lore-hook-connect';

const styles = {
    paddingTop: '27px',
    paddingBottom: '27px'
};

export default connect(function (getState, props) {
    const { instance } = props;

    return {
        provider: getState('provider.byId', {
            id: instance.data.provider
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
                <div style={styles}>
                    ...
                </div>
            );
        }

        return (
            <div style={styles}>
                {provider.data.name}
            </div>
        );
    }
})
);
