import React from 'react';
import createReactClass from 'create-react-class';
import hoistStatics from 'hoist-non-react-statics';
import { MuiThemeProvider } from 'material-ui/styles';
import muiTheme from '../muiTheme';

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function withMuiTheme(WrappedComponent) {
    const WithMuiTheme = createReactClass({
        displayName: 'WithMuiTheme',

        render() {
            return (
                <MuiThemeProvider muiTheme={muiTheme}>
                    <WrappedComponent {...this.props} />
                </MuiThemeProvider>
            );
        },
    });

    WithMuiTheme.displayName = `withMuiTheme(${getDisplayName(WrappedComponent)})`;
    WithMuiTheme.WrappedComponent = WrappedComponent;

    return hoistStatics(WithMuiTheme, WrappedComponent)
}
