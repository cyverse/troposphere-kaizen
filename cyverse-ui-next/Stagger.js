import React from 'react';
import PropTypes from 'prop-types';
import CssStagger from 'react-css-stagger';

const AnimationStyle = () => (
    <style>
        {`
        .MediaCard__animation-enter {
            opacity: 0;
            transform: translate(0,10px);
            transition:  opacity .2s ease, transform .2s ease !important;
        }

        .MediaCard__animation-enter-active {
            opacity: 1;
            transform: translate(0,0);
        }
    `}
    </style>
);

export default class Stagger extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired
    };

    render() {
        const { children } = this.props;

        return (
            <div>
                <AnimationStyle/>
                <CssStagger transition="MediaCard__animation" delay={70}>
                    {React.Children.map(children, function(child) {
                        return (
                            <div>
                                {child}
                            </div>
                        );
                    })}
                </CssStagger>
            </div>
        );
    }
}
