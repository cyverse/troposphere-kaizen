import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import ColorHash from 'color-hash';
import { MediaCardIdentity } from 'cyverse-ui-next';
import ExpandableMediaCard from '../../../decorators/ExpandableMediaCard';
import PayloadStates from '../../../constants/PayloadStates';
import DetailField from '../../_common/DetailField';
import QuickActions from './QuickActions';
import Menu from './Menu';
import ProviderText from './ProviderText';
import SizeText from './SizeText';
import Status from './Status';
import Polling from './Polling';
import Avatar from './Avatar';

export default ExpandableMediaCard()(withRouter(createReactClass({
    displayName: 'Volume',

    propTypes: {
        volume: PropTypes.object.isRequired,
        project: PropTypes.object.isRequired,
        isExpanded: PropTypes.bool.isRequired,
        onExpand: PropTypes.func.isRequired,
        onCollapse: PropTypes.func.isRequired,
        onToggleExpansion: PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            isExpanded: false
        }
    },

    getStyles: function() {
        const { volume } = this.props;

        if (
            volume.state === PayloadStates.CREATING ||
            // volume.state === PayloadStates.UPDATING ||
            volume.state === PayloadStates.DELETING
        ) {
            return {
                opacity: '0.3'
            }
        }

        return {};
    },

    onClick(event) {
        const { onToggleExpansion } = this.props;
        const { actions, menu } = this.refs;

        const actionsNode = ReactDOM.findDOMNode(actions);
        const menuNode = ReactDOM.findDOMNode(menu);

        if (
            actionsNode.contains(event.target) ||
            menuNode.contains(event.target)
        ) {
            return;
        }

        onToggleExpansion();
    },

    render: function () {
        const {
            volume,
            project,
            isExpanded
        } = this.props;
        const colorHash = new ColorHash();
        const styles = this.getStyles();

        return (
            <div>
                <Polling volume={volume} />
                <div className="row clickable" style={styles} onClick={this.onClick}>
                    <div className="col-md-6 col-lg-4">
                        <MediaCardIdentity
                            primaryText={volume.data.name}
                            secondaryText={`Created ${moment(volume.data.start_date).format('MMM DD YYYY')}`}
                            avatar={(
                                <Avatar volume={volume} />
                            )}
                        />
                    </div>
                    <div className="col-md-4 col-lg-3">
                        <div className="card-header-col status">
                            <Status volume={volume} />
                        </div>
                    </div>
                    <div className="d-none d-lg-block col-lg-1">
                        <div className="card-header-col text">
                            <SizeText volume={volume} />
                        </div>
                    </div>
                    <div className="d-none d-lg-block col-lg-2">
                        <div className="card-header-col text">
                            <ProviderText volume={volume} />
                        </div>
                    </div>
                    <div className="col-md-2 col-lg-2 text-right">
                        <div className="d-none d-lg-inline-block">
                            <QuickActions ref="actions" volume={volume} project={project} />
                        </div>
                        <Menu ref="menu" volume={volume} project={project} />
                    </div>
                </div>
                {isExpanded ? <hr/> : null}
                {isExpanded ? (
                    <div className="list-card-detail">
                        <div className="row">
                            <div className="col-5">
                                <div className="row">
                                    <div className="col-12">
                                        <h1>Volume Details</h1>
                                    </div>
                                </div>
                                <DetailField label="ID">
                                    {volume.id}
                                </DetailField>
                                <DetailField label="UUID">
                                    {volume.data.uuid}
                                </DetailField>
                                <DetailField label="Status">
                                    <Status volume={volume} />
                                </DetailField>
                                <DetailField label="Size">
                                    <SizeText volume={volume} />
                                </DetailField>
                                <DetailField label="Provider">
                                    <ProviderText volume={volume} />
                                </DetailField>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
})));
