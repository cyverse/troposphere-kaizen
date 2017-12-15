import instanceAction from '../../../blueprints/actions/instanceAction';

export default instanceAction({
    params: {
        action: 'unshelve'
    },
    optimisticState: {
        status_raw: "shelved - unshelving",
        status: "active",
        activity: "unshelving"
    }
});
