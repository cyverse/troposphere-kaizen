import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import onClickOutside from 'react-onclickoutside';

function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}

/**
 * This decorator has two purposes:
 *
 * 1. Remove the awkward boilerplate associated with using the "onclickoutside"
 * 2. Change the event types from ['touchstart', 'touchmove'] to ['click', 'touchend'], which
 *    will cause the click event to be detected *after* the mouse is released, which is required
 *    to achieve the expected behavior when clicking between cards (when using the default events
 *    it will sometimes appear as if the click is not detected based on how the cards are arranged)
 * 3. Provide a way to control which components should be universally ignored. For example, we do
 *    opening and interacting with a dialog to close the card, so we can ignore the entire dialog
 *    later here.
 *
 * Important Callout:
 *
 * The reason you don't see code ignoring the dialog layer here is because Material UI puts
 * dialogs, menus and anything that appears "above" the application in a layer that gets
 * rendered outside the application. Since all those things are things we want to ignore, we
 * are solving that problem by overriding the "Popover" component in material-ui/Popover and
 * applying a class to all Popover's called "ignore-react-onclickoutside".
 *
 * react-onclickoutside will ignore click events from any components with that class applied.
 *
 * If we ever need to change the strategy, and are interested in using specific classes to ignore
 * click events, the code below is one way to detect whether a click event occurred inside a component
 * that should be ignored based on a list of classes.
 *
 * const targets = _.flatten(_.concat([],
 *   _.toArray(document.getElementsByClassName('standard-dialog')),
 *   _.toArray(document.getElementsByClassName('full-screen-dialog')),
 *   _.toArray(document.getElementsByClassName('material-ui-render-to-layer'))
 * ));
 *
 * const targetExcluded = _.reduce(targets, function(result, target) {
 *   return result || target.contains(event.target);
 * }, false);

 * if (targetExcluded) {
 *   return;
 * }
 */

export default function(options = {}) {
    const {
        expandedClassName
    } = _.merge({
        expandedClassName: 'expanded'
    }, options);

    return function(DecoratedComponent) {
        const displayName = 'ExpandableMediaCard(' + getDisplayName(DecoratedComponent) + ')';

        const Component = onClickOutside(createReactClass({
            displayName: displayName,

            getInitialState() {
                return {
                    isExpanded: false
                }
            },

            handleClickOutside(event) {
                this.setState({
                    isExpanded: false
                });
            },

            onExpand(event) {
                this.setState({
                    isExpanded: true
                });
            },

            onCollapse(event) {
                this.setState({
                    isExpanded: false
                });
            },

            onToggleExpansion(event) {
                const { isExpanded } = this.state;

                this.setState({
                    isExpanded: !isExpanded
                });
            },

            render: function () {
                const { isExpanded } = this.state;

                return (
                    <div className={`list-card ${isExpanded ? expandedClassName : ''}`}>
                        {React.createElement(DecoratedComponent, _.assign({}, this.props, {
                            isExpanded: isExpanded,
                            onExpand: this.onExpand,
                            onCollapse: this.onCollapse,
                            onToggleExpansion: this.onToggleExpansion
                        }))}
                    </div>
                );
            }
        }));

        return createReactClass({
            render() {
                return (
                    <Component
                        {...this.props}
                        eventTypes={["click", "touchend"]}
                    />
                );
            }
        });
    }
};
