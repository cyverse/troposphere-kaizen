import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui';
import volumeUtils from '../../../../utils/volume';

export default createReactClass({
    displayName: 'StatusProgressBar',

    propTypes: {
        volume: PropTypes.object.isRequired
    },

    render: function() {
        const { volume } = this.props;
        const percentComplete = volumeUtils(volume).getPercentComplete();

        return (
            <LinearProgress
                className="status-progress-bar"
                mode="determinate"
                value={percentComplete}
            />
        );
    }
});
