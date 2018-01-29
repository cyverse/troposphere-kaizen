import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import AttachQuickAction from './Menu/AttachQuickAction';
import DetachQuickAction from './Menu/DetachQuickAction';

export default createReactClass({
    displayName: 'QuickActions',

    propTypes: {
        volume: PropTypes.object.isRequired,
        project: PropTypes.object.isRequired
    },

    render: function () {
        const { volume, project } = this.props;

        return (
            <div ref="buttons" style={{ paddingTop: '12px', paddingBottom: '12px', display: 'inline-block' }}>
                <AttachQuickAction volume={volume} project={project} />
                <DetachQuickAction volume={volume} />
            </div>
        );
    }
});
