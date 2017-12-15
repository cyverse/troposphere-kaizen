import instanceAction from '../../../blueprints/actions/instanceAction';

export default instanceAction({
    params: {
        action: 'reboot',
        reboot_type: 'HARD'
    },
    optimisticState: {
        status_raw: "active - rebooting",
        status: "active",
        activity: "rebooting"
    }
});
