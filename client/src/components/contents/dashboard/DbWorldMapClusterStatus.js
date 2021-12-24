import { CircularProgress } from "@material-ui/core";
import { AsyncStorage } from "AsyncStorage";
import React, { Component } from "react";
import WorldMap from "react-svg-worldmap";
import * as utilLog from "../../util/UtLogs.js";
import { withTranslation } from 'react-i18next';
// import './App.css';

class DbWorldMapClusterStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapSize: Math.min(window.innerHeight - 363, window.innerWidth),
      rows: "",
      loadErr:"",
      completed: 0,
      refreshCycle: 5000,
    };
  }

  componentWillMount() {
    let cycle = 5000;
    AsyncStorage.getItem("dashboard-cycle", (err, result) => {
      cycle = result * 1000;
    });

    this.setState({
      refreshCycle: cycle,
    });
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
    let g_clusters;
    AsyncStorage.getItem("g_clusters", (err, result) => {
      g_clusters = result.split(",");
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ g_clusters: g_clusters }),
    };

    const response = await fetch(
      `/apis/dashboard/world_cluster_map`,
      requestOptions
    );
    const body = await response.json();
    return body;
  };

  componentDidMount() {
    this.timer2 = setInterval(this.onRefresh, this.state.refreshCycle);
    this.timer = setInterval(this.progress, 20);
    this.onRefresh();

    let userId = null;
    AsyncStorage.getItem("userName", (err, result) => {
      userId = result;
    });

    utilLog.fn_insertPLogs(userId, "log-DS-VW04");
  }

  onRefresh = () => {
    const {t} = this.props;
    this.callApi()
      .then((res) => {
        if (res === null) {
          this.setState({ rows: "" });
        } else {
          if (res.hasOwnProperty("errno")) {
            if (res.code === "ECONNREFUSED") {
              clearInterval(this.timer2);
              this.setState({loadErr : t("dashboard.connectionFailed")})
            }

            this.setState({ rows: "" });
          } else {
            this.setState({ rows: res });
          }
        }
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
  };

  componentWillUnmount() {
    clearInterval(this.timer2);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const {t} = this.props;
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
        <div
          className="content-box"
          style={{ width: this.props.width, display: "inline-block" }}
        >
          <div className="cb-header">
            <span>{t("dashboard.worldClusterMap.title")}</span>
            <div style={{ float: "right" }}>
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
            style={{ position: "relative", width: "100%"}}
          >
            {this.state.rows ? (
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
            ) : (
              <div  style={{
                position:"relative",
                margin: "20px 10px 10px",
                textAlign:"center",
              }}>
              {this.state.loadErr ? 
                <div>{this.state.loadErr}</div>
                :
              <CircularProgress
                variant="determinate"
                value={this.state.completed}
               
              ></CircularProgress>}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(DbWorldMapClusterStatus); 

