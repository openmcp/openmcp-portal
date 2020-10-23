import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// Top menu contents
import Dashboard from "./../contents/Dashboard";
import Projects from "./../contents/Projects";
import Pods from "./../contents/Pods";
import Clusters from "./../contents/Clusters";
import Storages from "./../contents/Storages";
// Sub menu contents
import Pj_Settings from "../contents/projects/Pj_Settings";
import Pj_Overview from "../contents/projects/Pj_Overview";
import Pj_Workloads from "../contents/projects/resources/Pj_Workloads";
import Pj_Pods from "../contents/projects/resources/Pj_Pods";
import Pj_Services from "../contents/projects/resources/Pj_Services";
import Pj_Ingress from "../contents/projects/resources/Pj_Ingress";
import Pj_Volumes from "../contents/projects/Pj_Volumes";
import Pj_Secrets from "../contents/projects/config/Pj_Secrets";
import Pj_ConfigMaps from "./../contents/projects/config/Pj_ConfigMaps";
import Pj_Config from "../contents/projects/config/Pj_Config";
import LeftMenu from './LeftMenu';

// 선택 매뉴에 따라 Contents를 변경하면서 보여줘야함
// 각 컨텐츠는 Route를 이용해서 전환되도록 해야한다.
class Contents extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuData:"none"
    }
  }

  onMenuData = (data) => {
    this.setState({menuData : data.name});
  }

  render() {
    // if(this.props.path.startsWith('/projects')){
    //   console.log("check!!!");
    //   return <Route exact path="/projects"><Projects /></Route>
    // }


    if (this.props.path === "/") {
      return <Redirect to="/dashboard"></Redirect>;
    } else if(this.props.path === "/dashboard"){
      return (
        <Route exact path="/dashboard"><Dashboard /></Route>
      )
    } else if(this.props.path === "/projects"){
      return (
        <Route exact path="/projects"><Projects /></Route>
      )
    } else if(this.props.path === "/pods"){
      return (
        <Route exact path="/pods" ><Pods /></Route>
          
      )
    } else if(this.props.path === "/clusters"){
      return (
        <Route exact path="/clusters" ><Clusters /></Route>
          
      )
    } else if(this.props.path === "/storages"){
      return (
        <Route exact path="/storages" ><Storages /></Route>
      )
    } else {

    return (
      <div>
        {this.state.menuData === "none" ? "" : <LeftMenu title={this.state.menuData}/>}
        <Switch>
          {/* <Route exact path="/dashboard"><Dashboard classData="content-wrapper"/></Route> */}
          {/* <Route exact path="/projects" component={Projects} /> */}
          {/* <Route exact path="/projects" component={() => <Projects />}/> */}
          {/* <Route exact path="/projects" render={(props) => <Projects />} ></Route> */}
          {/* Switch는 가장 일치하는 주소가 나오면 해당 주소로 설정되기 때문에 짧은 주소를 아래에 써주는방법으로 route해본다 */}
          {/* Projects contents */}
          {/* <Route path="/projects/:project/overview" component={Pj_Overview}></Route> */}
          {/* <Route path="/projects/:project/overview" component={Pj_Overview} /> */}
          {/* <Route path="/projects/:project/overview" component={Pj_Overview} /> */}

          <Route path="/projects/:name/overview" render={({match,location}) => <Pj_Overview  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/projects/:name/resources/workloads" render={({match,location}) => <Pj_Workloads  match={match} location={location}/>} ></Route>
          <Route path="/projects/:name/resources/pods" component={Pj_Pods} />
          <Route
            path="/projects/:project/resources/services"
            component={Pj_Services}
          />
          <Route
            path="/projects/:name/resources/ingress"
            component={Pj_Ingress}
          />
          {/* <Route path="/projects/:project/resources" component={Pj_Resources} /> */}

          <Route path="/projects/:name/volumes" component={Pj_Volumes} />

          <Route
            path="/projects/:name/config/secrets"
            component={Pj_Secrets}
          />
          <Route
            path="/projects/:name/config/configmaps"
            component={Pj_ConfigMaps}
          />
          <Route path="/projects/:name/config" component={Pj_Config} />
name
          <Route
            path="/projects/:name/settings/members"
            component={Pj_Settings}
          />
          <Route path="/projects/:name/settings" component={Pj_Settings} />
          {/* Projects contents END*/}

          {/* Clusters contents */}
          {/* Clusters contents END*/}

          {/* Pods contents */}
          {/* Pods contents END*/}
        </Switch>
      </div>
      );
    }
  }
}

export default Contents;
