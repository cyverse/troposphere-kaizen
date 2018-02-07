import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import instanceUtils from '../../../../utils/instance';
import StatusLight from './StatusLight';
import StatusProgressBar from './StatusProgressBar';
import StatusText from './StatusText';

export default createReactClass({
    displayName: 'Status',

    propTypes: {
        instance: PropTypes.object.isRequired,
        showProgress: PropTypes.bool.isRequired
    },

    getDefaultProps() {
      return {
          showProgress: true
      }
    },

    componentDidMount() {
        const { instance } = this.props;
        lore.actions.instance.updateV1(instance);
    },

    render: function() {
        const { instance, showProgress } = this.props;
        const percentComplete = instanceUtils(instance).getPercentComplete();

        return (
            <div style={{ position: 'relative' }}>
                <StatusLight instance={instance}/> <StatusText instance={instance} />
                {false && showProgress && percentComplete < 100 ? (
                    <StatusProgressBar instance={instance} />
                ) : null}
            </div>
        );
    }
});
