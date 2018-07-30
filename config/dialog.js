/**
 * Configuration file for dialogs
 *
 * This file is where you define overrides for the default dialog behavior.
 */
import muiTheme from '../src/muiTheme';
import FullScreenDialog from '../hooks/_partials/lore-hook-dialog-material-ui/templates/FullScreenDialog';

export default {

    /**
     * The Material UI theme
     */

    muiTheme: muiTheme,

    /**
     * DOM Element ID that the dialogs should be mounted to. Should be located
     * outside the DOM element the application is mounted to.
     */

    // domElementId: 'dialog',

    /**
     * The different types of dialogs that can be shown, each containing the logic
     * to show and hide a dialog. You can extend this set to includes alerts, full-screen
     * dialogs, scrollable dialogs, modal dialogs, etc.
     */

    // templates: {
    //     dialog: Dialog,
    //     modal: Modal
    // },

    templates: {
        fullScreenDialog: FullScreenDialog
    },

    /**
     * The default template that should be used
     */

    // defaultTemplate: 'dialog',

    /*
     * Container that wraps all dialogs. Primary purpose is to provide data through
     * context, so components behave like you would expect.
     *
     * The default configuration wraps dialogs with Provider so that lore.connect
     * will work. If you need additional functionality, such as routing and
     * access to the current user, you'll need to define 'lore.dialog.childContextTypes'
     * and 'lore.dialog.getChildContext' *before* calling 'lore.dialog.show'.
     *
     * A good place to do this is in the 'Master' component, by setting those
     * values inside the 'getChildContext' of that component.
     */

    // buildDialogContainer: function(lore, options = {}) {
    //     const { store } = lore;
    //     const { muiTheme, templates, defaultTemplate } = lore.config.dialog;
    //     const Dialog = templates[options.template || defaultTemplate];
    //
    //     const childContextTypes = (
    //         options.childContextTypes ||
    //         lore.dialog.childContextTypes ||
    //         {}
    //     );
    //
    //     const getChildContext = (
    //         options.getChildContext ||
    //         lore.dialog.getChildContext ||
    //         function() {
    //             return {};
    //         }
    //     );
    //
    //     return createReactClass({
    //         displayName: 'DialogContainer',
    //
    //         propTypes: {
    //             dialog: PropTypes.object.isRequired
    //         },
    //
    //         childContextTypes: childContextTypes,
    //
    //         getChildContext: getChildContext,
    //
    //         render: function () {
    //             const { dialog } = this.props;
    //
    //             return (
    //                 <Provider store={store}>
    //                     <MuiThemeProvider muiTheme={muiTheme}>
    //                         <Dialog dialog={dialog} />
    //                     </MuiThemeProvider>
    //                 </Provider>
    //             );
    //         }
    //     });
    // },

    /*
     * The function responsible for mounting the dialog once it's been created.
     *
     * By default, the previous dialog is unmounted *only* when mounting a new
     * dialog. This means previous dialogs may still"in the background"; invisible
     * but still mounted to the DOM.
     *
     * Before mounting a new dialog, we unmount the previous one (if it exists) to
     * make sure we have a clean canvas to work with, and so that no component state
     * will carry over (such as when launching the same dialog back-to-back).
     */

    // renderDialogToDom: function(domElementId, component) {
    //     // Get the DOM node we should mount the dialog to
    //     const node = document.getElementById(domElementId);
    //
    //     // Umnount any dialog previously mounted to this DOM node
    //     ReactDOM.unmountComponentAtNode(node);
    //
    //     // Render the dialog to the screen!
    //     ReactDOM.render(component, node);
    // }

};
