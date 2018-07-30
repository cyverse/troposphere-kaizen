import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import { FloatingActionButton, FloatingActionButtonActions, FloatingActionButtonAction } from 'cyverse-ui-next';
import { DeviceStorage } from 'material-ui/svg-icons';
import { VolumeIcon } from 'cyverse-ui/es/icons';
import onClickOutside from 'react-onclickoutside';
import ImageLaunchDialog from '../../dialogs/image/launch';
import CreateVolumeDialog from '../../dialogs/volume/create';

const styles = {
    button: {
        position: 'absolute',
        top: '-28px',
        right: 15,
        zIndex: 1050,
    },
    backgroundColor: '#57CBEA'
};

export default withRouter(onClickOutside(createReactClass({
    displayName: 'FloatingActionButton',

    propTypes: {
        project: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired
    },

    getInitialState() {
      return {
          isOpen: false
      }
    },

    handleClickOutside(event) {
        this.setState({
            isOpen: false
        });
    },

    onClick() {
        const { isOpen } = this.state;

        this.setState({
            isOpen: !isOpen
        });
    },

    render: function () {
        const { project, router } = this.props;
        const { isOpen } = this.state;

        return (
            <FloatingActionButton
                style={styles.button}
                isOpen={isOpen}
                onClick={this.onClick}
                backgroundColor={styles.backgroundColor}
            >
                <FloatingActionButtonActions>
                    <FloatingActionButtonAction
                        tooltip="New Instance"
                        icon={<DeviceStorage/>}
                        onClick={() => {
                            this.onClick();
                            lore.dialog.show(() => {
                                return (
                                    <ImageLaunchDialog
                                        project={project}
                                        router={router}
                                    />
                                );
                            }, { template: 'fullScreenDialog' });
                        }}
                        backgroundColor={styles.backgroundColor}
                    />
                    <FloatingActionButtonAction
                        tooltip="New Volume"
                        icon={<VolumeIcon/>}
                        onClick={() => {
                            this.onClick();
                            lore.dialog.show(() => {
                                return (
                                    <CreateVolumeDialog
                                        project={project}
                                        router={router}
                                    />
                                );
                            }, { template: 'fullScreenDialog' });
                        }}
                        backgroundColor={styles.backgroundColor}
                    />
                </FloatingActionButtonActions>
            </FloatingActionButton>
        );
    }

})));
