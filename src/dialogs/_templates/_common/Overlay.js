import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { CircularProgress } from 'material-ui';
import _ from 'lodash';

function getStyles(isVisible) {
    const styles = {
        overlay: {
            position: 'relative'
        },
        label: {
            position: 'absolute',
            left: 'calc(50% - 32px)',
            top: 'calc(50% - 10px)',
            fontSize: '32px',
            color: 'rgba(0,0,0,.64)',
            display: 'none'
        },
        content: {
            opacity: 1
        }
    };

    if (isVisible) {
        _.merge(styles, {
            overlay: {
                pointerEvents: 'none'
            },
            label: {
                display: 'block'
            },
            content: {
                opacity: 0.4
            }
        })
    }

    return styles;
}

export default createReactClass({
    displayName: 'Overlay',

    propTypes: {
        isVisible: PropTypes.bool
    },

    render: function () {
        const { isVisible } = this.props;
        const styles = getStyles(isVisible);

        return (
            <div style={styles.overlay}>
                <div style={styles.label}>
                    <CircularProgress/>
                </div>
                <div style={styles.content}>
                    {React.cloneElement(this.props.children)}
                </div>
            </div>
        );
    }

});
