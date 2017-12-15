import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

const styles = {
    paddingTop: '27px',
    paddingBottom: '27px'
};

export default createReactClass({
    displayName: 'Size',

    propTypes: {
        volume: PropTypes.object.isRequired
    },

    render: function () {
        const { volume } = this.props;

        return (
            <div style={styles}>
                {`${volume.data.size}GB`}
            </div>
        );
    }
});
