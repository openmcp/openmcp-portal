import React, { Component } from "react";
import Head from "./components/layout/Head";
import LeftMenu from "./components/layout/LeftMenu";
import Contents from "./components/layout/Contents";
import { Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }

    this.state = {
      isLeftMenuOn: true,
      isLogined: true,
      loggedIn,
    };
  }

  onSelectMenu = (data) => {
    //왼쪽 메뉴의 표시여부를 결정
    this.setState({ isLeftMenuOn: Boolean(data) });
    //컨텐츠 영역 확장되도록 수정
  };
  
  // onStage = () => {
  //   console.log("onStage");
  //   if (this.state.loggedIn) {
  //     console.log("login");
  //     return <SignIn></SignIn>;
  //   } else {
  //     console.log("not login");
  //     if (this.state.isLeftMenuOn) {
  //       return [
  //         <Head onSelectMenu={this.onSelectMenu} />,
  //         <LeftMenu />,
  //         <Contents />,
  //       ];
  //     }
  //     return [<Head onSelectMenu={this.onSelectMenu} />, <Contents />];
  //   }
  // };
  // componentDidMount(){
  //   console.log(this.props.location.pathname);
  //   if(this.props.location.pathname === "/"){
  //     console.log("true");
  //     return <Redirect to="/dashboard"></Redirect>;
  //   }
  // }
  
  render() {
    if (!this.state.loggedIn) {
      console.log("Main", this.state.loggedIn);
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <div className="wrapper">
        <Head onSelectMenu={this.onSelectMenu} />
        {this.state.isLeftMenuOn ? <LeftMenu /> : ""}
        <Contents path={this.props.location.pathname}/>
      </div>
    );
  }
}

export default Main;
