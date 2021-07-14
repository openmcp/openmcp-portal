import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// Top menu contents
import LeftMenu from './LeftMenu';

import Dashboard from "./../contents/Dashboard";
import Projects from "./../contents/projects/Projects";
import Pods from "../contents/pods/Pods";
import HPA from '../contents/pods/HPA';
import VPA from '../contents/pods/VPA';
import ClustersJoinable from "../contents/clusters/ClustersJoinable";
import ClustersJoined from "../contents/clusters/ClustersJoined";
import Storages from "./../contents/Storages";

import Nodes from './../contents/nodes/Nodes';
import Deployments from '../contents/deployments/Deployments';

import DNS from '../contents/netowork/DNS';
import Ingress from '../contents/netowork/Ingress';
import Services from '../contents/netowork/Services';

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
import Policy from './../contents/settings/Policy';
// import PjwDeploymentDetail from './../contents/projects/resources/PjwDeploymentDetail';
import DeploymentDetail from './../contents/deployments/DeploymentDetail';
import ServicesDetail from './../contents/netowork/ServicesDetail';
import IngressDetail from './../contents/netowork/IngressDetail';
import DNSDetail from './../contents/netowork/DNSDetail';
import Config from "../contents/settings/config/Config";
import GroupRole from './../contents/settings/GroupRole';

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
    this.setState({menuData : data});
  }

  render() {
    return (
      <div>
        {
          this.state.menuData === "none" ? "" : 
          <LeftMenu 
            title={this.state.menuData.title} 
            menu={this.state.menuData.menu}
            pathParams={this.state.menuData.pathParams}
            state={this.state.menuData.state}
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
          <Route path="/clusters-joinable/:cluster/overview" 
            render={({match,location}) => <CsOverview  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/clusters-joinable/:cluster/nodes/:node" 
            render={({match,location}) => <CsNodeDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters-joinable/:cluster/nodes" 
            render={({match,location}) => <CsNodes  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters-joinable/:cluster/pods/:pod" 
            render={({match,location}) => <CsPodDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters-joinable/:cluster/pods" 
            render={({match,location}) => <CsPods  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters-joinable/:cluster/storage_class/:storage_class" 
            render={({match,location}) => <CsStorageClassDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/clusters-joinable/:cluster/storage_class" 
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
          <Route path="/projects/:project/resources/workloads/statefulsets/:statefulset" 
            render={({match,location}) => <PjWorkloads  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/workloads/deployments" 
            render={({match,location}) => <PjWorkloads  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/projects/:project/resources/workloads/deployments/:deployment" 
            render={({match,location}) => <PjWorkloads  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route exact path="/projects/:project/resources/workloads"
            render={({match,location}) => <Redirect to={{
              pathname : `/projects/${match.params.project}/resources/workloads/deployments`,
              search :location.search
            }}  />} >
          </Route>
          {/* <Redirect exact 
            from="/projects/:project/resources/workloads" 
            to={{
              pathname : "/projects/:project/resources/workloads/deployments",
              search : "cluster"
            }} 
          /> */}


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
          <Route exact path="/projects/:project/resources"
            render={({match,location}) => <Redirect to={{
              pathname : `/projects/${match.params.project}/resources/workloads/deployments`,
              search :location.search
            }}  />} >
          </Route>

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
          {/* <Redirect 
            from="/projects/:project/config" 
            to="/projects/:project/config/secrets" /> */}
          <Route exact path="/projects/:project/config"
            render={({match,location}) => <Redirect to={{
              pathname : `/projects/${match.params.project}/config/secrets`,
              search :location.search
            }}  />} >
          </Route>

          <Route path="/projects/:project/settings/members" 
            render={({match,location}) => <PjMembers  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          {/* <Redirect 
            from="/projects/:project/settings" 
            to="/projects/:project/settings/members" /> */}
          <Route exact path="/projects/:project/settings"
            render={({match,location}) => <Redirect to={{
              pathname : `/projects/${match.params.project}/settings/members`,
              search :location.search
            }}  />} >
          </Route>
          {/* Projects contents END*/}

          {/* Deployments contents */}
          <Route path="/deployments/:deployment"
              render={({match,location}) => <DeploymentDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          {/* Deployments contents END*/}

          {/* Services contents */}
          <Route path="/network/services/:service"
              render={({match,location}) => <ServicesDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          {/* Services contents END*/}

          {/* Ingress contents */}
          <Route path="/network/ingress/:ingress"
              render={({match,location}) => <IngressDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          {/* Ingress contents END*/}

          {/* Dns contents */}
          <Route path="/network/dns/:dns"
              render={({match,location}) => <DNSDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          {/* Dns contents END*/}

          {/* Nodes contents */}
          <Route path="/nodes/:node" 
            render={({match,location}) => <NdNodeDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          {/* Nodes contents END*/}

          {/* Pods contents */}
          <Route path="/pods/:pod"
              render={({match,location}) => <PdPodDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          {/* <Route path="/vpa/:vpa"
              render={({match,location}) => <PdPodDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route>
          <Route path="/hpa/:hpa"
              render={({match,location}) => <PdPodDetail  match={match} location={location} menuData={this.onMenuData}/>} ></Route> */}
          {/* Pods contents END*/}

          {/* Settings contents */}
          <Route exact path="/settings/accounts" 
            render={({match,location}) => <Accounts  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>

          <Route path="/settings/group-role" 
            render={({match,location}) => <GroupRole  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          
          <Route exact path="/settings/policy"
            render={({match,location}) => <Redirect to={{
              pathname : `/settings/policy/openmcp-policy`,
            }}  />} >
          </Route>
          
          <Route path="/settings/policy/openmcp-policy"
            render={({match,location}) => <Policy  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/settings/policy/project-policy"
            render={({match,location}) => <Policy  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route exact path="/settings/policy"
            render={({match,location}) => <Redirect to={{
              pathname : `/settings/policy/openmcp-policy`,
            }}  />} >
          </Route>
          
          <Route path="/settings/config/public-cloud/eks"
            render={({match,location}) => <Config  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/settings/config/public-cloud/gke"
            render={({match,location}) => <Config  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/settings/config/public-cloud/aks"
            render={({match,location}) => <Config  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/settings/config/public-cloud/kvm"
            render={({match,location}) => <Config  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route exact path="/settings/config/public-cloud"
            render={({match,location}) => <Redirect to={{
              pathname : `/settings/config/public-cloud/eks`,
            }}  />} >
          </Route>
          <Route exact path="/settings/config"
            render={({match,location}) => <Redirect to={{
              pathname : `/settings/config/public-cloud/eks`,
            }}  />} >
          </Route>
          <Redirect 
            from="/settings" 
            to="/settings/accounts" />
          {/* Settings contents END*/}

          <Route exact path="/"><Dashboard menuData={this.onMenuData}/></Route>
          <Route exact path="/dashboard"><Dashboard menuData={this.onMenuData}/></Route>
          <Route exact path="/clusters" ><ClustersJoined menuData={this.onMenuData}/></Route>
          <Route exact path="/clusters-joinable" ><ClustersJoinable menuData={this.onMenuData}/></Route>
          <Route exact path="/nodes" ><Nodes menuData={this.onMenuData}/></Route>
          <Route exact path="/projects"><Projects menuData={this.onMenuData}/></Route>
          <Route exact path="/deployments" ><Deployments menuData={this.onMenuData}/></Route>
          <Route exact path="/pods" ><Pods menuData={this.onMenuData}/></Route>
          <Route exact path="/pods-hpa" ><HPA menuData={this.onMenuData}/></Route>
          <Route exact path="/pods-vpa" ><VPA menuData={this.onMenuData}/></Route>
          <Route exact path="/network/services" ><Services menuData={this.onMenuData}/></Route>
          <Route exact path="/network/ingress" ><Ingress menuData={this.onMenuData}/></Route>
          <Route exact path="/network/dns" ><DNS menuData={this.onMenuData}/></Route>
          <Route exact path="/storages" ><Storages menuData={this.onMenuData}/></Route>
          <Route exact path="/storages" ><Storages menuData={this.onMenuData}/></Route>
        </Switch>
          
      </div>
      );
    }
}

export default Contents;
