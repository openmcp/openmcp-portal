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
import PjOverview from "../contents/projects/PjOverview";
import PjWorkloads from "../contents/projects/resources/PjWorkloads";
import PjPods from "../contents/projects/resources/PjPods";
import PjServices from "../contents/projects/resources/PjServices";
import PjIngress from "../contents/projects/resources/PjIngress";
import PjVolumes from "../contents/projects/PjVolumes";
import PjSecrets from "../contents/projects/config/PjSecrets";
import PjConfigMaps from "./../contents/projects/config/PjConfigMaps";

import CsOverview from "../contents/clusters/CsOverview";
import CsNodes from "../contents/clusters/CsNodes";
import CsNodeDetail from './../contents/clusters/CsNodeDetail';
import CsPods from "../contents/clusters/CsPods";
import CsPodDetail from './../contents/clusters/CsPodDetail';
import CsStorageClass from "../contents/clusters/CsStorageClass";
import CsStorageClassDetail from './../contents/clusters/CsStorageClassDetail';
import NdNodeDetail from './../contents/nodes/NdNodeDetail';
import PdPodDetail from './../contents/pods/PdPodDetail';
import PjPodDetail from './../contents/projects/resources/PjPodDetail';
import PjServicesDetail from './../contents/projects/resources/PjServicesDetail';
import PjIngressDetail from './../contents/projects/resources/PjIngressDetail';
import PjVolumeDetail from './../contents/projects/PjVolumeDetail';
import PjSecretDetail from './../contents/projects/config/PjSecretDetail';
import PjConfigMapDetail from './../contents/projects/config/PjConfigMapDetail';
import PjMembers from './../contents/projects/settings/PjMembers';
import Accounts from './../contents/settings/Accounts';





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
            render={({match,location}) => <CsOverview  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/clusters/:cluster/nodes/:node" 
            render={({match,location}) => <CsNodeDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters/:cluster/nodes" 
            render={({match,location}) => <CsNodes  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters/:cluster/pods/:pod" 
            render={({match,location}) => <CsPodDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters/:cluster/pods" 
            render={({match,location}) => <CsPods  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters/:cluster/storage_class/:storage_class" 
            render={({match,location}) => <CsStorageClassDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters/:cluster/storage_class" 
            render={({match,location}) => <CsStorageClass  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          {/* <Route path="/clusters/:name/settings/" component={PjSettings} />
          <Redirect from="/clusters/:name/settings" to="/projects/:name/settings/members" /> */}
          {/* Clusters contents END*/}



          {/* Projects contents */}
          <Route path="/projects/:project/overview" 
            render={({match,location}) => <PjOverview  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          {/* 
              <Route path="/projects/:project/resources/workloads/deployments/:deployment" 
                render={({match,location}) => <PjwDeploymentDetail  match={match} location={location} menuData={this.onMenuData}/>} >
              </Route>
              <Route path="/projects/:project/resources/workloads/deployments/:deployment/pods/:pod" 
                render={({match,location}) => <PjwDeployment_PodDetail  match={match} location={location} menuData={this.onMenuData}/>} >
              </Route>
              <Route path="/projects/:project/resources/workloads/deployments/:deployment/containers/:container" 
                  render={({match,location}) => <PjwDeployment_ContainerDetail  match={match} location={location} menuData={this.onMenuData}/>} >
              </Route> 
          */}
          <Route path="/projects/:project/resources/workloads/statefulsets" 
            render={({match,location}) => <PjWorkloads  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/workloads/deployments/:deployment" 
            render={({match,location}) => <PjWorkloads  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/workloads/deployments" 
            render={({match,location}) => <PjWorkloads  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Redirect exact from="/projects/:project/resources/workloads" to="/projects/:project/resources/workloads/deployments" />


          <Route path="/projects/:project/resources/pods/:pod" 
            render={({match,location}) => <PjPodDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/pods" 
            render={({match,location}) => <PjPods  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/services/:service" 
            render={({match,location}) => <PjServicesDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/services" 
            render={({match,location}) => <PjServices  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/ingress/:ingress" 
            render={({match,location}) => <PjIngressDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/ingress" 
            render={({match,location}) => <PjIngress  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Redirect from="/projects/:project/resources" to="/projects/:project/resources/workloads" />
         
          <Route path="/projects/:project/volumes/:volume" 
            render={({match,location}) => <PjVolumeDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/volumes" 
            render={({match,location}) => <PjVolumes  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          
          <Route path="/projects/:project/config/secrets/:secret" 
            render={({match,location}) => <PjSecretDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/config/secrets" 
            render={({match,location}) => <PjSecrets  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/config/config_maps/:config_map" 
            render={({match,location}) => <PjConfigMapDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/config/config_maps" 
            render={({match,location}) => <PjConfigMaps  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Redirect from="/projects/:project/config" to="/projects/:project/config/secrets" />

          <Route path="/projects/:project/settings/members" 
            render={({match,location}) => <PjMembers  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Redirect from="/projects/:project/settings" to="/projects/:project/settings/members" />
          {/* Projects contents END*/}


          {/* Nodes contents */}
            <Route path="/nodes/:node"
              render={({match,location}) => <NdNodeDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          {/* Nodes contents END*/}
          

          {/* Pods contents */}
          <Route path="/pods/:pod"
              render={({match,location}) => <PdPodDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          {/* Pods contents END*/}

          {/* Settings contents */}
          <Route path="/settings/accounts" 
            render={({match,location}) => <Accounts  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          {/* Settings contents END*/}
        </Switch>
          
      </div>
      );
    }
  }
}

export default Contents;
