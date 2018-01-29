import React from 'react';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Chip } from 'material-ui';
import { connect, Connect } from 'lore-hook-connect';
import PayloadStates from '../../../../constants/PayloadStates';

export default connect(function(getState, props) {
    const { image } = props;

    return {
        imageTags: getState('imageTag.find', {
            where: {
                image_id: image.id
            },
            pagination: {
                page_size: 5
            }
        })
    };
})(
withRouter(createReactClass({
    displayName: 'Image',

    propTypes: {
        image: PropTypes.object.isRequired,
        imageTags: PropTypes.object.isRequired
    },

    render: function () {
        const { imageTags } = this.props;

        if (imageTags.state === PayloadStates.FETCHING) {
            return (
                <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <Chip style={{ marginRight: 4, marginBottom: 4 }}>
                        ...
                    </Chip>
                </div>
            );
        }

        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
                {imageTags.data.map(function(imageTag) {
                    return (
                        <Connect key={imageTag.id || imageTag.cid} callback={(getState, props) => {
                            return {
                                tag: getState('tag.byId', {
                                    id: imageTag.data.tag
                                })
                            };
                        }}>
                            {(props) => {
                                const { tag } = props;

                                if (tag.state === PayloadStates.FETCHING) {
                                    return (
                                        <Chip style={{ marginRight: 4, marginBottom: 4 }}>...</Chip>
                                    )
                                }
                                return (
                                    <Chip style={{ marginRight: 4, marginBottom: 4 }}>
                                        {tag.data.name}
                                    </Chip>
                                )
                            }}
                        </Connect>
                    )
                })}
            </div>
        );
    }
}))
);
