import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import withMuiTheme from './withMuiTheme';
import {Dialog} from 'material-ui';
import {connect} from 'lore-hook-connect';
import auth from '../utils/auth';
import PayloadStates from '../constants/PayloadStates';

function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}

export default function (options = {}) {
    return function (DecoratedComponent) {
        const displayName = 'Dialog(' + getDisplayName(DecoratedComponent) + ')';

        return connect(function (getState, props) {
            return {
                user: auth.isLoggedIn() ? getState('currentUser') : {
                    state: PayloadStates.ERROR_FETCHING,
                    data: {}
                }
            };
        }, { subscribe: true })(
            withMuiTheme(createReactClass({
                displayName: displayName,

                propTypes: {
                    onSubmit: PropTypes.func
                },

                getDefaultProps: function () {
                    return {
                        onSubmit: function () {}
                    }
                },

                childContextTypes: {
                    user: PropTypes.object
                },

                getChildContext() {
                    return {
                        user: this.props.user
                    };
                },

                getInitialState: function () {
                    return {
                        isOpen: false
                    }
                },

                /**
                 * Have the dialog open after we mount the component to make sure
                 * we see the opening transition - if we don't do this, it will
                 * immediately snap into view on the screen (without a gentle transition)
                 */
                componentDidMount: function () {
                    this.setState({
                        isOpen: true
                    });
                },

                onCancel: function (e) {
                    this.dismiss();
                },

                dismiss: function () {
                    this.setState({
                        isOpen: false
                    });
                },

                onSubmit: function (data) {
                    const { onSubmit } = this.props;
                    this.dismiss();
                    onSubmit(data || {});
                },

                render: function () {
                    const defaults = _.defaultsDeep({}, options, {
                        bodyStyle: {
                            padding: 0
                        }
                    });

                    return (
                        <Dialog
                            modal={false}
                            onRequestClose={this.onCancel}
                            open={this.state.isOpen}
                            className="standard-dialog"
                            {...defaults}
                        >
                            <DecoratedComponent
                                {...this.props}
                                onCancel={this.onCancel}
                                onSubmit={this.onSubmit}
                            />
                        </Dialog>
                    );
                }
            }))
        );
    };
}
