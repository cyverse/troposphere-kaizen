import _ from 'lodash';

// InstanceState manages the status/activity of an instance. An instance would
// have a status/activity of active/rebooting for example.

function get_percent_complete(state, activity) {
    const states = {
        // Number represents percent task *completed* when in this state
        "build": {
            "block_device_mapping": 10,
            "scheduling": 20,
            "networking": 30,
            "spawning": 40,
            "deleting": 50
        },
        "active": {
            "powering-off": 50,
            "image_uploading": 50,
            "deleting": 50,
            "suspending": 50,
            "shelving": 50,
            "initializing": 50,
            "networking": 60,
            "deploying": 70,
            "shelving_image_pending_upload": 65,
            "shelving_image_uploading": 88,
            "running_boot_script": 90
        },
        "hard_reboot": {
            "rebooting-hard": 50
        },
        "reboot": {
            "rebooting": 50
        },
        "shutoff": {
            "powering-on": 50
        },
        "suspended": {
            "resuming": 50
        },
        "shelved": {
            "unshelving": 60
        },
        "shelved_offloaded": {
            "spawning": 50
        },
        "error": {}
    };

    let lookup = states[state];

    if (!lookup) {
        lookup = {};
        /* eslint-disable no-console */
        console.error("Unknown state (%s) representation passed", state);
        /* eslint-enable no-console */
    }

    if (state === "error") {
        /* eslint-disable no-console */
        console.log("Error state processed: activity = %s", activity);
        /* eslint-enable no-console */
    }

    // Note: 100 is graphically similar to 0
    return lookup[activity] || 100;
}

export default function (instance) {
    const attributes = instance.data.state;
    const status_raw = attributes.status_raw;
    const tokens = status_raw.split("-").map(s => s.trim());
    const status = tokens[0];
    const activity = attributes.activity;

    return {

        isInFinalState: function () {
            const validStates = [
                "active",
                "error",
                "active - deploy_error",
                "active - user_deploy_error",
                "shelved_offloaded",
                "suspended",
                "shutoff"
            ];

            if (status === "build") {
                return false;
            }

            return _.contains(validStates, status_raw);
        },

        // This method is a slight hack, there is a larger problem with how we keep
        // track of state. It is documented in ATMO-1120.
        isDeployError: function () {
            return (
                status === "active" &&
                (
                    activity === "deploy_error" ||
                    activity === "user_deploy_error"
                )
            );
        },

        isInactive: function () {
            return (
                status === "suspended" ||
                status === "shutoff" ||
                status === "shelved" ||
                status === "shelved_offloaded"
            );
        },

        getPercentComplete: function () {
            let percentComplete = 100;
            if (status && activity) {
                percentComplete = get_percent_complete(status, activity);
            }
            return percentComplete;
        }

    };
};
