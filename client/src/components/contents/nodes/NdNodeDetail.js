import React, { Component } from "react";
import { NavLink} from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavigateNext} from '@material-ui/icons';
import Paper from "@material-ui/core/Paper";
import {
  SearchState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableColumnResizing,
  TableHeaderRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import PieReChart2 from '../../modules/PieReChart2';
import NdTaint from './../common/NdTaint';
import * as utilLog from './../../util/UtLogs.js';


class NdNodeDetail extends Component {
  state = {
    rows:"",
    completed: 0,
    reRender : ""
  }

  componentWillMount() {
    this.props.menuData("none");
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
    const userId = sessionStorage.getItem("userName");
    utilLog.fn_insertPLogs(userId, 'log-ND-VW02');
  }  

  callApi = async () => {
    var param = this.props.match.params;
    const response = await fetch(`/nodes/${param.node}`);
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    // console.log("CsOverview_Render : ",this.state.rows.basic_info);
    return (
      <div>
        <div className="content-wrapper node-detail full">
          {/* 컨텐츠 헤더 */}
          <section className="content-header">
            <h1>
            { this.props.match.params.node}
              <small>Node Information</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <NavLink to="/dashboard">Home</NavLink>
              </li>
              <li>
                <NavigateNext style={{fontSize:12, margin: "-2px 2px", color: "#444"}}/>
                <NavLink to="/clusters">Clusters</NavLink>
              </li>
              <li className="active">
                <NavigateNext style={{fontSize:12, margin: "-2px 2px", color: "#444"}}/>
                Nodes
              </li>
            </ol>
          </section>

          {/* 내용부분 */}
          <section className="content">
          {this.state.rows ? (
            [
            <BasicInfo rowData={this.state.rows.basic_info}/>,
            <KubernetesStatus rowData={this.state.rows.kubernetes_node_status}/>,
            <NodeResourceUsage rowData={this.state.rows.node_resource_usage}/>,
            <Events rowData={this.state.rows.events}/>
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
  render(){
    // console.log("BasicInfo:", this.props.rowData.name)
    
    return (
      <div className="content-box">
        <div className="cb-header">
          <span>
            Basic Info
          </span>
            <NdTaint name={this.props.rowData.name} taint={this.props.rowData.taint}/>
        </div>
        <div className="cb-body">
          <div>
            <span>Name : </span>
            <strong>{this.props.rowData.name}</strong>
          </div>
          <div style={{display:"flex"}}>

            <div className="cb-body-left">
              <div>
                <span>Status : </span>
                {this.props.rowData.status}
              </div>
              <div>
                <span>Role : </span>
                {this.props.rowData.role}
              </div>
              <div>
                <span>Kubernetes : </span>
                {this.props.rowData.kubernetes}
              </div>
              <div>
                <span>Kubernetes Proxy : </span>
                {this.props.rowData.kubernetes_proxy}
              </div>
            </div>
            <div className="cb-body-right">
              <div>
                  <span>IP : </span>
                  {this.props.rowData.ip}
                </div>
                <div>
                  <span>OS : </span>
                  {this.props.rowData.os}
                </div>
                <div>
                  <span>Docker : </span>
                  {this.props.rowData.docker}
                </div>
                <div>
                  <span>Created Time : </span>
                  {this.props.rowData.created_time}
                </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}


class NodeResourceUsage extends Component {
  state = {
    rows : this.props.rowData,
  }
  angle = {
    full : {
      startAngle : 0,
      endAngle : 360
    },
    half : {
      startAngle : 180,
      endAngle : 0
    }  
  }
  render(){
    const colors = [
      "#0088FE",
      "#ecf0f5",
    ];
    return (
      <div className="content-box">
        <div className="cb-header">Node Resource Usage</div>
        <div className="cb-body flex">
          <div className="cb-body-content pie-chart">
            <div className="cb-sub-title">CPU</div>
            <PieReChart2 data={this.state.rows.cpu} angle={this.angle.half} unit={this.state.rows.cpu.unit} colors={colors}></PieReChart2>
          </div>
          <div className="cb-body-content pie-chart">
            <div className="cb-sub-title">Memory</div>
            <PieReChart2 data={this.state.rows.memory} angle={this.angle.half} unit={this.state.rows.memory.unit} colors={colors}></PieReChart2>
          </div>
          <div className="cb-body-content pie-chart">
            <div className="cb-sub-title">Storage</div>
            <PieReChart2 data={this.state.rows.storage} angle={this.angle.half} unit={this.state.rows.storage.unit} colors={colors}></PieReChart2>
          </div>
          <div className="cb-body-content pie-chart">
            <div className="cb-sub-title">Pod</div>
            <PieReChart2 data={this.state.rows.pods} angle={this.angle.half} unit={this.state.rows.pods.unit} colors={colors}></PieReChart2>
          </div>
        </div>
      </div>
    );
  }
}

class KubernetesStatus extends Component {
  state = {
    rows : this.props.rowData
  }
  render(){
    
    return(
      <div className="content-box cb-kube-status">
        <div className="cb-header">Kubernetes Node Status</div>
        <div className="cb-body flex">
          {this.state.rows.map((item)=>{
            return (
          <div className={"cb-body-content "+item.status}>
            <div>{item.name}</div>
            <div>({item.status})</div>
          </div>)
          })}
        </div>
      </div>
    );
  };
};

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
        { columnName: "message", width: 280 },
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
    // this.props.onSelectMenu(false, "");
  }

  

  // callApi = async () => {
  //   const response = await fetch("/clusters");
  //   const body = await response.json();
  //   return body;
  // };

  // progress = () => {
  //   const { completed } = this.state;
  //   this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  // };

  // //컴포넌트가 모두 마운트가 되었을때 실행된다.
  // componentDidMount() {
  //   //데이터가 들어오기 전까지 프로그래스바를 보여준다.
  //   this.timer = setInterval(this.progress, 20);
  //   this.callApi()
  //     .then((res) => {
  //       this.setState({ rows: res });
  //       clearInterval(this.timer);
  //     })
  //     .catch((err) => console.log(err));
  // };

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
      return <Table.Row {...props} key={props.tableRow.key}/>;
    };

    return (
      <div className="content-box">
        <div className="cb-header">Events</div>
        <div className="cb-body">
        <Paper>
            {this.state.rows ? (
              [
                <Grid
                  rows={this.state.rows}
                  columns={this.state.columns}
                >
                  <Toolbar />
                  {/* 검색 */}
                  <SearchState defaultValue="" />
                  <IntegratedFiltering />
                  <SearchPanel style={{ marginLeft: 0 }} />

                  {/* Sorting */}
                  <SortingState
                    defaultSorting={[{ columnName: 'status', direction: 'desc' }]}
                  />
                  <IntegratedSorting />

                  {/* 페이징 */}
                  <PagingState defaultCurrentPage={0} defaultPageSize={this.state.pageSize} />
                  <IntegratedPaging />
                  <PagingPanel pageSizes={this.state.pageSizes} />

                  {/* 테이블 */}
                  <Table rowComponent={Row} />
                  <TableColumnResizing defaultColumnWidths={this.state.defaultColumnWidths} />
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
  };
};
export default NdNodeDetail;