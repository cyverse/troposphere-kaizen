import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import ColorHash from 'color-hash';
import { MediaCardIdentity } from 'cyverse-ui-next';
import PayloadStates from '../../../constants/PayloadStates';
import ExpandableMediaCard from '../../../decorators/ExpandableMediaCard';
import DetailField from '../../_common/DetailField';
import Status from './Status';
import QuickActions from './QuickActions';
import Menu from './Menu';
import ImageText from './ImageText';
import IpAddressText from './IpAddressText';
import ProviderText from './ProviderText';
import SizeText from './SizeText';
import Polling from './Polling';
import InstanceHistory from './InstanceHistory';
import Avatar from './Avatar';

export default ExpandableMediaCard()(createReactClass({
    displayName: 'Instance',

    propTypes: {
        instance: PropTypes.object.isRequired,
        isExpanded: PropTypes.bool.isRequired,
        onExpand: PropTypes.func.isRequired,
        onCollapse: PropTypes.func.isRequired,
        onToggleExpansion: PropTypes.func.isRequired
    },

    getStyles: function() {
        const { instance } = this.props;

        if (
            instance.state === PayloadStates.CREATING ||
            // volume.state === PayloadStates.UPDATING ||
            instance.state === PayloadStates.DELETING
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
        const { instance, isExpanded } = this.props;
        const colorHash = new ColorHash();
        const styles = this.getStyles();

        return (
            <div>
                <Polling instance={instance} />
                <div className="row clickable" style={styles} onClick={this.onClick}>
                    <div className="col-md-6 col-lg-4">
                        <MediaCardIdentity
                            primaryText={instance.data.name}
                            secondaryText={`Created ${moment(instance.data.start_date).format('MMM DD YYYY')}`}
                            avatar={(
                                <Avatar instance={instance}/>
                            )}
                        />
                    </div>
                    <div className="col-md-4 col-lg-2">
                        <div className="card-header-col status">
                            <Status instance={instance} />
                        </div>
                    </div>
                    <div className="d-none d-lg-block col-lg-1">
                        <div className="card-header-col text">
                            <SizeText instance={instance} />
                        </div>
                    </div>
                    <div className="d-none d-lg-block col-lg-1">
                        <div className="card-header-col text">
                            <ProviderText instance={instance} />
                        </div>
                    </div>
                    <div className="col-md-2 col-lg-4 text-right">
                        <div className="d-none d-lg-inline-block">
                            <QuickActions ref="actions" instance={instance} />
                        </div>
                        <Menu ref="menu" instance={instance} />
                    </div>
                </div>
                {isExpanded ? <hr/> : null}
                {isExpanded ? (
                    <div className="list-card-detail">
                        <div className="row">
                            <div className="col-5">
                                <div className="row">
                                    <div className="col-12">
                                        <h1>Instance Details</h1>
                                    </div>
                                </div>
                                <DetailField label="ID">
                                    {instance.id}
                                </DetailField>
                                <DetailField label="UUID">
                                    {instance.data.uuid}
                                </DetailField>
                                <DetailField label="Status">
                                    <Status instance={instance} />
                                </DetailField>
                                <DetailField label="Size">
                                    <SizeText instance={instance} />
                                </DetailField>
                                <DetailField label="IP Address">
                                    <IpAddressText instance={instance} />
                                </DetailField>
                                <DetailField label="Based on">
                                    <ImageText instance={instance} />
                                </DetailField>
                                <DetailField label="Provider">
                                    <ProviderText instance={instance} />
                                </DetailField>
                            </div>
                            <div className="col-7">
                                <InstanceHistory instance={instance} />
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}));
