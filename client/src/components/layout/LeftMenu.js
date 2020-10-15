// 각 컨텐츠의 왼쪽 고정 매뉴바
import React, { Component } from "react";
import "../../css/style.css";
import {ArrowBackIos} from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

//Projects일때
// var menu = {
//   Overview : "Overview",
//   Resources : ["Workloads", "Pods", "Services", "Ingress"],
//   Volumes : "Volumes",
//   Config : ["Secrets", "ConfigMaps"],
//   Settings : "Members",
// }
// 
class LeftMenuProject extends Component{
  constructor(props){
    super(props);

    this.state = {
      projectName : "project02", //프로젝트에 다라서 수정되야함
      createDate : "2020-10-10"
    }
  }
  render(){
    console.log("LeftMenuProject");
    return(
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
            </div>
            <div className="pull-left info">
              <p>{this.state.projectName}</p>
              <a href="/">{this.state.createDate}</a>
            </div>
          </div>
          
          <ul className="sidebar-menu tree" data-widget="tree">
            <li className="header">Projects</li>
            <li className="" >
              <NavLink to={"/projects/"+this.state.projectName+"/overview"} activeClassName="active">
                <i className="fa fa-dashboard"></i> <span>Overview</span>
              </NavLink>
            </li>
            <li className="treeview">
              <NavLink to={"/projects/"+this.state.projectName+"/resources"} activeClassName="active">
                <i className="fa fa-dashboard"></i> <span>Resources</span>
                <span className="pull-right-container">
                  <ArrowBackIos style={{fontSize:14}}/>
                </span>
              </NavLink>
              <ul className="treeview-menu">
                <li>
                  <NavLink to={"/projects/"+this.state.projectName+"/resources/workloads"} activeClassName="active">
                    <i className="fa fa-circle-o"></i> <span>Workloads</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/projects/"+this.state.projectName+"/resources/pods"} activeClassName="active">
                    <i className="fa fa-circle-o"></i> <span>Pods</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to={"/projects/"+this.state.projectName+"/resources/services"} activeClassName="active">
                    <i className="fa fa-circle-o"></i> <span>Services</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/projects/"+this.state.projectName+"/resources/Ingress"} activeClassName="active">
                    <i className="fa fa-circle-o"></i> <span>Ingress</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="">
              <NavLink to={"/projects/"+this.state.projectName+"/volumes"} activeClassName="active">
                <i className="fa fa-dashboard"></i> <span>Volumes</span>
              </NavLink>
            </li>
            <li className="treeview">
              <NavLink to={"/projects/"+this.state.projectName+"/config"} activeClassName="active">
                <i className="fa fa-plus"></i> <span>Config</span>
                <span className="pull-right-container">
                  <ArrowBackIos style={{fontSize:14}}/>
                </span>
              </NavLink>
              <ul className="treeview-menu">
                <li>
                  <NavLink to={"/projects/"+this.state.projectName+"/config/secrets"} activeClassName="active">
                    <i className="fa fa-circle-o"></i> <span>Secrets</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/projects/"+this.state.projectName+"/config/configmaps"} activeClassName="active">
                    <i className="fa fa-circle-o"></i> <span>ConfigMaps</span>
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="treeview">
              <NavLink to={"/projects/"+this.state.projectName+"/settings"} activeClassName="active">
                <i className="fa fa-cog"></i> <span>Settings</span>
                <span className="pull-right-container">
                  <ArrowBackIos style={{fontSize:14}}/>
                </span>
              </NavLink>
              <ul className="treeview-menu">
                <li>
                  <NavLink to={"/projects/"+this.state.projectName+"/settings/members"} activeClassName="active">
                    <i className="fa fa-circle-o"></i> <span>Members</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </aside>
    )
  }
}

//Clusters일때
// var menu = {
//   Overview : "Overview",
//   Nodes : "Nodes",
//   Pods : "Pods",
//   Storage Class : "Storage Class",
//   Settings : "Settings",
// }
//
class LeftMenuClusters extends Component{
  render(){
    return(
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
            </div>
            <div className="pull-left info">
              <p>cluster_01</p>
              <a href="/">
                <i className="fa fa-circle text-success"></i> 2020-10-10
              </a>
            </div>
          </div>
          
          <ul className="sidebar-menu tree" data-widget="tree">
            <li className="header">Clusters</li>
            <li className="">
              <a href="/dashboard/">
                <i className="fa fa-dashboard"></i> <span>Overview</span>
              </a>
            </li>
            <li className="">
              <a href="/dashboard/">
                <i className="fa fa-dashboard"></i> <span>Nodes</span>
              </a>
            </li>
            <li className="">
              <a href="/dashboard/">
                <i className="fa fa-dashboard"></i> <span>Pods</span>
              </a>
            </li>
            <li className="">
              <a href="/dashboard/">
                <i className="fa fa-dashboard"></i> <span>Storage Class</span>
              </a>
            </li>
            <li className="active treeview">
              <a href="/dashboard/">
                <i className="fa fa-dashboard"></i> <span>Settings</span>
                <span className="pull-right-container">
                  <ArrowBackIos style={{fontSize:14}}/>
                </span>
              </a>
              <ul className="treeview-menu">
                <li>
                  <a href="/admin/setting/basic">
                    <i className="fa fa-circle-o"></i> <span>Settings</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </aside>
    )
  }
}


//Storages일때
// var menu = {
//   Overview : "Overview",
// }

class LeftMenu extends Component {
  render() {
    return (
      <LeftMenuProject></LeftMenuProject>
      //<LeftMenuClusters></LeftMenuClusters>
    );
  }
}

export default LeftMenu;
