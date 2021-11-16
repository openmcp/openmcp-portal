import React, { Component } from "react";
import DbClusterTopology from "./DbClusterTopology";
import DbOmcp from "./DbOmcp";
import DbRegionGroup from "./DbRegionGroup";
import DbServiceRegionTopology from "./DbServiceRegionTopology";
import DbServiceTopology from "./DbServiceTopology";
import DbStatus from "./DbStatus";
import DbWorldMapClusterStatus from "./DbWorldMapClusterStatus";

class CustomDynamicView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myComponentList: this.props.myComponentList,
      components : []
    };
  }

  componentWillUpdate(prevProps, prevState) {
    if (this.props.myComponentList !== prevProps.myComponentList) {
      var componentsTag = [];
      prevProps.myComponentList.forEach((item) => {
        switch (item) {
          case "System Status":
            componentsTag.push(<DbStatus />);
            break;
          case "Cluster Regions":
            componentsTag.push(<DbRegionGroup />);
            break;
          case "World Cluster Status":
            componentsTag.push(<DbWorldMapClusterStatus />);
            break;
          case "Management Clusters":
            componentsTag.push(<DbOmcp />);
            break;
          case "Cluster Topology":
            componentsTag.push(<DbClusterTopology />);
            break;
          case "Service Topology":
            componentsTag.push(<DbServiceTopology />);
            break;
          case "Service-Region Topology":
            componentsTag.push(<DbServiceRegionTopology />);
            break;
        }
      });
  
      this.setState({components : componentsTag});
    }
  }

  componentWillMount() {
    var componentsTag = [];
    this.state.myComponentList.forEach((item) => {
      switch (item) {
        case "System Status":
          componentsTag.push(<DbStatus />);
          break;
        case "Cluster Regions":
          componentsTag.push(<DbRegionGroup />);
          break;
        case "World Cluster Status":
          componentsTag.push(<DbWorldMapClusterStatus />);
          break;
        case "Management Clusters":
          componentsTag.push(<DbOmcp />);
          break;
        case "Cluster Topology":
          componentsTag.push(<DbClusterTopology />);
          break;
        case "Service Topology":
          componentsTag.push(<DbServiceTopology />);
          break;
        case "Service-Region Topology":
          componentsTag.push(<DbServiceRegionTopology />);
          break;
      }
    });

    this.setState({components : componentsTag});
  }

  render() {
    return (
      <div>
       {this.state.components}
      </div>
    );
  }
}

export default CustomDynamicView;
