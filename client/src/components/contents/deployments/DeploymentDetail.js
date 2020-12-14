import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavigateNext } from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import axios from 'axios';
import {
  SearchState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
} from "@devexpress/dx-react-grid";
import LineReChart from "./../../modules/LineReChart";
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableColumnResizing,
  TableHeaderRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import * as utilLog from './../../util/UtLogs.js';


let apiParams = "";
class DeploymentDetail extends Component {
  state = {
    rows: "",
    completed: 0,
    reRender: "",
  };

  componentWillMount() {
    apiParams = this.props.match.params;
  }

  componentDidMount() {
    //데이터가 들어오기 전까지 프로그래스바를 보여준다.
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => {
        if(res === null){
          this.setState({ rows: [] });
        } else {
          this.setState({ rows: res });
        }
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));

    const userId = localStorage.getItem("userName");
    utilLog.fn_insertPLogs(userId, 'log-PJ-VW04');
  }

  callApi = async () => {
    var param = this.props.match.params;
    const response = await fetch(
      `/projects/${param.project}/resources/workloads/deployments/${param.deployment}`
    );
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  refresh = () =>{
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => {
        if(res === null){
          this.setState({ rows: [] });
        } else {
          this.setState({ rows: res });
        }
        console.log(res);
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
  }


  render() {
    return (
      <div>
        <div className="content-wrapper pj-deployments full">
          {/* 컨텐츠 헤더 */}
          <section className="content-header" style={{ paddingTop: 15 }}>
            Deployment Information
            <small>
              <NavigateNext
                style={{ fontSize: 12, margin: "-2px 2px", color: "#444" }}
              />
              {this.props.match.params.deployment}
            </small>
          </section>
          {/* 내용부분 */}
          <section className="content">
            {this.state.rows ? (
              [
                <BasicInfo rowData={this.state.rows.basic_info} />,
                <ReplicaStatus refresh={this.refresh} />,
                <Pods rowData={this.state.rows.pods} />,
                <Ports rowData={this.state.rows.ports} />,
                // <PhysicalResources
                //   rowData={this.state.rows.physical_resources}
                // />,
                <Events rowData={this.state.rows.events} />,
              ]
            ) : (
              <CircularProgress
                variant="determinate"
                value={this.state.completed}
                style={{ position: "absolute", left: "50%", marginTop: "20px" }}
              ></CircularProgress>
            )}
          </section>
        </div>
      </div>
    );
  }
}

class BasicInfo extends Component {
  render() {
    return (
      <div className="content-box">
        <div className="cb-header">Basic Info</div>
        <div className="cb-body">
          <div style={{display:"flex"}}>
            <div className="cb-body-left">
              <div>
                <span>Name : </span>
                <strong>{this.props.rowData.name}</strong>
              </div>
              <div>
                <span>Namespace : </span>
                {this.props.rowData.namespace}
              </div>
              <div>
                  <span>Labels : </span>
                  <div style={{margin : "-25px 0px 0px 66px"}}>
                    {
                      Object.keys(this.props.rowData.labels).length > 0 ?
                        (
                          Object.entries(this.props.rowData.labels).map(i=>{
                          return (<div>{i.join(" : ")}</div>)
                        })
                        ) : 
                        "-"
                    }
                  </div>
                </div>
              
            </div>
            <div className="cb-body-right">
                <div>
                  <span>Created Time : </span>
                  {this.props.rowData.created_time}
                </div>
                <div>
                <span>Uid : </span>
                {this.props.rowData.uid}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

class ReplicaStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
      // status,
    };
  }

  componentWillMount() {
  }

  callApi = async () => {
    const response = await fetch(`/projects/${apiParams.project}/resources/workloads/deployments/${apiParams.deployment}/replica_status`);
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  //컴포넌트가 모두 마운트가 되었을때 실행된다.
  componentDidMount() {
    //데이터가 들어오기 전까지 프로그래스바를 보여준다.
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => {
        if(res === null){
          this.setState({ rows: [] });
        } else {
          this.setState({ rows: res });
        }
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
  };


  delClickEventHandler = (e, cluster) => {
    e.preventDefault();
    // console.log("delClickEventHandler", e, cluster)
    console.log(cluster);
    this.delPod(cluster)
        .then((res) => {
          this.callApi()
          .then((res) => {
            this.setState({ rows: res });
            clearInterval(this.timer);
            this.props.refresh();
          })
          .catch((err) => console.log(err));
        })
  }


  addClickEventHandler = (e, cluster) => {
    e.preventDefault();
    this.addPod(cluster)
        .then((res) => {
          this.callApi()
          .then((res) => {
            this.setState({ rows: res });
            clearInterval(this.timer);
            this.props.refresh();
          })
          .catch((err) => console.log(err));
        })
  }

  
  addPod = (cluster) =>{
    const url = `/projects/${apiParams.project}/resources/workloads/deployments/${apiParams.deployment}/replica_status/add_pod`;
    const data = {
      cluster : cluster
    }
    return axios.post(url, data);

  }

  delPod = (cluster) =>{
    console.log("delPod",cluster);
    const url = `/projects/${apiParams.project}/resources/workloads/deployments/${apiParams.deployment}/replica_status/del_pod`;
    const data = {
      data : {
        cluster: cluster
      }
      
    }
    return axios.delete(url, data);
  }

  render() {
    const rectangle = (status, pId) => {
      return (
        <div className="rectangle"
          id={pId}
          style={{ 
            backgroundColor: status === "ready" ? "#367fa9" : "orange",
          }}
          
        />
      );
    };

    return (
      <div className="content-box replica-set">
        <div className="cb-header">Replica Status</div>
        <div className="cb-body" style={{width:"100%"}}>
          <div>
          {this.state.rows ? (

            this.state.rows.map((i) => {
              const ready_count = i.pods.reduce((obj, v) => {
                obj[v.status] = (obj[v.status] || 0) + 1;
                return obj;
              }, {})
  
              const count = i.pods.length
              return (
                <div className="rs-cluster">
                  <div className="cluster-title">
                    {i.cluster} </div>
                  <div className="cluster-content">
                  <div className="pod-count">
                    <span>{ready_count.ready}</span>
                    <span>/</span>
                    <span>{count}</span>
                  </div>
                  {i.pods.map((p)=>{
                    return (
                      rectangle(p.status)
                    );
                  })}
                  </div>
                  <div className="cluster-button">
                  
                    <div onClick= {e => this.addClickEventHandler(e, i.cluster)}>+</div>
                    <div onClick={e => this.delClickEventHandler(e, i.cluster)}>-</div>
                  </div>
                </div>
              );
            })
            ) : (
              <CircularProgress
                variant="determinate"
                value={this.state.completed}
                style={{ position: "absolute", left: "50%", marginTop: "20px" }}
              ></CircularProgress>
          )}  
          </div>
        </div>
      </div>
    );
  }
}

class Pods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "name", title: "Name" },
        { name: "status", title: "Status" },
        { name: "node", title: "Node" },
        { name: "cpu", title: "Cpu" },
        { name: "memory", title: "Memory" },
      ],
      defaultColumnWidths: [
        { columnName: "name", width: 300 },
        { columnName: "status", width: 130 },
        { columnName: "node", width: 250 },
        { columnName: "cpu", width: 100 },
        { columnName: "memory", width: 100 },
      ],
      rows: this.props.rowData,

      // Paging Settings
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 10, 
      pageSizes: [5, 10, 15, 0],

      completed: 0,
    };
  }

  componentWillMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("pods update");
    if (this.props.rowData !== prevProps.rowData) {
      this.setState({
        ...this.state,
        rows: this.props.rowData,
      });
    }
  }
  render() {
    const HeaderRow = ({ row, ...restProps }) => (
      <Table.Row
        {...restProps}
        style={{
          cursor: "pointer",
          backgroundColor: "whitesmoke",
          // ...styles[row.sector.toLowerCase()],
        }}
        // onClick={()=> alert(JSON.stringify(row))}
      />
    );
    const Row = (props) => {
      return <Table.Row {...props} key={props.tableRow.key} />;
    };

    return (
      <div className="content-box">
        <div className="cb-header">Pods</div>
        <div className="cb-body">
          <Paper>
            {this.state.rows ? (
              [
                <Grid rows={this.state.rows} columns={this.state.columns}>
                  <Toolbar />
                  {/* 검색 */}
                  <SearchState defaultValue="" />
                  <IntegratedFiltering />
                  <SearchPanel style={{ marginLeft: 0 }} />

                  {/* Sorting */}
                  <SortingState
                  // defaultSorting={[{ columnName: 'status', direction: 'desc' }]}
                  />
                  <IntegratedSorting />

                  {/* 페이징 */}
                  <PagingState
                    defaultCurrentPage={0}
                    defaultPageSize={this.state.pageSize}
                  />
                  <IntegratedPaging />
                  <PagingPanel pageSizes={this.state.pageSizes} />

                  {/* 테이블 */}
                  <Table rowComponent={Row} />
                  <TableColumnResizing
                    defaultColumnWidths={this.state.defaultColumnWidths}
                  />
                  <TableHeaderRow
                    showSortingControls
                    rowComponent={HeaderRow}
                  />
                </Grid>,
              ]
            ) : (
              <CircularProgress
                variant="determinate"
                value={this.state.completed}
                style={{ position: "absolute", left: "50%", marginTop: "20px" }}
              ></CircularProgress>
            )}
          </Paper>
        </div>
      </div>
    );
  }
}

class Ports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "port_name", title: "Port Name" },
        { name: "port", title: "Port" },
        { name: "listening_port", title: "Listening Port" },
        { name: "protocol", title: "Protocol" },
      ],
      defaultColumnWidths: [
        { columnName: "port_name", width: 200 },
        { columnName: "port", width: 150 },
        { columnName: "listening_port", width: 150 },
        { columnName: "protocol", width: 150 },
      ],
      rows: this.props.rowData,

      // Paging Settings
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 10, 
      pageSizes: [5, 10, 15, 0],

      completed: 0,
    };
  }

  componentWillMount() {
  }

  render() {
    const HeaderRow = ({ row, ...restProps }) => (
      <Table.Row
        {...restProps}
        style={{
          cursor: "pointer",
          backgroundColor: "whitesmoke",
          // ...styles[row.sector.toLowerCase()],
        }}
        // onClick={()=> alert(JSON.stringify(row))}
      />
    );
    const Row = (props) => {
      // console.log("row!!!!!! : ",props);
      return <Table.Row {...props} key={props.tableRow.key} />;
    };

    return (
      <div className="content-box">
        <div className="cb-header">Ports</div>
        <div className="cb-body">
          <Paper>
            {this.state.rows ? (
              [
                <Grid rows={this.state.rows} columns={this.state.columns}>
                  <Toolbar />
                  {/* 검색 */}
                  <SearchState defaultValue="" />
                  <IntegratedFiltering />
                  <SearchPanel style={{ marginLeft: 0 }} />

                  {/* Sorting */}
                  <SortingState
                  // defaultSorting={[{ columnName: 'status', direction: 'desc' }]}
                  />
                  <IntegratedSorting />

                  {/* 페이징 */}
                  <PagingState
                    defaultCurrentPage={0}
                    defaultPageSize={this.state.pageSize}
                  />
                  <IntegratedPaging />
                  <PagingPanel pageSizes={this.state.pageSizes} />

                  {/* 테이블 */}
                  <Table rowComponent={Row} />
                  <TableColumnResizing
                    defaultColumnWidths={this.state.defaultColumnWidths}
                  />
                  <TableHeaderRow
                    showSortingControls
                    rowComponent={HeaderRow}
                  />
                </Grid>,
              ]
            ) : (
              <CircularProgress
                variant="determinate"
                value={this.state.completed}
                style={{ position: "absolute", left: "50%", marginTop: "20px" }}
              ></CircularProgress>
            )}
          </Paper>
        </div>
      </div>
    );
  }
}

class PhysicalResources extends Component {
  render() {
    const network_title = ["in", "out"];
    return (
      <div className="content-box line-chart">
        <div className="cb-header">Physical Resources</div>
        <div className="cb-body">
          <div className="cb-body-content">
            <LineReChart
              rowData={this.props.rowData.cpu}
              unit="m"
              name="cpu"
              title="CPU"
              cardinal={false}
            ></LineReChart>
          </div>
          <div className="cb-body-content">
            <LineReChart
              rowData={this.props.rowData.memory}
              unit="mib"
              name="memory"
              title="Memory"
              cardinal={false}
            ></LineReChart>
          </div>
          <div className="cb-body-content">
            <LineReChart
              rowData={this.props.rowData.network}
              unit="Bps"
              name={network_title}
              title="Network"
              cardinal={true}
            ></LineReChart>
          </div>
        </div>
      </div>
    );
  }
}

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "project", title: "Project" },
        { name: "type", title: "Type" },
        { name: "reason", title: "Reason" },
        { name: "object", title: "Object" },
        { name: "message", title: "Message" },
        { name: "time", title: "Time" },
      ],
      defaultColumnWidths: [
        { columnName: "project", width: 150 },
        { columnName: "type", width: 150 },
        { columnName: "reason", width: 150 },
        { columnName: "object", width: 240 },
        { columnName: "message", width: 440 },
        { columnName: "time", width: 180 },
      ],
      rows: this.props.rowData,

      // Paging Settings
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 10, 
      pageSizes: [5, 10, 15, 0],

      completed: 0,
    };
  }

  componentWillMount() {
  }
  render() {
    const HeaderRow = ({ row, ...restProps }) => (
      <Table.Row
        {...restProps}
        style={{
          cursor: "pointer",
          backgroundColor: "whitesmoke",
          // ...styles[row.sector.toLowerCase()],
        }}
        // onClick={()=> alert(JSON.stringify(row))}
      />
    );
    const Row = (props) => {
      // console.log("row!!!!!! : ",props);
      return <Table.Row {...props} key={props.tableRow.key} />;
    };

    return (
      <div className="content-box">
        <div className="cb-header">Events</div>
        <div className="cb-body">
          <Paper>
            {this.state.rows ? (
              [
                <Grid rows={this.state.rows} columns={this.state.columns}>
                  <Toolbar />
                  {/* 검색 */}
                  <SearchState defaultValue="" />
                  <IntegratedFiltering />
                  <SearchPanel style={{ marginLeft: 0 }} />

                  {/* Sorting */}
                  <SortingState
                  // defaultSorting={[{ columnName: 'status', direction: 'desc' }]}
                  />
                  <IntegratedSorting />

                  {/* 페이징 */}
                  <PagingState
                    defaultCurrentPage={0}
                    defaultPageSize={this.state.pageSize}
                  />
                  <IntegratedPaging />
                  <PagingPanel pageSizes={this.state.pageSizes} />

                  {/* 테이블 */}
                  <Table rowComponent={Row} />
                  <TableColumnResizing
                    defaultColumnWidths={this.state.defaultColumnWidths}
                  />
                  <TableHeaderRow
                    showSortingControls
                    rowComponent={HeaderRow}
                  />
                </Grid>,
              ]
            ) : (
              <CircularProgress
                variant="determinate"
                value={this.state.completed}
                style={{ position: "absolute", left: "50%", marginTop: "20px" }}
              ></CircularProgress>
            )}
          </Paper>
        </div>
      </div>
    );
  }
}

export default DeploymentDetail;
