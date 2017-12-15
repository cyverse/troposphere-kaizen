import instanceAction from '../../../blueprints/actions/instanceAction';

export default instanceAction({
    params: {
        action: 'stop'
    },
    optimisticState: {
        status_raw: "active - powering-off",
        status: "active",
        activity: "powering-off"
    }
});
