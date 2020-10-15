import React, { Component } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./components/common/SignIn";
import SignOut from "./components/common/SignOut";
import Admin from "./components/Admin";
import Head from './components/layout/Head';
import Contents from './components/layout/Contents';
import SideBar from './components/layout/SideBar';
import {withStyles} from '@material-ui/core/styles';
import "./css/style.css";
//로그인 여부를 확인

// const styles = theme => ({
//   wrapper:{
//     height: 'auto',
//     minHeight: '100%',
//     backgroundColor: '#222d32',
//     position: 'relative',
//     overflowX: 'hidden',
//     overflowY: 'auto',
//     boxSizing: 'border-box'
//   }
// })

class App extends Component {
  render() {
    const { classes } = this.props;
    console.log(this.props)

    return (
      //Head 영역 (슬라이드 사이드바, 타티틀, 로그아웃버튼)
      // 슬라이드 사이드바 (Projects, Infrastructure)
      //Left 매뉴 영역
      //Content영역
      //Footer영역
      // <Head></Head>

      <div className="wrapper">
        <Head></Head>
        <Contents></Contents>
        <SideBar></SideBar>
        {/* <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/admin" component={Admin} />
          <Route path="/logout" component={SignOut} />
        </Switch> */}
      </div>
    );
  }
}

export default App;
// export default withStyles(styles)(App);
