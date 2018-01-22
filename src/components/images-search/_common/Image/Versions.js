import React from 'react';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'lore-hook-connect';
import { SkeletonList } from 'cyverse-ui';
import PayloadStates from '../../../../constants/PayloadStates';
import ImageVersion from './ImageVersion';

export default connect(function(getState, props) {
    const { image } = props;

    return {
        imageVersions: getState('imageVersion.find', {
            where: {
                image_id: image.id
            }
        })
    };
})(
withRouter(createReactClass({
    displayName: 'Image',

    propTypes: {
        image: PropTypes.object.isRequired,
        imageVersions: PropTypes.object.isRequired
    },

    render: function () {
        const { imageVersions } = this.props;

        if (imageVersions.state === PayloadStates.FETCHING) {
            return (
                <div>
                    <h1>Versions</h1>
                    <SkeletonList cardCount={1}/>
                </div>
            );
        }

        return (
            <div>
                <h1>Versions</h1>
                <div>
                    {_.flatten(imageVersions.data.map(function(imageVersion) {
                        return (
                            <ImageVersion
                                key={imageVersion.id || imageVersion.cid}
                                imageVersion={imageVersion}
                            />
                        );
                    }))}
                </div>
            </div>
        );
    }
}))
);
