import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Avatar } from 'material-ui';
import moment from 'moment';
import ColorHash from 'color-hash';
import {
  MediaCard,
  MediaCardSection,
  MediaCardIdentity,
  MediaCardText
} from 'cyverse-ui-next';
import PayloadStates from '../../../constants/PayloadStates';

export default createReactClass({
    displayName: 'Image',

    propTypes: {
        image: PropTypes.object.isRequired
    },

    getStyles: function() {
        const {
            image
        } = this.props;

        if (
            image.state === PayloadStates.CREATING ||
            image.state === PayloadStates.UPDATING ||
            image.state === PayloadStates.DELETING
        ) {
            return {
              opacity: '0.3'
            }
        }

        return {};
    },

    render: function () {
        const {
            image
        } = this.props;
        const colorHash = new ColorHash();
        const styles = this.getStyles();

        return (
            <MediaCard style={styles}>
                <MediaCardSection width="25%">
                    <MediaCardIdentity
                        primaryText={image.data.name}
                        secondaryText={`Created ${moment(image.data.start_date).format('MMM DD YYYY')}`}
                        avatar={(
                            <Avatar backgroundColor={colorHash.hex(image.id)}>
                                {image.data.name[0]}
                            </Avatar>
                        )}
                    />
                </MediaCardSection>
                <MediaCardSection left="25%" width="35%">
                    <MediaCardText text={image.data.description}/>
                </MediaCardSection>
            </MediaCard>
        );
    }
});
