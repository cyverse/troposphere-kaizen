import instanceAction from '../../../blueprints/actions/instanceAction';

export default instanceAction({
    params: {
        action: 'redeploy'
    },
    optimisticState: {
        status_raw: "active - initializing",
        status: "active",
        activity: "initializing"
    }
});
