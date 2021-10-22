import React, { Component } from "react";
import PcSetLoadbalancingControllerPolicy from "./PcSetLoadbalancingControllerPolicy.js";
import PcSetNumericPolicy from "./PcSetNumericPolicy.js";
import PcSetSelectBoxPolicy from "./PcSetSelectBoxPolicy.js";
import PcSetTextValuePolicy from "./PcSetTextValuePolicy.js";

// function valuetext(value) {
//   return `${value}°C`;
// }

class PcSetOMCPPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policyName : this.props.policyName
    }
  }

  componentWillMount() {
  }
  
  componentDidUpdate(prevProps, prevState) {
    
    if (this.props.policyName !== prevProps.policyName) {
      this.setState({
        ...this.state,
        policyName: this.props.policyName,
      });
    }
  }

  render() {
    const PolicyDialog = () => {
      switch(this.state.policyName){
        case "metric-collector-period":
          return <PcSetTextValuePolicy isFloat= {false} policyName={this.state.policyName} policy={this.props.policy} onUpdateData={this.props.onUpdateData}/>
        case "log-level":
          return <PcSetNumericPolicy max={5} step={1} policyName={this.state.policyName} policy={this.props.policy} onUpdateData={this.props.onUpdateData}/>
        case "loadbalancing-controller-policy":
          return <PcSetLoadbalancingControllerPolicy policyName={this.state.policyName} policy={this.props.policy} onUpdateData={this.props.onUpdateData}/>
        case "analytic-metrics-weight":
          return <PcSetNumericPolicy max={1} step={0.1} policyName={this.state.policyName} policy={this.props.policy} onUpdateData={this.props.onUpdateData}/>
        default : //hpa-minmax-distribution-mode
         return <PcSetSelectBoxPolicy isFloat= {false} policyName={this.state.policyName} policy={this.props.policy} onUpdateData={this.props.onUpdateData}/>

      }
    }
    return (
      <div>
        <PolicyDialog/>
      </div>
    );
  }
}

export default PcSetOMCPPolicy;
