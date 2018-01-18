import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import { FloatingActionButton as MuiFloatingActionButton } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';

export default createClass({
    displayName: 'FloatingActionButton',

    propTypes: {
        children: PropTypes.node,
        icon: PropTypes.node,
        onClick: PropTypes.func
    },

    getInitialState() {
        this.isMounted = false;
        return {
            isOpen: false,
            showButton: false
        }
    },

    componentDidMount() {
        this.isMounted = true;

        setTimeout(() => {
            if (this.isMounted) {
                this.setState({
                    showButton: true
                });
            }
        }, 250);
    },

    componentWillUnmount() {
      this.isMounted = false;
    },

    getStyles() {
        const { isOpen } = this.props;
        const { showButton } = this.state;

        return {
            root: {
                position: 'relative',
                transform: showButton ? 'scale(1)' : 'scale(0)',
                transition: 'transform ease .1s',
            },
            icon: {
                transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                transition: 'transform ease .1s'
            }
        }
    },

    onClick() {
        const { children } = this.props;
        const { isOpen } = this.state;

        if (children) {
            this.setState({
                isOpen: !isOpen
            });
        }
    },

    render() {
        const {
            children,
            icon,
            onClick,
            backgroundColor,
            isOpen,
            style,
            ...rest
        } = this.props;

        const styles = this.getStyles();

        return (
            <div style={style}>
                <div className="root" style={styles.root}>
                    <MuiFloatingActionButton
                        {...rest}
                        backgroundColor={isOpen ? '#585858' : backgroundColor}
                        onClick={onClick || this.onClick}
                    >
                        {icon ? React.cloneElement(icon, { style: styles.icon }) : <ContentAdd style={styles.icon} />}
                    </MuiFloatingActionButton>
                    {children ? React.cloneElement(children, { isOpen: isOpen }) : null}
               </div>
            </div>
       )
    }

});
