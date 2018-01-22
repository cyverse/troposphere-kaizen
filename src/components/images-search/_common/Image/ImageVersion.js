import React from 'react';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Avatar } from 'material-ui';
import moment from 'moment';
import ColorHash from 'color-hash';
import { connect } from 'lore-hook-connect';
import { ListCardDetail, MDBlock } from 'cyverse-ui';
import { MediaCardIdentity, MediaCardText } from 'cyverse-ui-next';
import PayloadStates from '../../../../constants/PayloadStates';
import ExpandableMediaCard from '../../../../decorators/ExpandableMediaCard';

export default connect(function(getState, props) {
    const { imageVersion } = props;

    return {

    };
})(
ExpandableMediaCard({ expandedClassName: 'expanded-vertical' })(
withRouter(createReactClass({
    displayName: 'ImageVersion',

    propTypes: {
        imageVersion: PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            isExpanded: false
        }
    },

    handleClickOutside(event) {
        this.setState({
            isExpanded: false
        });
    },

    onClick(event) {
        const { isExpanded } = this.state;

        this.setState({
            isExpanded: !isExpanded
        });
    },

    render: function () {
        const {
            imageVersion,
            isExpanded,
            onToggleExpansion
        } = this.props;
        const colorHash = new ColorHash();

        // if (imageVersions.state === PayloadStates.FETCHING) {
        //     return (
        //         <div>
        //             <h1>Versions</h1>
        //             <SkeletonList cardCount={1}/>
        //         </div>
        //     );
        // }

        return (
            <div>
                <div className="row clickable" onClick={onToggleExpansion}>
                    <div className="col-md-9 col-lg-4">
                        <MediaCardIdentity
                            primaryText={imageVersion.data.name}
                            secondaryText={`Created ${moment(imageVersion.data.start_date).format('MMM DD YYYY')}`}
                            avatar={(
                                <Avatar backgroundColor={colorHash.hex(imageVersion.id)}>
                                    {_.toUpper(imageVersion.data.name[0])}
                                </Avatar>
                            )}
                        />
                    </div>
                    <div className="d-none d-lg-block col-lg-5">
                        <MediaCardText text={imageVersion.data.change_log || ''}/>
                    </div>
                    <div className="col-md-3 col-lg-3">
                        <div style={{ paddingTop: 16, paddingBottom: 16 }}>
                            <div>
                                <strong>Available on:</strong>
                            </div>
                            {imageVersion.data.machines.map(function(machine) {
                                return (
                                    <div key={machine.id}>
                                        {machine.provider.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {isExpanded ? <hr/> : null}
                {isExpanded ? (
                    <div className="list-card-detail">
                        <div className="row">
                            <div className="col-12">
                                <div style={{ marginBottom: '16px' }}>
                                    <MDBlock text={imageVersion.data.change_log || ''} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}))
)
);
