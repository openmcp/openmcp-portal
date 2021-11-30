import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import TreeView2 from '../../modules/TreeView2';
import * as utilLog from '../../util/UtLogs.js';
import { AsyncStorage } from 'AsyncStorage';

class DbRegionGroup extends Component {
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

  componentWillMount() {}
  
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
    
    utilLog.fn_insertPLogs(userId, 'log-DS-VW02');
  }
  
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  callApi = async () => {

    let g_clusters;
    AsyncStorage.getItem("g_clusters",(err, result) => { 
      g_clusters = result.split(',');
    });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ g_clusters : g_clusters })
    };

    const response = await fetch(`/apis/dashboard/region_groups`, requestOptions);
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
                <DashboardCard04
                  title="Cluster Regions"
                  // width="100%"
                  data={this.state.rows.regions}
                ></DashboardCard04>
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


class DashboardCard04 extends Component {
  render() {
    return (
      <div className="content-box">
      <div className="cb-header">
        <span>{this.props.title}</span>
        {/* <div className="cb-btn">
          <Link to={this.props.path}>detail</Link>
        </div> */}
      </div>
      <div
        className="cb-body"
        style={{ position: "relative", display:"flex"}}
      >
        <TreeView2 data={this.props.data}/>
      </div>
    </div>
    );
  }
}


export default DbRegionGroup