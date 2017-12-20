import volumeAction from '../../../blueprints/actions/volumeAction';

export default volumeAction({
    params: {
        action: 'detach_volume'
    },
    optimisticState: {
        status_raw: "detaching",
        status: "detaching",
        activity: ""
    }
});
