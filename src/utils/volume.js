// InstanceState manages the status/activity of an instance. An instance would
// have a status/activity of active/rebooting for example.

function get_percent_complete(state) {
    const states = {
        // Number represents percent task *completed* when in this state
        "detaching": 50,
        "attaching": 50,
        "available": 100,
        "in-use": 100
    };

    return states[state];
}

export default function(volume) {
    const {
        status,
        activity
    } = volume.data.state;

    return {

        isInFinalState: function() {
            const validStates = [
                "available",
                "in-use"
            ];

            return validStates.indexOf(status) >= 0;
        },

        isDeployError: function() {
            return false;
        },

        getPercentComplete: function() {
            let percentComplete = 100;
            if (status) {
                percentComplete = get_percent_complete(status);
            }
            return percentComplete;
        }

    };
};
