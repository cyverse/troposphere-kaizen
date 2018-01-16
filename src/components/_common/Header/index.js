import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import {
  Toolbar,
  ToolbarGroup,
  DropDownMenu,
  MenuItem,
  Divider,
  Paper,
  FlatButton
} from 'material-ui';
import { Link, withRouter } from 'react-router';
import productLogo from '../../../../assets/images/logo_white.png';
import HeaderLink from './Link';
import HeaderAvatar from './Avatar';
import IsAuthenticated from '../IsAuthenticated';
import IsPublic from '../IsPublic';
import { ContentSave, FileFolder } from 'material-ui/svg-icons';

export default withRouter(createReactClass({
    displayName: 'Header',

    propTypes: {
        zDepth: PropTypes.number.isRequired
    },

    getDefaultProps() {
        return {
            zDepth: 0
        }
    },

    contextTypes: {
        user: PropTypes.object.isRequired,
        muiTheme: PropTypes.object.isRequired
    },

    onMenuChange: function (event, index, value) {
        if (value === 'user') {
            return;
        }
        this.props.router.push(`/${value}`);
    },

    getStyles() {
        const { muiTheme } = this.context;
        const { router, zDepth } = this.props;

        return {
            paper: {
                zDepth: zDepth,
                style: {
                    backgroundColor: muiTheme.palette.primary1Color,
                    zIndex: muiTheme.zIndex.appBar,
                    position: 'relative'
                }
            },
            toolbar: {
                position: 'relative',
                paddingRight: '0px'
            },
            logo: {
                height: '100%'
            },
            links: {
                position: 'absolute',
                left: '200px'
            },
            dropdownMenu: {
                style: {
                    fontSize: '17px'
                },
                labelStyle: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '48px'
                },
                iconStyle: {
                    top: '0px'
                },
                underlineStyle: {
                    display: 'none'
                }
            }
        };
    },

    render: function () {
        const { location } = this.props;
        const { user } = this.context;
        const styles = this.getStyles();

        return (
            <Paper rounded={false} {...styles.paper}>
                <div className="container">
                    <Toolbar style={styles.toolbar}>
                        <ToolbarGroup firstChild={true}>
                            <div>
                                <Link to="/">
                                    <img src={productLogo} style={styles.logo}/>
                                </Link>
                            </div>
                        </ToolbarGroup>
                        <ToolbarGroup style={styles.links}>
                            <IsAuthenticated>
                                <HeaderLink label="Projects" to="/projects" matches={[/^\/projects\//]} icon={<FileFolder/>}/>
                            </IsAuthenticated>
                            <HeaderLink label="Images" to="/images" matches={[/^\/images\//]} icon={<ContentSave/>}/>
                        </ToolbarGroup>
                        <ToolbarGroup lastChild={true}>
                            <IsAuthenticated>
                                <HeaderAvatar/>
                                <DropDownMenu value='user' onChange={this.onMenuChange} {...styles.dropdownMenu}>
                                    <MenuItem value='user' primaryText={user.data.username}/>
                                    <Divider/>
                                    <MenuItem value='logout' primaryText="Logout"/>
                                </DropDownMenu>
                            </IsAuthenticated>
                            <IsPublic>
                                <HeaderLink label="Login" to={{
                                    pathname: '/login',
                                    query: {
                                        redirect: JSON.stringify({
                                            pathname: location.pathname,
                                            query: location.query
                                        })
                                    }
                                }} matches={[/^\/login\//]}/>
                            </IsPublic>
                        </ToolbarGroup>
                    </Toolbar>
                </div>
            </Paper>
        );
    }

}));
