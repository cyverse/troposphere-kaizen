import volumeAction from '../../../blueprints/actions/volumeAction';

export default volumeAction({
    params: {
        action: 'attach_volume'
    },
    optimisticState: {
        status_raw: "attaching",
        status: "attaching",
        activity: ""
    }
});
