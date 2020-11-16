import React, { Component } from "react";
import { Settings } from "@material-ui/icons";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Link, NavLink } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import * as utilLog from './../util/UtLogs.js';


class Head extends Component {
  constructor(props){
    super(props);
    this.state = {
      // anchorEl:null,
      open:false,
      
    }
    this.anchorRef = React.createRef();
    this.prevOpen = React.createRef(this.state.open);
  }
  
  onLogout = (e) => {
    const userId = sessionStorage.getItem("userName");
    utilLog.fn_insertPLogs(userId, 'log-LG-LG02');

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("roles");
  }
 
  handleToggle = () => {
    this.setState({open:!this.prevOpen.current})
  };

  handleClose = (event) => {
    this.setState({open:false});
  };

  componentDidUpdate(){
  }

  render() {

    const handleListKeyDown = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        this.setState({open:false});
      }
    }

    const userName = sessionStorage.getItem("userName");
    return (
      <header className="main-header">
        <NavLink to="/dashboard" className="logo">
          <span className="logo-lg">
            <b>OpenMCP</b>
          </span>
        </NavLink>

        <nav className="navbar navbar-static-top">
          <div className="top-menu navbar-left">
            <NavLink to="/dashboard" activeClassName="active">
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/clusters" activeClassName="active" >
              <span>Clusters</span>
            </NavLink>
            <NavLink to="/nodes" activeClassName="active" >
              <span>Nodes</span>
            </NavLink>
            <NavLink to="/projects" activeClassName="active" >
              <span>Projects</span>
            </NavLink>
            <NavLink to="/pods" activeClassName="active" >
              <span>Pods</span>
            </NavLink>
          </div>

          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown user user-menu">
                {/* <Link to="/login" className="dropdown-toggle" data-toggle="dropdown" onClick={this.onLogout}> */}
                <div ref={this.anchorRef}
                      aria-controls={this.state.open ? 'menu-account' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleToggle}>
                  <AccountCircleIcon></AccountCircleIcon>
                  <span className="hidden-xs">{userName}</span>
                </div>
                <Popper style={{minWidth:"150px"}} open={this.state.open} anchorEl={this.anchorRef.current} role={undefined} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                          <MenuList 
                            // autoFocusItem={this.state.open}
                            id="menu-account"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={this.handleClose}>
                              <Link to="/login" className="dropdown-toggle" data-toggle="dropdown" onClick={this.onLogout}>
                                Logout
                              </Link>
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
                {/* </Link> */}
              </li>
              <li className="dropdown user user-menu">
                <Link to="/settings/accounts" data-toggle="dropdown">
                  <div style={{ fontSize: 20}}>
                    <Settings></Settings>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Head;
