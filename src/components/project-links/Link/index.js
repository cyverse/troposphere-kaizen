import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { Avatar } from 'material-ui';
import ColorHash from 'color-hash';
import { MediaCardIdentity } from 'cyverse-ui-next';
import ExpandableMediaCard from '../../../decorators/ExpandableMediaCard';
import DetailField from '../../_common/DetailField';
import DescriptionText from './DescriptionText';
import UrlText from './UrlText';
import Menu from './Menu';

export default ExpandableMediaCard()(withRouter(createReactClass({
    displayName: 'Link',

    propTypes: {
        link: PropTypes.object.isRequired,
        isExpanded: PropTypes.bool.isRequired,
        onExpand: PropTypes.func.isRequired,
        onCollapse: PropTypes.func.isRequired,
        onToggleExpansion: PropTypes.func.isRequired
    },

    onClick(event) {
        const { onToggleExpansion } = this.props;
        const { menu } = this.refs;
        const menuNode = ReactDOM.findDOMNode(menu);

        if (menuNode.contains(event.target)) {
            return;
        }

        onToggleExpansion();
    },

    render: function () {
        const {
            link,
            isExpanded,
            onExpand,
            onCollapse,
            onToggleExpansion
        } = this.props;
        const colorHash = new ColorHash();

        return (
            <div>
                <div className="row clickable" onClick={this.onClick}>
                    <div className="col-md-5 col-lg-3">
                        <MediaCardIdentity
                            primaryText={link.data.title}
                            secondaryText={`Created ???`}
                            avatar={(
                                <Avatar backgroundColor={colorHash.hex(link.id)}>
                                    {_.toUpper(link.data.title[0])}
                                </Avatar>
                            )}
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card-header-col text">
                            <UrlText link={link} />
                        </div>
                    </div>
                    <div className="d-none d-lg-block col-lg-4">
                        <div className="card-header-col text">
                            <DescriptionText link={link} />
                        </div>
                    </div>
                    <div className="col-md-1 col-lg-1 text-right">
                        <Menu ref="menu" link={link} />
                    </div>
                </div>
                {isExpanded ? <hr/> : null}
                {isExpanded ? (
                    <div className="list-card-detail">
                        <div className="row">
                            <div className="col-7">
                                <div className="row">
                                    <div className="col-12">
                                        <h1>Link Details</h1>
                                    </div>
                                </div>
                                <DetailField label="URL">
                                    <UrlText link={link} />
                                </DetailField>
                                <DetailField label="Description">
                                    <span className="description-text multiline">
                                        {link.data.description}
                                    </span>
                                </DetailField>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
})));
