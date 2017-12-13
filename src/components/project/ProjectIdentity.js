import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { ActionInfo } from 'material-ui/svg-icons';
import { Avatar } from 'material-ui';
import { Identity } from 'cyverse-ui';
import moment from 'moment';
import ColorHash from 'color-hash';

const styles = {
    container: {
        marginBottom: '40px'
    },
    descriptionWrapper: {
        paddingTop: '8px',
        // todo: replace this when right margin of Identity is non-fractional
        marginLeft: '73px'
    },
    description: {
        color: 'rgba(0,0,0,.67)',
        fontSize: '16px',
        fontWeight: '400',
        maxWidth: '600px',
        lineHeight: '24px',
        margin: '0px'
    }
};

export default createReactClass({
    displayName: 'Layout',

    propTypes: {
        project: PropTypes.object.isRequired
    },

    render: function () {
        const { project } = this.props;
        const colorHash = new ColorHash();

        return (
            <div style={styles.container}>
                <Identity
                    primaryText={project.data.name}
                    secondaryText={`Created ${moment(project.data.start_date).format('MMM DD YYYY')}`}
                    image={(
                        <Avatar backgroundColor={colorHash.hex(project.id)}>
                            {project.data.name[0]}
                        </Avatar>
                    )}
                    lg={true}
                />
                <div style={styles.descriptionWrapper}>
                    <p style={styles.description}>
                        {project.data.description}
                    </p>
                </div>
            </div>
        );
    }

});
