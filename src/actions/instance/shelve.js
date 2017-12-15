import instanceAction from '../../../blueprints/actions/instanceAction';

export default instanceAction({
    params: {
        action: 'shelve'
    },
    optimisticState: {
        status_raw: "active - shelving",
        status: "active",
        activity: "shelving"
    }
});
