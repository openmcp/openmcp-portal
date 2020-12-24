import React, { Component } from "react";
import { NavLink, Link, Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";
import { NavigateNext } from '@material-ui/icons';
import ProjectsPolicy from './ProjectsPolicy';
import OpenMCPPolicy from './OpenMCPPolicy';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  // indicator: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   backgroundColor: 'transparent',
  //   '& > span': {
  //     maxWidth: 40,
  //     width: '100%',
  //     backgroundColor: '#635ee7',
  //   },
  // },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>
            {children}
          </Box>
        </Container>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class Policy extends Component {
  state = {
    // rows: "",
    // completed: 0,
    reRender: "",
    value: 0,
    tabHeader: [
      { label: "OMCP Policy", index: 1, param:"openmcp-policy" },
      { label: "Project Policy", index: 2, param:"project-policy" },
    // { label: "DaemonSets", index: 3 },
    ],
  };

  componentWillMount() {
     if(this.props.match.url.indexOf("project") > 0 ){
       this.setState({ value: 1 });
     } else {
      this.setState({ value: 0 });
     }
  }

  render() {
    const handleChange = (event, newValue) => {
      console.log("ddd",newValue)
      this.setState({ value: newValue });
    };
    const { classes } = this.props;
    return (
      <div>
        <div className="content-wrapper full">
          {/* 컨텐츠 헤더 */}
          <section className="content-header">
            <h1>
              Policy
              <small>{this.props.match.params.project}</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <NavLink to="/dashboard">Home</NavLink>
              </li>
              <li>
                <NavigateNext style={{fontSize:12, margin: "-2px 2px", color: "#444"}}/>
                <NavLink to="/settings">Settings</NavLink>
              </li>
              <li className="active">
                <NavigateNext style={{fontSize:12, margin: "-2px 2px", color: "#444"}}/>
                Policy
              </li>
            </ol>
          </section>

          {/* 내용부분 */}
          <section>
            {/* 탭매뉴가 들어간다. */}
            <div className={classes.root}>
              <AppBar position="static" className="app-bar">
                <Tabs
                  value={this.state.value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                  style={{ backgroundColor: "#16586c" }}
                  indicatorColor="primary"
                  // indicator={{backgroundColor:"#ffffff"}}
                  // TabIndicatorProps ={{ ind:"#635ee7"}}
                >
                  {this.state.tabHeader.map((i) => {
                    return (
                    <Tab label={i.label} {...a11yProps(i.index)}
                          component={Link}
                          to={{
                            pathname: `/settings/policy/${i.param}`
                          }}
                    />
                    );
                  })}
                </Tabs>
              </AppBar>
              <TabPanel className="tab-panel" value={this.state.value} index={0}>
                <Switch>
                <Route path="/settings/policy/openmcp-policy"
                    render={({match,location}) => <OpenMCPPolicy  match={match} location={location} menuData={this.onMenuData}/>} >
                  </Route>
                </Switch>
              </TabPanel>
              <TabPanel className="tab-panel" value={this.state.value} index={1}>
               <Switch>
                  <Route path="/settings/policy/project-policy"
                    render={({match,location}) => <ProjectsPolicy  match={match} location={location} menuData={this.onMenuData}/>} >
                  </Route>
                </Switch>
              </TabPanel>
              {/* <TabPanel  className="tab-panel"value={this.state.value} index={2}>
                Item Three
              </TabPanel> */}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Policy);
