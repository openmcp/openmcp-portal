import React, { Component } from "react";
import PieReChart from "./../modules/PieReChart";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from 'react-router-dom';
import PieHalfReChart from './../modules/PieHalfReChart';
import { NavigateNext} from '@material-ui/icons';
import TreeView from './../modules/TreeView';
import RefreshButton from './../modules/RefreshButton';





class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: "",
      completed: 0,
      reRender: "",
    };
  }
  componentDidMount() {
    //데이터가 들어오기 전까지 프로그래스바를 보여준다.
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => {
        this.setState({ rows: res });
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch(`/dashboard`);
    const body = await response.json();
    return body;
  };

  onRefresh = () => {
    this.callApi()
      .then((res) => {
        this.setState({ rows: res });
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };
  angle = {
    full : {
      startAngle : 0,
      endAngle : 360
    },
    half : {
      startAngle : 0,
      endAngle : 180
    }  
  }
  render() {
    // let classNam = 'content-wrapper';
    // console.log(this.state.rows);
    
    return (
      <div className="content-wrapper full">
        {/* 컨텐츠 헤더 */}
        <section className="content-header">
          <h1>
            Dashboard
            <small></small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <a href="/dashboard/">
                <i className="fa fa-dashboard"></i> Home
              </a>
            </li>
            <li className="active">
              <NavigateNext style={{fontSize:12, margin: "-2px 2px", color: "#444"}}/>
              Dashboard
            </li>
          </ol>
        </section>

        {/* 컨텐츠 내용 */}
        
        <section className="content" style={{ minWidth: 1160 }}>
          {this.state.rows ? (
            [
              <div style={{ display: "flex" }}>
                <DashboardCard_1
                  title="Clusters"
                  width="25%"
                  data={this.state.rows.clusters}
                  path="/clusters"
                  angle={this.angle.full}
                ></DashboardCard_1>
                <DashboardCard_1
                  title="Nodes"
                  width="25%"
                  data={this.state.rows.nodes}
                  path="/nodes"
                  angle={this.angle.full}
                ></DashboardCard_1>
                <DashboardCard_1
                  title="Pods"
                  width="25%"
                  data={this.state.rows.pods}
                  path="/pods"
                  angle={this.angle.full}
                ></DashboardCard_1>
                <DashboardCard_1
                  title="Projects"
                  width="25%"
                  data={this.state.rows.projects}
                  path="/projects"
                  angle={this.angle.full}
                ></DashboardCard_1>
              </div>,
              <div style={{ display: "flex" }}>
                <DashboardCard_3
                  title="Region-Clusters"
                  width="100%"
                  data={this.state.rows.regions}
                ></DashboardCard_3>
                {/* <DashboardCard_2
                  title="Resources"
                  width="67.777%"
                  data={this.state.rows.resources}
                  angle={this.angle.half}
                ></DashboardCard_2> */}
                
              </div>,
            ]
          ) : (
            <CircularProgress
              variant="determinate"
              value={this.state.completed}
              style={{ position: "absolute", left: "50%", marginTop: "20px" }}
            ></CircularProgress>
          )}
          
        </section>
        <RefreshButton onClick={this.onRefresh}></RefreshButton>
        {/* <input type="button" value="refresh" onClick={this.onRefresh} /> */}
      </div>
    );
  }
}

class DashboardCard_1 extends Component {
  render() {
    // console.log("DashboardCard_1:", this.state.rows);
    const colors = [
      "#0088FE",
      "#00C49F",
      "#FFBB28",
      "#FF8042",
      "#00C49F",
      "#FFBB28",
      "#00C49F",
      "#FFBB28",
    ];
    return (
      <div className="content-box" style={{ width: this.props.width }}>
        <div className="cb-header">
          <span>{this.props.title}</span>
          <span> : {this.props.data.counts}</span>
          <div className="cb-btn">
            <Link to={this.props.path}>detail</Link>
          </div>
        </div>
        <div
          className="cb-body"
          style={{ position: "relative", width: "100%" }}
        >
          <PieReChart data={this.props.data} angle={this.props.angle} colors={colors} unit=""></PieReChart>
        </div>
      </div>
    );
  }
}

class DashboardCard_2 extends Component {
  render() {
    // console.log("BasicInfo:", this.props.data)

    return (
      <div className="content-box" style={{ width: this.props.width }}>
      <div className="cb-header">
        <span>{this.props.title}</span>
        {/* <div className="cb-btn">
          <Link to={this.props.path}>detail</Link>
        </div> */}
      </div>
      <div
        className="cb-body"
        style={{ position: "relative", width: "100%", display:"flex"}}
      >
        <PieHalfReChart data={this.props.data.cpu} angle={this.props.angle}></PieHalfReChart>
        <PieHalfReChart data={this.props.data.memory} angle={this.props.angle}></PieHalfReChart>
        <PieHalfReChart data={this.props.data.storage} angle={this.props.angle}></PieHalfReChart>
      </div>
    </div>
    );
  }
}


class DashboardCard_3 extends Component {
  render() {
    // console.log("BasicInfo:", this.props.data)

    return (
      <div className="content-box" style={{ width: this.props.width }}>
      <div className="cb-header">
        <span>{this.props.title}</span>
        {/* <div className="cb-btn">
          <Link to={this.props.path}>detail</Link>
        </div> */}
      </div>
      <div
        className="cb-body"
        style={{ position: "relative", width: "100%", display:"flex"}}
      >
        <TreeView data={this.props.data}/>
      </div>
    </div>
    );
  }
}

export default Dashboard;
