import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import { FlatButton, Toggle } from 'material-ui';

export default createReactClass({
    displayName: 'FlopbackToggle',

    propTypes: {
        label: PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            hovered: false,
            shouldFlopback: window.shouldFlopback
        }
    },

    getStyles() {
        const { hovered, shouldFlopback } = this.state;
        const isActive = true;

        return {
            button: {
                backgroundColor: isActive ? '#075c8c' : '#1572A8',
                hoverColor: isActive ? '#075c8c' : '#1572A8',
                style: {
                    height: '56px',
                    color: (isActive || hovered) ? 'white' : 'hsla(0, 0%, 100%, 0.7)'
                },
                labelStyle: {
                    paddingLeft: '16px',
                    color: shouldFlopback ? 'white' : 'rgba(255, 255, 255, 0.7)'
                }
            },
            toggle: {
                style: {
                    margin: '6px 0px -8px 25px'
                },
                thumbSwitchedStyle: {
                    backgroundColor: '#FF6F00' // orange
                    // backgroundColor: '#FF4081', // pink,
                    // backgroundColor: '#00BCD4' // light blue
                },
                trackSwitchedStyle: {
                    backgroundColor: '#FFB300', // orange
                    // backgroundColor: '#F48FB1' // pink,
                    // backgroundColor: '#B2EBF2' // light blue
                }
            }
        }
    },

    onMouseEnter(event) {
        this.setState({
            hovered: true
        });
    },

    onMouseLeave(event) {
        this.setState({
            hovered: false
        });
    },

    onClick() {
        const { shouldFlopback } = this.state;
        window.shouldFlopback = !shouldFlopback;
        this.setState({
            shouldFlopback: window.shouldFlopback
        })
    },

    render: function () {
        const styles = this.getStyles();
        const { label } = this.props;
        const { shouldFlopback } = this.state;

        return (
            <FlatButton
                label={label}
                primary={true}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                icon={(
                    <Toggle
                        toggled={shouldFlopback}
                        {...styles.toggle}
                    />
                )}
                onClick={this.onClick}
                {...styles.button}
            />
        );
    }

});
