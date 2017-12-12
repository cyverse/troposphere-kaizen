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
    displayName: 'Link',

    propTypes: {
        link: PropTypes.object.isRequired
    },

    getStyles: function() {
        const {
            link
        } = this.props;

        if (
            link.state === PayloadStates.CREATING ||
            link.state === PayloadStates.UPDATING ||
            link.state === PayloadStates.DELETING
        ) {
            return {
              opacity: '0.3'
            }
        }

        return {};
    },

    render: function () {
        const {
            link
        } = this.props;
        const colorHash = new ColorHash();
        const styles = this.getStyles();

        return (
            <MediaCard style={styles}>
                <MediaCardSection width="25%">
                    <MediaCardIdentity
                        primaryText={link.data.title}
                        secondaryText={link.id}
                        avatar={(
                            <Avatar backgroundColor={colorHash.hex(link.id)}>
                                {link.data.title[0]}
                            </Avatar>
                        )}
                    />
                </MediaCardSection>
                <MediaCardSection left="25%" width="73%">
                    <MediaCardText
                        text={link.data.url}
                        maxCharacters={200}
                    />
                </MediaCardSection>
            </MediaCard>
        );
    }
});
