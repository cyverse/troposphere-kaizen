import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { ActionInfo } from 'material-ui/svg-icons';

const styles = {
    container: {
        marginBottom: '32px'
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        letterSpacing: '1px'
    },
    iconWrapper: {
        display: 'inline-block',
        lineHeight: '72px',
        verticalAlign: 'top',
        marginRight: '8px'
    },
    textWrapper: {
        display: 'inline-block'
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

    render: function () {
        return (
            <div style={styles.container}>
                <h1 style={styles.title}>
                    Explore image tags
                </h1>
                <div>
                    <div style={styles.iconWrapper}>
                        <ActionInfo />
                    </div>
                    <div style={styles.textWrapper}>
                        <p style={styles.description}>
                            Explore the tags used to categorize images. Click on a tag to search for images that
                            have that tag applied.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

});
