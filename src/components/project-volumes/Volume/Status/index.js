import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import volumeUtils from '../../../../utils/volume';
import StatusLight from './StatusLight';
import StatusProgressBar from './StatusProgressBar';
import StatusText from './StatusText';

export default createReactClass({
    displayName: 'Status',

    propTypes: {
        volume: PropTypes.object.isRequired,
        showProgress: PropTypes.bool.isRequired
    },

    getDefaultProps() {
      return {
          showProgress: true
      }
    },

    render: function() {
        const { volume, showProgress } = this.props;
        const percentComplete = volumeUtils(volume).getPercentComplete();

        return (
            <div style={{ position: 'relative' }}>
                <StatusLight volume={volume}/> <StatusText volume={volume} />
                {false && showProgress && percentComplete < 100 ? (
                    <StatusProgressBar volume={volume} />
                ) : null}
            </div>
        );
    }
});
