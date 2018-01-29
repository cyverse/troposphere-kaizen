import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { LinearProgress } from 'material-ui';
import instanceUtils from '../../../../utils/instance';

export default createReactClass({
    displayName: 'StatusProgressBar',

    propTypes: {
        instance: PropTypes.object.isRequired
    },

    render: function() {
        const { instance } = this.props;
        const percentComplete = instanceUtils(instance).getPercentComplete();

        return (
            <LinearProgress
                className="status-progress-bar"
                mode="determinate"
                value={percentComplete}
            />
        );
    }
});
