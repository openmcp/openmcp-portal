import React, { Component } from "react";
import LeftMenu from "../../../layout/LeftMenu";
import { NavLink } from 'react-router-dom';

class Pj_Workloads extends Component {
  componentWillMount() {
    // console.log("this.props.params", this.props.match.params);
  }
  componentDidMount() {
    // console.log("componentDidMount", this.props.location.state);
  }
  render() {
    console.log("ddddddd", this.props.match.params.project);
    return (
      <div>
        {/* <LeftMenu
          title={this.props.match.params.project}
          createDate={this.props.match.params.project}
        ></LeftMenu> */}
        <div className="content-wrapper">
          {/* 컨텐츠 헤더 */}
          <section className="content-header">
            <h1>
            {this.props.match.params.project}
              <small>Overview</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <NavLink to="/dashboard">Home</NavLink>
              </li>
              <li>
                <NavLink to="/Projects">Projects</NavLink>
              </li>
              <li className="active">Overview</li>
            </ol>
          </section>
          sadfasdf
        </div>
      </div>
    );
  }
}

export default Pj_Workloads;
