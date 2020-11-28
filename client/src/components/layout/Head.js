import React, { Component } from "react";
import { Settings } from "@material-ui/icons";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Link } from 'react-router-dom';
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
      selectedMenu : "dashboard"
      
    }
    this.anchorRef = React.createRef();
    this.prevOpen = React.createRef(this.state.open);
  }

  componentWillMount(){
    var menu = window.location.pathname
    console.log(menu)
    if (menu.indexOf('dashboard') >= 0 ){
      this.setState({selectedMenu:'dashboard'})
    } else if (menu.indexOf('clusters') >= 0 ) {
      this.setState({selectedMenu:'clusters'})
    } else if (menu.indexOf('nodes') >= 0 ) {
      this.setState({selectedMenu:'nodes'})
    } else if (menu.indexOf('projects') >= 0 ) {
      this.setState({selectedMenu:'projects'})
    } else if (menu.indexOf('deployments') >= 0 ) {
      this.setState({selectedMenu:'deployments'})
    } else if (menu.indexOf('pods') >= 0 ) {
        this.setState({selectedMenu:'pods'})
      } else if (menu.indexOf('network') >= 0 ) {
        this.setState({selectedMenu:'network'})
    } else if (menu.indexOf('settings') >= 0 ){
      this.setState({selectedMenu:'settings'})
    }
  }
  
  onLogout = (e) => {
    const userId = localStorage.getItem("userName");
    utilLog.fn_insertPLogs(userId, 'log-LG-LG02');

    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("roles");
  }
 
  handleToggle = () => {
    this.setState({open:!this.prevOpen.current})
  };

  handleClose = (event) => {
    this.setState({open:false});
  };

  onSelectMenu = (e) => {
    this.setState({selectedMenu : e.currentTarget.id});
  };

  onClick = (e) => {
    e.preventDefault()
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

    const userName = localStorage.getItem("userName");
    return (
      <header className="main-header">
        <Link to="/dashboard" className="logo">
          <span className="logo-lg">
            <b>OpenMCP</b>
          </span>
        </Link>

        <nav className="navbar navbar-static-top">
          <div className="top-menu navbar-left">
            <div className={"main-menu " + this.state.selectedMenu} id="dashboard" onClick={this.onSelectMenu}>
                <Link to="/dashboard" activeClassName="active">Dashboard</Link>
            </div>
            <div className={"main-menu " + this.state.selectedMenu} id="clusters" onClick={this.onSelectMenu}>
              <Link to="/clusters" activeClassName="active" >Clusters</Link>
              <div className="sub-menu clusters">
                <Link to="/clusters"  onClick={this.onSelectMenu}>Joined</Link>
                <Link to="/clusters-joinable"  onClick={this.onSelectMenu}>Joinable</Link>
              </div>
            </div>
            <div className={"main-menu " + this.state.selectedMenu} id="nodes" onClick={this.onSelectMenu}>
              <Link to="/nodes" activeClassName="active" >Nodes</Link>
            </div>
            
            <div className={"main-menu " + this.state.selectedMenu} id="projects" onClick={this.onSelectMenu}>
              <Link to="/projects" activeClassName="active" >Projects</Link>
            </div>
            <div className={"main-menu " + this.state.selectedMenu} id="deployments" onClick={this.onSelectMenu}>
              <Link to="/deployments" activeClassName="active" >Deployments</Link>
            </div>
            <div className={"main-menu " + this.state.selectedMenu} id="pods" onClick={this.onSelectMenu}>
              <Link to="/pods"  onClick={this.onSelectMenu}>Pods</Link>
              <div className="sub-menu pods">
                <Link to="/pods"  onClick={this.onSelectMenu}>Pod Info</Link>
                <Link to="/pods-hpa"  onClick={this.onSelectMenu}>HPA</Link>
                <Link to="/pods-vpa"  onClick={this.onSelectMenu} >VPA</Link>
              </div>
            </div>
            <div className={"main-menu " + this.state.selectedMenu} id="network" onClick={this.onSelectMenu}>
              <Link to="/dns"  onClick={this.onSelectMenu}>Network</Link>
              <div className="sub-menu network">
                <Link to="/dns"  onClick={this.onSelectMenu}>DNS</Link>
                <Link to="/services"  onClick={this.onSelectMenu}>Services</Link>
                <Link to="/ingress"  onClick={this.onSelectMenu} >Ingress</Link>
              </div>
            </div>
          </div>

          <div className="top-menu navbar-right">
            <div className={"main-menu " + this.state.selectedMenu} id="accounts" style={{position: "relative",
    textAlign: "left"}}>
              <Link to="/dns"  onClick={this.onClick}>
                <AccountCircleIcon/><div style={{position: "absolute", display: "inline-block", right: "15px", top: "18px"}}>{userName}</div>
              </Link>
              <div className="sub-menu accounts" >
                <Link to="/login"  onClick={this.onLogout}>Logout</Link>
              </div>
            </div>

            <div className={"main-menu " + this.state.selectedMenu} id="settings" onClick={this. onSelectMenu}>
              <Link to="/settings/accounts" onClick={this.onSelectMenu}>
                <div style={{ fontSize: 20}}><Settings></Settings></div>
              </Link>
              <div className="sub-menu settings">
                <Link to="/settings/accounts" onClick={this.onSelectMenu}>Accounts</Link>
                <Link to="/settings/policy" onClick={this.onSelectMenu}>Policy</Link>
              </div>
            </div>
          </div>
          {/* <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown user user-menu">
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
                        <ClickAwayListener mouseEvent='onMouseUp' onClickAway={this.handleClose}>
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
              </li>
              <li className="dropdown user user-menu">
                <Link to="/settings/accounts" data-toggle="dropdown" id="settings" onClick={this.onSelectMenu}>
                  <div style={{ fontSize: 20}}>
                    <Settings></Settings>
                  </div>
                </Link>
              </li>
            </ul>
          </div> */}
        </nav>
      </header>
    );
  }
}

export default Head;
