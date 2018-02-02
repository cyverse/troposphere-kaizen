import React from 'react';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';
import { ToggleStar, ToggleStarBorder } from 'material-ui/svg-icons';
import { connect } from 'lore-hook-connect';
import PayloadStates from '../../../../constants/PayloadStates';

export default connect(function(getState, props) {
    const { image } = props;

    // todo: this should really be getState('imageBookmark.first', ...)
    // but the API doesn't currently support filtering by image

    // return {
    //     imageBookmark: getState('imageBookmark.first', {
    //         where: {
    //             image_id: image.id
    //         }
    //     })
    // };

    return {
        imageBookmarks: getState('imageBookmark.findAll', {
            where: {
                image: image.id
            }
        })
    };
})(
withRouter(createReactClass({
    displayName: 'Image',

    propTypes: {
        imageBookmarks: PropTypes.object.isRequired
    },

    getImageBookmark(props) {
        const { image, imageBookmarks } = props;

        if (imageBookmarks.state === PayloadStates.FETCHING) {
            return {
                state: PayloadStates.FETCHING
            };
        }

        const imageBookmark = _.find(imageBookmarks.data, function(imageBookmark) {
            return imageBookmark.data.image === image.id;
        });

        if (imageBookmark) {
            return imageBookmark;
        }

        return {
            state: PayloadStates.NOT_FOUND
        };
    },

    getInitialState() {
        return {
            imageBookmark: this.getImageBookmark(this.props)
        };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            imageBookmark: this.getImageBookmark(nextProps)
        });
    },

    bookmarkImage() {
        const { image } = this.props;
        lore.actions.imageBookmark.create({
            image: image.id
        });
    },

    removeBookmark() {
        const { imageBookmark } = this.state;
        lore.actions.imageBookmark.destroy(imageBookmark);
    },

    render: function () {
        const {
            // imageBookmark,
            image
        } = this.props;

        const { imageBookmark } = this.state;

        if (imageBookmark.state === PayloadStates.FETCHING) {
            return (
                <IconButton tooltip="Bookmark Image" tooltipPosition="top-center" disabled={true}>
                    <ToggleStarBorder />
                </IconButton>
            );
        }

        if (imageBookmark.state === PayloadStates.RESOLVED) {
            return (
                <IconButton tooltip="Bookmark Image" tooltipPosition="top-center" onClick={this.removeBookmark}>
                    <ToggleStar color="#FDC228" />
                </IconButton>
            );
        }

        if (
            imageBookmark.state === PayloadStates.NOT_FOUND ||
            imageBookmark.state === PayloadStates.DELETED
        ) {
            return (
                <IconButton tooltip="Bookmark Image" tooltipPosition="top-center" onClick={this.bookmarkImage}>
                    <ToggleStarBorder />
                </IconButton>
            );
        }

        return (
            <IconButton tooltip="Bookmark Image" tooltipPosition="top-center" disabled={true}>
                <ToggleStarBorder />
            </IconButton>
        );
    }
}))
);
