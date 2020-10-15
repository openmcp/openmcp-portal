import React, { Component } from "react";
import Head from './components/layout/Head';
import LeftMenu from './components/layout/LeftMenu';
import Contents from './components/layout/Contents';
// import { Route,Switch } from 'react-router-dom';
// import Dashboard from './components/common/Dashboard';
// import Projects from './components/projects/Projects';
// import Clusters from './components/Infrastructure/Clusters';

class Main extends Component {
  state = {
    isLeftMenuOn: true,
    isLogined: true,
  };

  onSelectMenu = (data) => {
    //왼쪽 메뉴의 표시여부를 결정
    this.setState({isLeftMenuOn : Boolean(data)});
  }

  render() {
    return (
      <div className="wrapper">
        <Head onSelectMenu={this.onSelectMenu}></Head>
        {this.state.isLeftMenuOn ? <LeftMenu></LeftMenu> : ""}
        <Contents></Contents>
      </div>
    );
  }
}

export default Main;
