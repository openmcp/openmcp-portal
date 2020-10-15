import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./../common/Dashboard";
import Projects from './../projects/Projects';
import Clusters from './../Infrastructure/Clusters';
import Storages from './../Infrastructure/Storages';
import Overview from './../projects/Overview';
import Config from './../projects/Conifg';
import Resources from './../projects/Resources';
import Pods from './../projects/resources/Pods';
import Workloads from './../projects/resources/Workloads';
import Services from './../projects/resources/Services';
import Ingress from './../projects/resources/Ingress';
import Volumes from './../projects/Volumes';
import Secrets from './../projects/config/Secrets';
import ConfigMaps from './../projects/config/ConfigMaps';
import Settings from './../projects/Settings';

// 선택 매뉴에 따라 Contents를 변경하면서 보여줘야함
// 각 컨텐츠는 Route를 이용해서 전환되도록 해야한다.
class Contents extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/clusters" component={Clusters} />
          <Route exact path="/storages" component={Storages} />

          <Route path="/projects/:project/overview" component={Overview}/>

          {/* Switch는 가장 일치하는 주소가 나오면 해당 주소로 설정되기 때문에 짧은 주소를 아래에 써주는방법으로 route해본다 */}
          <Route path="/projects/:project/resources/workloads" component={Workloads}/>
          <Route path="/projects/:project/resources/pods" component={Pods}/>
          <Route path="/projects/:project/resources/services" component={Services}/>
          <Route path="/projects/:project/resources/ingress" component={Ingress}/>
          <Route path="/projects/:project/resources" component={Resources}/>

          <Route path="/projects/:project/volumes" component={Volumes}/>
          
          <Route path="/projects/:project/config/secrets" component={Secrets}/>
          <Route path="/projects/:project/config/configmaps" component={ConfigMaps}/>
          <Route path="/projects/:project/config" component={Config}/>

          <Route path="/projects/:project/settings/members" component={Settings}/>
          <Route path="/projects/:project/settings" component={Settings}/>
        </Switch>
      </div>
    );
  }
}

export default Contents;
