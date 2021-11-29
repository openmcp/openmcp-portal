import { CircularProgress } from "@material-ui/core";
import { AsyncStorage } from "AsyncStorage";
import React, { Component } from "react";
import WorldMap from "react-svg-worldmap";
import * as utilLog from "../../util/UtLogs.js";
// import './App.css';

class DbWorldMapClusterStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapSize: Math.min(window.innerHeight - 363, window.innerWidth),
      rows: "",
      completed: 0,
    };
  }

  onSizeUp = () => {
    let mapSize = this.state.mapSize;
    this.setState({ mapSize: mapSize + 100 });
  };

  onSizeDown = () => {
    let mapSize = this.state.mapSize;
    this.setState({ mapSize: mapSize - 100 });
  };

  callApi = async () => {
    const response = await fetch(`/apis/dashboard/world_cluster_map`);
    const body = await response.json();
    return body;
  };

  componentWillMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => {
        if (res === null) {
          this.setState({ rows: "" });
        } else {
          this.setState({ rows: res });
        }
        clearInterval(this.timer);
        this.timer = setInterval(this.onRefresh, 5000)
      })
      .catch((err) => console.log(err));
    let userId = null;
    AsyncStorage.getItem("userName", (err, result) => {
      userId = result;
    });

    utilLog.fn_insertPLogs(userId, "log-DS-VW04");
  }
 

  onRefresh = () => {
    this.callApi()
      .then((res) => {
        if(res === null){
          this.setState({ rows: "" });
        } else {
          this.setState({ rows: res });
        }
      })
      .catch((err) => console.log(err));
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  render() {
    // const data = [
    //   { country: "cn", value: 1 }, // china
    //   { country: "in", value: 2 }, // india
    //   { country: "us", value: 3 }, // united states
    //   { country: "id", value: 4 }, // indonesia
    //   { country: "pk", value: 5 }, // pakistan
    //   { country: "br", value: 6 }, // brazil
    //   { country: "ng", value: 7 }, // nigeria
    //   { country: "bd", value: 8 }, // bangladesh
    //   { country: "ru", value: 9 }, // russia
    //   { country: "kr", value: 10 }, // mexico
    // ];
    return (
      <div className="dash-comp">
        {this.state.rows ? (
          <div
            className="content-box"
            style={{ width: this.props.width, display: "inline-block" }}
          >
            <div className="cb-header">
              <span>World Cluster Status</span>
              <div style={{float:"right"}}>
                <button class="btn-worldmap-size" onClick={this.onSizeUp}>
                  +
                </button>
                <button class="btn-worldmap-size" onClick={this.onSizeDown}>
                  -
                </button>
              </div>
            </div>
            <div
              className="cb-body"
              style={{ position: "relative", width: "100%" }}
            >
              <div style={{ textAlign: "center" }}>
                <WorldMap
                  color="#0088fe"
                  // title="Top 10 Populous Countries"
                  value-suffix="people"
                  // size="responsive"
                  size={this.state.mapSize}
                  // frame={true}
                  data={this.state.rows}
                />
              </div>
            </div>
          </div>
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

export default DbWorldMapClusterStatus;
