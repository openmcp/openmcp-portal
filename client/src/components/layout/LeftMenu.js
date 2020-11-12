import React, { Component } from "react";
// import {ArrowBackIos, NavigateNext} from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import * as fnMenuList from './LeftMenuData.js';
// import NavigateNextIcon from '@material-ui/icons/NavigateNext';

class LeftMenu extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      params : this.props.menu,
    }
  }


  shouldComponentUpdate(prevProps, prevState) {
    if (this.props.menu !== prevProps.menu || this.props.title !== prevProps.title) {
       return true;
    } else {
      return false;
    }
  }

  render() {
    const menuList = fnMenuList.getMenu(this.props.title);
    const lists = [];
    menuList[this.props.menu].map((item) => {
      if(item.type === "single"){
        lists.push(
          <li className="" >
            <NavLink to={item.path} activeClassName="active">
              <i className="fa fa-dashboard"></i>
              <span>{item.title}</span>
            </NavLink>
          </li>
        )
      } else {
        lists.push(
          <li className="treeview">
            <NavLink to={item.path} activeClassName="active">
              <i className="fa fa-dashboard"></i>
              <span>{item.title}</span>
              <span className="pull-right-container">
              </span>
            </NavLink>

            <ul className="treeview-menu">
              {
                item.sub.map((subItem)=>{
                  return(
                    <li>
                      <NavLink to={subItem.path} activeClassName="active">
                        <i className="fa fa-circle-o"></i> <span>{subItem.title}</span>
                      </NavLink>
                    </li>
                  );
                })
              }
            </ul>
          </li>
        )
      }
    });
    console.log("this.props.title", this.props.title)
    return (
      <div>
        {this.props.title !== undefined ? 
        <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
            </div>
            <div className="pull-left info">
              <p>{this.props.title}</p>
              {/* <a href="/">{this.state.createDate}</a> */}
            </div>
          </div>
          
          <ul className="sidebar-menu tree" data-widget="tree">
            {lists}
          </ul>
        </section>
      </aside>
         : ""}
      </div>
    );
  }
}

export default LeftMenu;
