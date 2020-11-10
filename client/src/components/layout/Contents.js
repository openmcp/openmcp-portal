import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// Top menu contents
import Dashboard from "./../contents/Dashboard";
import Projects from "./../contents/Projects";
import Pods from "./../contents/Pods";
import Clusters from "./../contents/Clusters";
import Storages from "./../contents/Storages";

import LeftMenu from './LeftMenu';
import Nodes from './../contents/Nodes';

// Sub menu contents
import Pj_Overview from "../contents/projects/Pj_Overview";
import Pj_Workloads from "../contents/projects/resources/Pj_Workloads";
import Pj_Pods from "../contents/projects/resources/Pj_Pods";
import Pj_Services from "../contents/projects/resources/Pj_Services";
import Pj_Ingress from "../contents/projects/resources/Pj_Ingress";
import Pj_Volumes from "../contents/projects/Pj_Volumes";
import Pj_Secrets from "../contents/projects/config/Pj_Secrets";
import Pj_ConfigMaps from "./../contents/projects/config/Pj_ConfigMaps";
// import Pj_Config from "../contents/projects/config/Pj_Config";

import Cs_Overview from "../contents/clusters/Cs_Overview";
import Cs_Nodes from "../contents/clusters/Cs_Nodes";
import Cs_NodeDetail from './../contents/clusters/Cs_NodeDetail';
import Cs_Pods from "../contents/clusters/Cs_Pods";
import Cs_PodDetail from './../contents/clusters/Cs_PodDetail';
import Cs_StorageClass from "../contents/clusters/Cs_StorageClass";
import Cs_StorageClassDetail from './../contents/clusters/Cs_StorageClassDetail';
import Nd_NodeDetail from './../contents/nodes/Nd_NodeDetail';
import Pd_PodDetail from './../contents/pods/Pd_PodDetail';
import Pj_PodDetail from './../contents/projects/resources/Pj_PodDetail';
import Pj_ServicesDetail from './../contents/projects/resources/Pj_ServicesDetail';
import Pj_IngressDetail from './../contents/projects/resources/Pj_IngressDetail';
import Pj_VolumeDetail from './../contents/projects/Pj_VolumeDetail';
import Pj_SecretDetail from './../contents/projects/config/Pj_SecretDetail';
import Pj_ConfigMapDetail from './../contents/projects/config/Pj_ConfigMapDetail';
import Pj_Members from './../contents/projects/settings/Pj_Members';
import Members from './../contents/settings/Members';





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
    // console.log("content", data)
    this.setState({menuData : data});
  }

  render() {
    // if(this.props.path.startsWith('/projects')){
    //   console.log("check!!!");
    //   return <Route exact path="/projects"><Projects /></Route>
    // }

    // console.log("content onMenuData : ",this.state.menuData); 
    if (this.props.path === "/") {
      return <Redirect to="/dashboard"></Redirect>;
    } else if(this.props.path === "/dashboard"){
      return (
        <Route exact path="/dashboard"><Dashboard /></Route>
      )
    } else if(this.props.path === "/clusters"){
      return (
        <Route exact path="/clusters" ><Clusters /></Route>
      )
    } else if(this.props.path === "/nodes"){
      return (
        <Route exact path="/nodes" ><Nodes /></Route>
      )
    } else if(this.props.path === "/projects"){
      return (
        <Route exact path="/projects"><Projects /></Route>
      )
    } else if(this.props.path === "/pods"){
      return (
        <Route exact path="/pods" ><Pods /></Route>
          
      )
    } else if(this.props.path === "/storages"){
      return (
        <Route exact path="/storages" ><Storages /></Route>
      )
    } else {
      console.log("contents last", this.state.menuData);
    return (
      <div>
        {
          this.state.menuData === "none" ? "" : 
          <LeftMenu 
            title={this.state.menuData.title} 
            menu={this.state.menuData.menu}
          />
        }

        <Switch>

          {/* Clusters contents */}
          <Route path="/clusters/:cluster/overview" 
            render={({match,location}) => <Cs_Overview  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/clusters/:cluster/nodes/:node" 
            render={({match,location}) => <Cs_NodeDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters/:cluster/nodes" 
            render={({match,location}) => <Cs_Nodes  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters/:cluster/pods/:pod" 
            render={({match,location}) => <Cs_PodDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters/:cluster/pods" 
            render={({match,location}) => <Cs_Pods  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters/:cluster/storage_class/:storage_class" 
            render={({match,location}) => <Cs_StorageClassDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters/:cluster/storage_class" 
            render={({match,location}) => <Cs_StorageClass  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          {/* <Route path="/clusters/:name/settings/" component={Pj_Settings} />
          <Redirect from="/clusters/:name/settings" to="/projects/:name/settings/members" /> */}
          {/* Clusters contents END*/}



          {/* Projects contents */}
          <Route path="/projects/:project/overview" 
            render={({match,location}) => <Pj_Overview  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          {/* 
              <Route path="/projects/:project/resources/workloads/deployments/:deployment" 
                render={({match,location}) => <Pjw_DeploymentDetail  match={match} location={location} menuData={this.onMenuData}/>} >
              </Route>
              <Route path="/projects/:project/resources/workloads/deployments/:deployment/pods/:pod" 
                render={({match,location}) => <Pjw_Deployment_PodDetail  match={match} location={location} menuData={this.onMenuData}/>} >
              </Route>
              <Route path="/projects/:project/resources/workloads/deployments/:deployment/containers/:container" 
                  render={({match,location}) => <Pjw_Deployment_ContainerDetail  match={match} location={location} menuData={this.onMenuData}/>} >
              </Route> 
          */}
          <Route path="/projects/:project/resources/workloads/statefulsets" 
            render={({match,location}) => <Pj_Workloads  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/workloads/deployments/:deployment" 
            render={({match,location}) => <Pj_Workloads  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/workloads/deployments" 
            render={({match,location}) => <Pj_Workloads  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Redirect exact from="/projects/:project/resources/workloads" to="/projects/:project/resources/workloads/deployments" />


          <Route path="/projects/:project/resources/pods/:pod" 
            render={({match,location}) => <Pj_PodDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/pods" 
            render={({match,location}) => <Pj_Pods  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/services/:service" 
            render={({match,location}) => <Pj_ServicesDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/services" 
            render={({match,location}) => <Pj_Services  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/ingress/:ingress" 
            render={({match,location}) => <Pj_IngressDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/ingress" 
            render={({match,location}) => <Pj_Ingress  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Redirect from="/projects/:project/resources" to="/projects/:project/resources/workloads" />
         
          <Route path="/projects/:project/volumes/:volume" 
            render={({match,location}) => <Pj_VolumeDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/volumes" 
            render={({match,location}) => <Pj_Volumes  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          
          <Route path="/projects/:project/config/secrets/:secret" 
            render={({match,location}) => <Pj_SecretDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/config/secrets" 
            render={({match,location}) => <Pj_Secrets  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/config/config_maps/:config_map" 
            render={({match,location}) => <Pj_ConfigMapDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/config/config_maps" 
            render={({match,location}) => <Pj_ConfigMaps  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Redirect from="/projects/:project/config" to="/projects/:project/config/secrets" />

          <Route path="/projects/:project/settings/members" 
            render={({match,location}) => <Pj_Members  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Redirect from="/projects/:project/settings" to="/projects/:project/settings/members" />
          {/* Projects contents END*/}


          {/* Nodes contents */}
            <Route path="/nodes/:node"
              render={({match,location}) => <Nd_NodeDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          {/* Nodes contents END*/}
          

          {/* Pods contents */}
          <Route path="/pods/:pod"
              render={({match,location}) => <Pd_PodDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          {/* Pods contents END*/}

          {/* Settings contents */}
          <Route path="/settings/members" 
            render={({match,location}) => <Members  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          {/* Settings contents END*/}
        </Switch>
          
      </div>
      );
    }
  }
}

export default Contents;
