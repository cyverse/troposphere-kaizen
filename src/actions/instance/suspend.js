import instanceAction from '../../../blueprints/actions/instanceAction';

export default instanceAction({
    params: {
        action: 'suspend'
    },
    optimisticState: {
        status_raw: "active - suspending",
        status: "active",
        activity: "suspending"
    }
});
