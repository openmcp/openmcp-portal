import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { NavLink } from "react-router-dom";
import { NavigateNext } from "@material-ui/icons";
import { AiOutlineUser } from "react-icons/ai";
import { CircularProgress } from "@material-ui/core";
import { AsyncStorage } from "AsyncStorage";
import MetricSelectBox from "../metrics/module/MetricSelectBox";
import { withTranslation } from "react-i18next";

class LoadBalancer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cluster: "",
      selectBoxData: "",
      completed: 0,
    };
  }

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

    const response = await fetch(`/apis/metric/clusterlist`, requestOptions);
    const body = await response.json();
    return body;
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => {
        if (res !== null) {
          let selectBoxData = [];
          res.forEach((item) => {
            selectBoxData.push({ name: item, value: item });
          });

          this.setState({
            cluster: res[0],
            selectBoxData: selectBoxData,
          });
        }
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { t } = this.props;
    const onSelectBoxChange = (data) => {
      this.setState({ cluster: data });
    };

    return (
      <div className="sub-content-wrapper fulled">
        <section className="content">
          <Paper>
            {this.state.selectBoxData
              ? [
                  <div style={{ padding: "10px 15px 0px 15px" }}>
                    <MetricSelectBox
                      rows={this.state.selectBoxData}
                      onSelectBoxChange={onSelectBoxChange}
                      defaultValue=""
                    ></MetricSelectBox>
                  </div>,
                  <div className="iframe-ti">
                    <Paper className="iframe-paper">
                      <div className="iframe-rel">
                        {/* {this.state.selectBoxData ? (
                          <CircularProgress
                            variant="determinate"
                            value={this.state.completed}
                            style={{
                              position: "absolute",
                              left: "50%",
                              marginTop: "20px",
                            }}
                          ></CircularProgress>
                        ) : null} */}
                        <IframeModule cluster={this.state.cluster} t={t} />
                      </div>
                    </Paper>
                  </div>,
                ]
              : null}
          </Paper>
        </section>
      </div>
    );
  }
}

class IframeModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      visibility: "hidden",
      completed: 0,
    };
  }

  //http://34.146.191.162:20001

  componentWillMount() {
    this.onApiExcute();
  }

  callApi = async () => {
    const response = await fetch(
      `/apis/network/loadbalancer?clusterName=${this.props.cluster}`
    );
    const body = await response.json();
    return body;
  };

  onApiExcute = () => {
    this.progressTimer = setInterval(this.progress, 20);
    this.iframeTimer = setInterval(this.showIframe, 3000);
    // if (this.props.cluster === "cluster01") {
    //   this.setState({
    //     url: "http://34.146.191.162:20001",
    //   });
    // } else {
    //   this.setState({
    //     url: "http://13.86.153.192:20001",
    //   });
    // }

    this.callApi()
      .then((res) => {
        if (res !== null) {
          let url = "";
          // url= "http://13.86.153.192:20001";
          if (res.ip !== "-" && res.port !== 0) {
            url = `http://${res.ip}:${res.port}`;
          }

          this.setState({
            url: url,
          });
        }
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cluster !== prevProps.cluster) {
      this.setState({
        visibility: "hidden",
      });
      this.onApiExcute();
    }
  }

  showIframe = () => {
    this.setState({ visibility: "visible" });
    clearInterval(this.iframeTimer);
    clearInterval(this.progressTimer);
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const t = this.props.t;
    return (
      <div>
        {this.state.url === "" ? (
          <div
            style={{
              position: "absolute",
              textAlign: "center",
              top: "68px",
              margin: "auto",
              left: "0",
              right: "0",
              visibility: `${this.state.visibility}`,
            }}
          >
            {t("network.loadbalancer.msg.noneData")}
          </div>
        ) : null}
        <div
          className="iframe-abs"
          style={{ visibility: `${this.state.visibility}` }}
        >
          {this.state.url !== "" ? (
            <iframe src={this.state.url} scrolling="no" />
          ) : null}
        </div>
        {this.state.visibility === "hidden" ? (
          <CircularProgress
            variant="determinate"
            value={this.state.completed}
            style={{
              position: "absolute",
              left: "50%",
              marginTop: "20px",
            }}
          ></CircularProgress>
        ) : null}
      </div>
    );
  }
}

export default withTranslation()(LoadBalancer);
