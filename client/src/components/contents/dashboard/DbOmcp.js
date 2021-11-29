import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import TreeView from '../../modules/TreeView';
import * as utilLog from '../../util/UtLogs.js';
import { AsyncStorage } from 'AsyncStorage';

class DbOmcp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: "",
      completed: 0,
      reRender: "",
      masterCluster: "",
      componentList: []
    };
  }

  componentWillMount() {
  }
  
  componentDidMount() {
    //데이터가 들어오기 전까지 프로그래스바를 보여준다.
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => {
        if(res === null){
          this.setState({ rows: "" });
        } else {
          console.log(res)
          this.setState({ rows: res });
        }
        clearInterval(this.timer);
        this.timer = setInterval(this.onRefresh, 5000)
      })
      .catch((err) => console.log(err));
    
    let userId = null;
    AsyncStorage.getItem("userName",(err, result) => { 
      userId = result;
    });
    
    utilLog.fn_insertPLogs(userId, 'log-DS-VW03');
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  callApi = async () => {
    const response = await fetch(`/apis/dashboard/omcp`);
    const body = await response.json();
    return body;
  };

  

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
    return (
      <div className="dash-comp">
        {/* 컨텐츠 내용 */}
          {this.state.rows ? (
            [
              <div style={{ display: "flex" }}>
                <DashboardCard03
                  title="Management Clusters"
                  // width="100%"
                  data={this.state.rows.joined_clusters}
                  // width="472px"
                  // data={this.state.masterCluster}
                ></DashboardCard03>
              </div>
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

class DashboardCard03 extends Component {
  render() {
    return (
      <div className="content-box" style={{ width: this.props.width }}>
      {/* <div className="cb-header" onClick={this.onRefresh} style={{paddingTop: "140px", fontSize:"24px"}}> */}
      <div className="cb-header" onClick={this.onRefresh}>
        <span style={{cursor:"pointer"}} >{this.props.title}</span>
        {/* <div className="cb-btn">
          <Link to={this.props.path}>detail</Link>
        </div> */}
      </div>
      <div
        className="cb-body"
        style={{ position: "relative", width: "100%", display:"flex"}}
        >
          <TreeView data={this.props.data}/>
          {/* <TreeView data=[{this.props.data}]/> */}
        {/* {this.state.rows ? (
        <TreeView data={this.state.rows}/>
        ) : (
          <CircularProgress
            variant="determinate"
            value={this.state.completed}
            style={{ position: "absolute", left: "50%", marginTop: "20px" }}
          ></CircularProgress>
        )} */}
      </div>
    </div>
    
    );
  }
}

export default DbOmcp