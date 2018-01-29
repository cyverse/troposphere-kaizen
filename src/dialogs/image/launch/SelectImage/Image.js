import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Avatar } from 'material-ui';
import moment from 'moment';
import _ from 'lodash';
import ColorHash from 'color-hash';
import { MediaCardIdentity, MediaCardText } from 'cyverse-ui-next';

export default createReactClass({
    displayName: 'Image',

    propTypes: {
        image: PropTypes.object.isRequired,
        isSelectable: PropTypes.bool,
        isCheckable: PropTypes.bool,
        checked: PropTypes.bool,
        onCheck: PropTypes.func
    },

    getDefaultProps() {
        return {
            isSelectable: true,
            isCheckable: false,
            checked: false,
            onCheck: () => {}
        };
    },

    getInitialState() {
      return {
          isHovered: false,
          checked: false
      };
    },

    onMouseEnter() {
        this.setState({
            isHovered: true
        });
    },

    onMouseLeave() {
        this.setState({
            isHovered: false
        });
    },

    onCheck() {
        const { image } = this.props;
        this.setState({
            checked: !this.state.checked
        });
    },

    render: function() {
        const {
            image,
            isSelectable,
            isCheckable,
            checked,
            onCheck
        } = this.props;
        const colorHash = new ColorHash();

        const { isHovered } = this.state;

        return (
            <div
                className="list-card"
                style={{ height: '72px', position: 'relative' }}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <div className="row">
                    <div className="col-md-9 col-lg-4" style={{ cursor: 'pointer' }}>
                        <MediaCardIdentity
                            primaryText={image.data.name}
                            secondaryText={`Created ${moment(image.data.start_date).format('MMM DD YYYY')}`}
                            avatar={(
                                <Avatar backgroundColor={colorHash.hex(image.id)}>
                                    {_.upperFirst(image.data.name[0])}
                                </Avatar>
                            )}
                            isCheckable={isSelectable && (isHovered || checked || isCheckable)}
                            checked={checked}
                            onCheck={onCheck}
                        />
                    </div>
                    <div className="col-md-3 col-lg-8">
                        <MediaCardText text={image.data.description} />
                    </div>
                </div>
            </div>
        );
    }
});
