import { CircularProgress, Paper } from "@material-ui/core";
import { AsyncStorage } from "AsyncStorage";
import React, { Component } from "react";
import MetricPieChart from "../module/MetricPieChart";
import * as utilLog from "./../../../util/UtLogs.js";

class MetricCluster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: "",
    };
  }

  callApi = async () => {
    const response = await fetch(
      `/apis/metric/clusterState?cluster=${this.props.cluster}`
    );
    const body = await response.json();
    return body;
  };

  onApiExcute = () => {
    this.callApi()
      .then((res) => {
        if (res === null) {
          this.setState({ row: {} });
        } else {
          this.setState({
            row: res,
          });
        }
      })
      .catch((err) => console.log(err));

    // let userId = null;
    // AsyncStorage.getItem("userName",(err, result) => {
    //   userId= result;
    // })
    // utilLog.fn_insertPLogs(userId, 'log-MM-CM01');
  };

  componentDidMount() {
    this.onApiExcute();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cluster !== prevProps.cluster) {
      this.onApiExcute();
    }
  }

  render() {
    const angle = {
      full: {
        startAngle: 0,
        endAngle: 360,
      },
      half: {
        startAngle: 180,
        endAngle: 0,
      },
    };

    // const colors = ["#0088FE", "#ecf0f5"];
    const colors = [
      // "#00C49F",
      "#0088FE",
      "#ff8042",
      // "#FFBB28",
      "#cccccc",
      // "#00C49F",
      // "#FFBB28",
      // "#00C49F",
      // "#FFBB28",
    ];

    return (
      <div className="m-area cluster-metric">
        {this.state.row ? (
          [
            <div className="m-area-header">
              <span>Cluster Metric</span>
              {/* <span>{this.props.cluster}</span> */}
            </div>,
            <div className="m-area-body">
              <div className="m-single-info-area">
                <div className="m-content">
                  <div className="m-c-header">
                    <span>deployment</span>
                  </div>
                  <div className="m-c-body">
                    <span>{this.state.row.workloadState.deployment}</span>
                  </div>
                </div>
                <div className="m-content">
                  <div className="m-c-header">
                    <span>replicaset</span>
                  </div>
                  <div className="m-c-body">
                    <span>{this.state.row.workloadState.replicaset}</span>
                  </div>
                </div>
                <div className="m-content">
                  <div className="m-c-header">
                    <span>statefulset</span>
                  </div>
                  <div className="m-c-body">
                    <span>{this.state.row.workloadState.statefulset}</span>
                  </div>
                </div>
                <div className="m-content">
                  <div className="m-c-header">
                    <span>service</span>
                  </div>
                  <div className="m-c-body">
                    <span>{this.state.row.serviceState.service}</span>
                  </div>
                </div>
                <div className="m-content">
                  <div className="m-c-header">
                    <span>endpoint</span>
                  </div>
                  <div className="m-c-body">
                    <span>{this.state.row.serviceState.endpoint}</span>
                  </div>
                </div>
              </div>

              <div className="m-pie-area">
                <div className="m-content">
                  <div className="m-c-header">
                    <span>node state</span>
                  </div>
                  <div className="m-c-body">
                    {this.state.row.nodeState.hasOwnProperty("status") ? (
                      <MetricPieChart
                        data={this.state.row.nodeState}
                        angle={angle.full}
                        colors={colors}
                        unit=""
                      />
                    ) : (
                      <div style={{textAlign:"center", fontWeight:"bold", fontSize:"50px", paddingTop:"43px"}}>-</div>
                    )}
                  </div>
                </div>
                <div className="m-content">
                  <div className="m-c-header">
                    <span>pod state</span>
                  </div>
                  <div className="m-c-body">
                    {this.state.row.podState.hasOwnProperty("status") ? (
                      <MetricPieChart
                        data={this.state.row.podState}
                        angle={angle.full}
                        colors={colors}
                        unit=""
                      />
                    ) : (
                      <div style={{textAlign:"center", fontWeight:"bold", fontSize:"50px", paddingTop:"43px"}}>-</div>
                    )}
                  </div>
                </div>
              </div>
            </div>,
          ]
        ) : (
          <CircularProgress
            variant="determinate"
            value={this.state.completed}
            style={{ position: "absolute", left: "50%", marginTop: "20px" }}
          ></CircularProgress>
        )}
      </div>
    );
  }
}

export default MetricCluster;
