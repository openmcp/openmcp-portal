import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineDashboard, AiFillDashboard, AiOutlineDeploymentUnit, AiOutlineUser, AiFillAlert, AiOutlineSetting, AiOutlineAreaChart} from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { GrBundle } from "react-icons/gr";
import { FaBuffer} from "react-icons/fa";
import { CgServer } from "react-icons/cg";
import { FiBox } from "react-icons/fi";
import { BiNetworkChart, BiDollarCircle } from "react-icons/bi";
import { HiOutlineDuplicate,HiOutlineCamera } from "react-icons/hi";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { IoKeyOutline } from "react-icons/io5";
import { SiGraphql } from "react-icons/si";
import { AsyncStorage } from "AsyncStorage";





class LeftMenu2 extends Component {
  // constructor(props) {
  //   super(props);

  //   // this.state = {
  //   //   params: this.props.menu,
  //   // };
  // }

  // shouldComponentUpdate(prevProps, prevState) {
  //   if (
  //     this.props.menu !== prevProps.menu ||
  //     this.props.title !== prevProps.title
  //   ) {
  //     return true;
  //   } else {
  //     if (
  //       this.props.pathParams.hasOwnProperty("searchString") &&
  //       this.props.pathParams.searchString !== prevProps.pathParams.searchString
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   }
  // }

  componentWillMount(){
  }

  render() {
    const menuList = [
      {
        type: "multi",
        role: "all",
        title: "Monitor",
        path: "/dashboard",
        icon : <AiFillDashboard className="leftMenu-main-icon"/>,
        sub: [
          {
            role: "all",
            title: "Dashboard",
            path: "/dashboard",
            icon : <RiDashboardFill className="leftMenu-sub-icon"/>,
          },
          {
            role: "all",
            title: "Multiple Metrics", //수집정보
            path: "/multiple-metrics",
            icon : <AiOutlineDashboard className="leftMenu-sub-icon"/>,
          },
        ],
      },
      {
        type: "multi",
        role: "all",
        title: "Multiple Clusters",
        path: "/clusters",
        icon : <GrBundle className="leftMenu-main-icon"/>,
        sub: [
          {
            role: "all",
            title: "Clusters",
            path: "/clusters/joined",
            icon : <FaBuffer className="leftMenu-sub-icon"/>,
          },
          {
            role: "all",
            title: "Nodes",
            path: "/nodes",
            icon : <CgServer className="leftMenu-sub-icon"/>,
          },
          
        ],
      },
      {
        type: "multi",
        role: "all",
        title: "Workloads",
        path: "/projects",
        icon : <HiOutlineDuplicate className="leftMenu-main-icon"/>,
        sub: [
          {
            role: "all",
            title: "Projects",
            path: "/projects",
            icon : <HiOutlineDuplicate className="leftMenu-sub-icon"/>,
          },
          {
            role: "all",
            title: "Deployments",
            path: "/deployments",
            icon : <AiOutlineDeploymentUnit className="leftMenu-sub-icon"/>,
          },
          {
            role: "all",
            title: "Pods",
            path: "/pods",
            icon : <FiBox className="leftMenu-sub-icon"/>,
          },
          {
            role: "all",
            title: "Network",
            path: "/network",
            icon : <BiNetworkChart className="leftMenu-sub-icon"/>,
          },
        ],
      },
      {
        type: "multi",
        role: "all",
        title: "Motions",
        path: "/motions/Migrations",
        icon : <AiFillDashboard className="leftMenu-main-icon"/>,
        sub: [
          {
            role: "all",
            title: "Migrations",
            path: "/motions/migration",
            icon : <RiInboxUnarchiveLine className="leftMenu-sub-icon"/>,
          },
          {
            role: "all",
            title: "Snapshots",
            path: "/motions/snapshot",
            icon : <HiOutlineCamera className="leftMenu-sub-icon"/>,
          },
        ],
      },
      {
        type: "multi",
        role: "all",
        title: "Settings",
        path: "/settings",
        icon : <AiFillDashboard className="leftMenu-main-icon"/>,
        sub: [
          {
            role: "admin",
            title: "Accounts",
            path: "/settings/accounts",
            icon : <AiOutlineUser className="leftMenu-sub-icon"/>,
          },
          {
            role: "admin",
            title: "Group Role",
            path: "/settings/group-role",
            icon : <SiGraphql className="leftMenu-sub-icon"/>,
          },
          {
            role: "admin",
            title: "Policy",
            path: "/settings/policy",
            icon : <IoKeyOutline className="leftMenu-sub-icon"/>,
          },
          {
            role: "all",
            title: "Alert",
            path: "/settings/alert",
            icon : <AiFillAlert className="leftMenu-sub-icon"/>,
          },
          {
            role: "admin",
            title: "Meterings", //미터링
            path: "/settings/metering",
            icon : <AiOutlineAreaChart className="leftMenu-sub-icon"/>,
          },
          {
            role: "all",
            title: "Billing", //빌링
            path: "/settings/billing",
            icon : <BiDollarCircle className="leftMenu-sub-icon"/>,
          },
          {
            role: "admin",
            title: "Config",
            path: "/settings/config",
            icon : <AiOutlineSetting className="leftMenu-sub-icon"/>,
          },
        ],
      },
    ];
    const lists = [];

    let role;
    AsyncStorage.getItem("roles", (err, result) => {
      role = result;
    });
    
    menuList.forEach((item) => {
      if(role === 'admin'){
        lists.push(
          <li className="treeview left-main-menu">
            <div className="sidebar-main-title">
              
              <span>{item.title}</span>
            </div>
            <ul className="treeview-menu sidebar-sub-title">
              {item.sub.map((subItem) => {
                return (
                  <li>
                    <NavLink
                      to={{
                        pathname: `${subItem.path}`,
                      }}
                      activeClassName="active"
                    >
                      {subItem.icon}
                      <span>{subItem.title}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      } else {
        if(item.role !== 'admin'){
          lists.push(
            <li className="treeview left-main-menu">
              <div className="sidebar-main-title">
                
                <span>{item.title}</span>
              </div>
              <ul className="treeview-menu sidebar-sub-title">
                {item.sub.map((subItem) => {
                  if(subItem.role !== 'admin'){
                  return (
                    <li>
                      <NavLink
                        to={{
                          pathname: `${subItem.path}`,
                        }}
                        activeClassName="active"
                      >
                        {subItem.icon}
                        <span>{subItem.title}</span>
                      </NavLink>
                    </li>
                  );}
                })}
              </ul>
            </li>
          );
        }
      }
    });
    // console.log("this.props.title", this.props.title)
    return (
      <div>
        <aside className="main-sidebar">
          <section className="sidebar">
            <ul className="sidebar-menu tree" data-widget="tree">
              {lists}
            </ul>
          </section>
        </aside>
      </div>
    );
  }
}

export default LeftMenu2;
