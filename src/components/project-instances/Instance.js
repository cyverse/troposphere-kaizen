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
import PayloadStates from '../../constants/PayloadStates';

export default createReactClass({
    displayName: 'Instance',

    propTypes: {
        instance: PropTypes.object.isRequired
    },

    getStyles: function() {
        const {
            instance
        } = this.props;

        if (
            instance.state === PayloadStates.CREATING ||
            instance.state === PayloadStates.UPDATING ||
            instance.state === PayloadStates.DELETING
        ) {
            return {
              opacity: '0.3'
            }
        }

        return {};
    },

    render: function () {
        const {
            instance
        } = this.props;
        const colorHash = new ColorHash();
        const styles = this.getStyles();

        return (
            <MediaCard style={styles}>
                <MediaCardSection width="25%">
                    <MediaCardIdentity
                        primaryText={instance.data.name}
                        secondaryText={`Created ${moment(instance.data.start_date).format('MMM DD YYYY')}`}
                        avatar={(
                            <Avatar backgroundColor={colorHash.hex(instance.id)}>
                                {instance.data.name[0]}
                            </Avatar>
                        )}
                    />
                </MediaCardSection>
                <MediaCardSection left="25%" width="73%">
                    <MediaCardText
                        text={JSON.stringify(_.omit(instance.data.provider, ['id', 'url']))}
                        maxCharacters={200}
                    />
                </MediaCardSection>
            </MediaCard>
        );
    }
});
