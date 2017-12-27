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

        return (
            <div style={{ textAlign: 'center', marginTop: 72 }}>
                <Connect callback={(getState, props) => {
                    return {
                        allocation_source: data.allocation_source ? getState('allocationSource.byId', {
                            id: data.allocation_source
                        }) : getState('allocationSource.first'),
                        identity: data.identity ? getState('identity.byId', {
                            id: data.identity
                        }) : getState('identity.first'),
                        image_version: data.image_version ? getState('imageVersion.byId', {
                            id: data.image_version
                        }) : getState('imageVersion.first', {
                            where: {
                                image_id: image.id
                            }
                        })
                    }
                }}>
                    {(props) => {
                        const {
                            allocation_source,
                            identity,
                            image_version
                        } = props;

                        if (
                            allocation_source.state === PayloadStates.FETCHING ||
                            identity.state === PayloadStates.FETCHING ||
                            image_version.state === PayloadStates.FETCHING
                        ) {
                            return (
                                <CircularProgress />
                            );
                        }

                        return (
                            <Connect callback={(getState, props) => {
                                return {
                                    size: data.size ? getState('size.byId', {
                                        id: data.size
                                    }) : getState('size.first', {
                                        where: {
                                            provider__id: identity.data.provider
                                        }
                                    })
                                }
                            }}>
                                {(props) => {
                                    const { size } = props;

                                    if (size.state === PayloadStates.FETCHING) {
                                        return (
                                            <CircularProgress />
                                        );
                                    }

                                    return (
                                        <Connect callback={(getState, props) => {
                                            const data = {
                                                name: image.data.name,
                                                allocation_source: allocation_source.id,
                                                identity: identity.id,
                                                size: size.id,
                                                image_version: image_version.id
                                            };
                                            onSetDefaults(data);
                                            return {};
                                        }}>
                                            <CircularProgress />
                                        </Connect>
                                    )
                                }}
                            </Connect>
                        );
                    }}
                </Connect>
            </div>
        );
    }

})
);
