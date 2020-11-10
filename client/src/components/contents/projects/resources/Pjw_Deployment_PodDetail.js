import React, { Component } from "react";
import { NavLink} from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavigateNext} from '@material-ui/icons';
import Paper from "@material-ui/core/Paper";
import LineChart from './../../../modules/LineChart';
import {
  SearchState,IntegratedFiltering,PagingState,IntegratedPaging,SortingState,IntegratedSorting,
} from "@devexpress/dx-react-grid";
import LineReChart from './../../../modules/LineReChart';
import {
  Grid,Table,Toolbar,SearchPanel,TableColumnResizing,TableHeaderRow,PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";

let apiParams = "";
class Pjw_DeploymentPodDetail extends Component {
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
  }  

  callApi = async () => {
    var param = this.props.match.params;
    const response = await fetch(`/pods/${param.pod}`);
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    return (
      <div>
        <div className="content-wrapper pod-detail full">
          {/* 컨텐츠 헤더 */}
          <section className="content-header">
            <h1>
            { this.props.match.params.pod}
              <small>Pod Information</small>
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
            <Containers rowData={this.state.rows.containers}/>,
            <PodStatus rowData={this.state.rows.pod_status}/>,
            <PhysicalResources rowData={this.state.rows.physical_resources}/>,
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
    return (
      <div className="content-box">
        <div className="cb-header">Basic Info</div>
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
                <span>Cluster : </span>
                {this.props.rowData.cluster}
              </div>
              <div>
                <span>Project : </span>
                {this.props.rowData.project}
              </div>
              <div>
                <span>Node : </span>
                {this.props.rowData.node}
              </div>
              <div>
                <span>Total Restart Count : </span>
                {this.props.rowData.total_restart_count}
              </div>
            </div>
            <div className="cb-body-right">
              <div>
                  <span>namespace : </span>
                  {this.props.rowData.namespace}
                </div>
                <div>
                  <span>Node IP : </span>
                  {this.props.rowData.node_ip}
                </div>
                <div>
                  <span>Pod IP : </span>
                  {this.props.rowData.pod_ip}
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

class Containers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "name", title: "Name" },
        { name: "status", title: "Status" },
        { name: "restart_count", title: "Restart Count" },
        { name: "port", title: "Port" },
        { name: "image", title: "Image" },
      ],
      defaultColumnWidths: [
        { columnName: "name", width: 400 },
        { columnName: "status", width: 150 },
        { columnName: "restart_count", width: 150 },
        { columnName: "port", width: 150 },
        { columnName: "image", width: 280 },
      ],
      rows: this.props.rowData,

      // Paging Settings
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 10, //화면 리스트 개수
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
        <div className="cb-header">Containers</div>
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

                  {/* 페이징 */}
                  <PagingState defaultCurrentPage={0} defaultPageSize={this.state.pageSize} />
                  <IntegratedPaging />
                  <PagingPanel pageSizes={this.state.pageSizes} />

                  {/* Sorting */}
                  <SortingState
                    // defaultSorting={[{ columnName: 'status', direction: 'desc' }]}
                  />
                  <IntegratedSorting />

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

class PodStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "type", title: "Type" },
        { name: "status", title: "Status" },
        { name: "last_update", title: "Last Update" },
        { name: "reson", title: "Reson" },
        { name: "message", title: "Message" },
      ],
      defaultColumnWidths: [
        { columnName: "type", width: 150 },
        { columnName: "status", width: 150 },
        { columnName: "last_update", width: 150 },
        { columnName: "reson", width: 240 },
        { columnName: "message", width: 280 },
      ],
      rows: this.props.rowData,

      // Paging Settings
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 10, //화면 리스트 개수
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
        <div className="cb-header">Pod Status</div>
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

                  {/* 페이징 */}
                  <PagingState defaultCurrentPage={0} defaultPageSize={this.state.pageSize} />
                  <IntegratedPaging />
                  <PagingPanel pageSizes={this.state.pageSizes} />

                  {/* Sorting */}
                  <SortingState
                    // defaultSorting={[{ columnName: 'status', direction: 'desc' }]}
                  />
                  <IntegratedSorting />

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

class PhysicalResources extends Component {
  render(){
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
            >
            </LineReChart>
          </div>
          <div className="cb-body-content">
            <LineReChart rowData={this.props.rowData.memory} unit="mib" name="memory" title="Memory" cardinal={false}></LineReChart>
          </div>
          <div className="cb-body-content">
            <LineReChart rowData={this.props.rowData.network} unit="Bps" name={network_title} title="Network" cardinal={true}></LineReChart>
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
        { name: "status", title: "Status" },
        { name: "reason", title: "Reason" },
        { name: "message", title: "Message" },
        { name: "time", title: "Time" },
      ],
      defaultColumnWidths: [
        { columnName: "status", width: 150 },
        { columnName: "reason", width: 150 },
        { columnName: "message", width: 240 },
        { columnName: "time", width: 180 },
      ],
      rows: this.props.rowData,

      // Paging Settings
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 10, //화면 리스트 개수
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

                  {/* 페이징 */}
                  <PagingState defaultCurrentPage={0} defaultPageSize={this.state.pageSize} />
                  <IntegratedPaging />
                  <PagingPanel pageSizes={this.state.pageSizes} />

                  {/* Sorting */}
                  <SortingState
                    // defaultSorting={[{ columnName: 'status', direction: 'desc' }]}
                  />
                  <IntegratedSorting />

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


export default Pjw_DeploymentPodDetail;