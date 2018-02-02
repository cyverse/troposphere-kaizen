import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { CircularProgress } from 'material-ui';
import { connect, Connect } from 'lore-hook-connect';
import PayloadStates from '../../../../constants/PayloadStates';

export default connect((getState, props) => {
    const { data } = props;

    return {
        image: getState('image.byId', {
            id: data.image
        })
    }
})(
createReactClass({
    displayName: 'SetDefaults',

    propTypes: {
        image: PropTypes.object.isRequired,
        data: PropTypes.object.isRequired,
        onSetDefaults: PropTypes.func.isRequired
    },

    render: function() {
        const {
            image,
            data,
            onSetDefaults
        } = this.props;

        if (image.state === PayloadStates.FETCHING) {
            return (
                <div style={{ textAlign: 'center', marginTop: 72 }}>
                    <CircularProgress />
                </div>
            );
        }

        return (
            <div style={{ textAlign: 'center', marginTop: 72 }}>
                <Connect callback={(getState, props) => {
                    const data = {
                        new_application_name: image.data.name,
                        new_application_description: image.data.description
                    };
                    onSetDefaults(data);
                    return {};
                }}>
                    <CircularProgress />
                </Connect>
            </div>
        );
    }

})
);
