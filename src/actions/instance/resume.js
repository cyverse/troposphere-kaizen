import instanceAction from '../../../blueprints/actions/instanceAction';

export default instanceAction({
    params: {
        action: 'resume'
    },
    optimisticState: {
        status_raw: "suspended - resuming",
        status: "active",
        activity: "resuming"
    }
});
