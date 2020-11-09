import React, { Component } from "react";
import "../../css/style.css";
import { Settings } from "@material-ui/icons";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// import styled from "styled-components";
// import oc from "open-color";
import { Link, NavLink } from 'react-router-dom';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import Fade from '@material-ui/core/Fade';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import  Button  from '@material-ui/core/Button';


// const Mainheader = styled.div`
// /* 레이아웃 */
//     display: flex;
//     position: fixed;
//     align-items: center;
//     justify-content: center;
//     height: 60px;
//     width: 100%;
//     top: 0px;
//     z-index: 5;

//     /* 색상 */
//     background: ${oc.indigo[6]};
//     color: white;
//     border-bottom: 1px solid ${oc.indigo[7]};
//     box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);

//     /* 폰트 */
//     font-size: 2.5rem;
// `;

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
  // onSelectTopMenu = (e) => {
  //   this.props.onSelectMenu(false,"");
  // };

  // onSelectLeftMenu = (e) => {
  //   this.props.onSelectMenu(true,"");
  // };

  // const userName = sessionStorage.getItem("username");
  // componentWillMount(){
  //   userName = 
  // }

  // handleClick = (event) => {
  //   console.log("handleclick", event, event.currentTarget)
  //   this.setState({anchorEl : event.currentTarget});
  // };

  // handleClose = () => {
  //   this.setState({anchorEl : null});
  // };
  
  onLogout = (e) => {
    // debugger;
    // localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  }

  // useStyles = makeStyles((theme) => ({
  //   root: {
  //     display: 'flex',
  //   },
  //   paper: {
  //     marginRight: theme.spacing(2),
  //   },
  // }));

  // classes = this.useStyles();
  
  // [open, setOpen] = React.useState(false);
  // anchorRef = React.useRef(null);

  handleToggle = () => {
    // setOpen((prevOpen) => !prevOpen);
    this.setState({open:!this.prevOpen.current})
  };

  handleClose = (event) => {
    // if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
    //   return;
    // }

    this.setState({open:false});
  };

  componentDidUpdate(){
    // if (this.prevOpen.current === true && this.state.open === false) {
    //   this.anchorRef.current.focus();
    // }

    // this.prevOpen.current = this.state.open;
  }

  render() {

    const handleListKeyDown = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        this.setState({open:false});
      }
    }

  // return focus to the button when we transitioned from !open -> open
    // const prevOpen = React.useRef(this.setopen);
    // React.useEffect(() => {
    //   if (prevOpen.current === true && open === false) {
    //     anchorRef.current.focus();
    //   }

    //   prevOpen.current = open;
    // }, [open]);





    const userName = sessionStorage.getItem("userName");
    // console.log(sessionStorage.getItem("userName"));
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
          {/* <a
            href="/"
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
          >
          </a> */}

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
                {/* <a href="/" className="dropdown-toggle" data-toggle="dropdown"> */}
                  {/* <span className="hidden-xs">설정아이콘</span> */}
                {/* <Settings style={{ fontSize: 20 }} 
                          ref={this.anchorRef}
                          aria-controls={this.state.open ? 'menu-list-grow' : undefined}
                          aria-haspopup="true"
                          onClick={this.handleToggle}></Settings> */}
                {/* </a> */}
                {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                  Open Menu
                </Button> */}
                {/* <Button
                ref={this.anchorRef}
                aria-controls={this.state.open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}
              >
                Toggle Menu Grow
              </Button> */}
              <Link to="/settings/members" data-toggle="dropdown">
              <div style={{ fontSize: 20}} 
                            // ref={this.anchorRef}
                            // aria-controls={this.state.open ? 'menu-settings' : 'menu-settings'}
                            // aria-haspopup="true"
                            // onClick={this.handleToggle}
                            >

                
                
                  <Settings
                // component={Link}
                // to={{
                //   pathname: `/settings/members`,
                //   // state: {
                //   //   data : row
                //   // }
                // }}
                ></Settings>
               
              </div>
              </Link>
               {/* <Popper placement="bottom-end" open={this.state.open} anchorEl={this.anchorRef.current} role={undefined} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                          <MenuList autoFocusItem={this.state.open} id="menu-settings" onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper> */}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Head;
