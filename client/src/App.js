import React, { Component } from "react";
import "./css/style.css";
import SignIn from "./components/common/SignIn";
import Main from './Main';
import { Switch, Route } from "react-router-dom";
// import Head from "./components/layout/Head";
// import Contents from "./components/layout/Contents";
// import LeftMenu from "./components/layout/LeftMenu";
// import {withStyles} from '@material-ui/core/styles';
// import { Link, Switch, Route, Redirect } from "react-router-dom";
// import SignOut from "./components/common/SignOut";
// import Admin from "./components/Admin";

class App extends Component {
  render() {
    return (
      <Main></Main>
      // <Switch>
        // <Route exact path="/" component={SignIn} />
        // <Route path="/dashboard" component={Main} />
      // </Switch>
    );
  }
}

export default App;
