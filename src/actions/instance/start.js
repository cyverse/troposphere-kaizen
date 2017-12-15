import instanceAction from '../../../blueprints/actions/instanceAction';

export default instanceAction({
    params: {
        action: 'start'
    },
    optimisticState: {
        status_raw: "shutoff - powering-on",
        status: "shutoff",
        activity: "powering-on"
    }
});
