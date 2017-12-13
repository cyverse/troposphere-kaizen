import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Avatar } from 'material-ui';
import moment from 'moment';
import ColorHash from 'color-hash';
import {
  MediaCard,
  MediaCardSection,
  MediaCardIdentity,
  MediaCardText
} from 'cyverse-ui-next';
import PayloadStates from '../../constants/PayloadStates';

export default createReactClass({
    displayName: 'Volume',

    propTypes: {
        volume: PropTypes.object.isRequired
    },

    getStyles: function() {
        const {
            volume
        } = this.props;

        if (
            volume.state === PayloadStates.CREATING ||
            volume.state === PayloadStates.UPDATING ||
            volume.state === PayloadStates.DELETING
        ) {
            return {
              opacity: '0.3'
            }
        }

        return {};
    },

    render: function () {
        const {
            volume
        } = this.props;
        const colorHash = new ColorHash();
        const styles = this.getStyles();

        return (
            <MediaCard style={styles}>
                <MediaCardSection width="25%">
                    <MediaCardIdentity
                        primaryText={volume.data.name}
                        secondaryText={`Created ${moment(volume.data.start_date).format('MMM DD YYYY')}`}
                        avatar={(
                            <Avatar backgroundColor={colorHash.hex(volume.id)}>
                                {volume.data.name[0]}
                            </Avatar>
                        )}
                    />
                </MediaCardSection>
                <MediaCardSection left="25%" width="73%">
                    <MediaCardText
                        text={JSON.stringify(_.omit(volume.data.provider, ['id', 'url']))}
                        maxCharacters={200}
                    />
                </MediaCardSection>
            </MediaCard>
        );
    }
});
