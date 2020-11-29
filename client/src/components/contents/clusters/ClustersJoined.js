import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { NavLink, Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  SearchState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
  SelectionState,
  IntegratedSelection,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableColumnResizing,
  TableHeaderRow,
  PagingPanel,
  TableSelection,
} from "@devexpress/dx-react-grid-material-ui";
// import Editor from "./../modules/Editor";
import { NavigateNext } from "@material-ui/icons";
import * as utilLog from "../../util/UtLogs.js";
import Confirm from './../../modules/Confirm';

class ClustersJoined extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "name", title: "Name" },
        { name: "status", title: "Status" },
        { name: "region", title: "Region" },
        { name: "zone", title: "Zone" },
        { name: "nodes", title: "Nodes" },
        { name: "cpu", title: "CPU" },
        { name: "ram", title: "Memory" },
        { name: "provider", title: "Provider" },
        // { name: "disk", title: "Disk" },
        // { name: "network", title: "Network" },
      ],
      defaultColumnWidths: [
        { columnName: "name", width: 180 },
        { columnName: "status", width: 130 },
        { columnName: "region", width: 130 },
        { columnName: "zone", width: 130 },
        { columnName: "nodes", width: 130 },
        { columnName: "cpu", width: 130 },
        { columnName: "ram", width: 130 },
        { columnName: "provider", width: 150 },
        // { columnName: "disk", width: 150 },
        // { columnName: "network", width: 150 },
      ],
      rows: "",

      // Paging Settings
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 3,
      pageSizes: [3, 6, 9, 0],

      completed: 0,
      selection: [],
      selectedRow: "",

      confirmInfo : {
        title :"Cluster Unjoin Confrim",
        context :"Are you sure you want to cancel the Cluster Join?",
        button : {
          open : "UNJOIN",
          yes : "UNJOIN",
          no : "CANCEL",
        }  
      },
      confrimTarget : "false"
    };
  }
  componentWillMount() {
    this.props.menuData("none");
  }

  callApi = async () => {
    const response = await fetch("/clusters");
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
        this.setState({ rows: res });
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));

    const userId = localStorage.getItem("userName");
    utilLog.fn_insertPLogs(userId, "log-CL-VW01");
  }

  confirmed = (result) => {
    if(result) {
      //Unjoin proceed
      console.log("confirmed")

      // const userId = localStorage.getItem("userName");
      // utilLog.fn_insertPLogs(userId, "log-CL-MO03");
    } else {
      console.log("cancel")
    }
  }
 
  onRefresh = () => {
    this.callApi()
      .then((res) => {
        this.setState({ rows: res });
      })
      .catch((err) => console.log(err));
  };
  
  render() {
    // 셀 데이터 스타일 변경
    const HighlightedCell = ({ value, style, row, ...restProps }) => {
      var cpuPct = parseFloat(row.cpu.split("/")[0])/parseFloat(row.cpu.split("/")[1].split(" Core")[0]) * 100
      var memPct = parseFloat(row.ram.split("/")[0])/parseFloat(row.ram.split("/")[1].split(" Gi")[0]) * 100
      console.log(cpuPct, memPct)
      var status = cpuPct >= 40 || memPct >= 40 ? "Warning" : value
      return (
      <Table.Cell
        {...restProps}
        style={{
          // backgroundColor:
          //   value === "Healthy" ? "white" : value === "Unhealthy" ? "white" : undefined,
          // cursor: "pointer",
          ...style,
        }}
      >
        <span
          style={{
            color:
            status === "Healthy"
                ? "#1ab726"
                : status === "Unhealthy"
                ? "red"
                : status === "Unknown"
                ? "#b5b5b5"
                : status === "Warning"
                ? "#ff8042"
                : "black",
          }}
        >
          {status}
        </span>
      </Table.Cell>
    )};

    //셀
    const Cell = (props) => {
      const { column, row } = props;
      // console.log("cell : ", props);
      if (column.name === "status") {
        return <HighlightedCell {...props} />;
      } else if (column.name === "name") {
        return (
          <Table.Cell {...props} style={{ cursor: "pointer" }}>
            <Link
              to={{
                pathname: `/clusters/${props.value}/overview`,
                state: {
                  data: row,
                },
              }}
            >
              {props.value}
            </Link>
          </Table.Cell>
        );
      }
      return <Table.Cell {...props} />;
    };

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

    const onSelectionChange = (selection) => {
      if (selection.length > 1) selection.splice(0, 1);
      this.setState({ selection: selection });
      this.setState({
        selectedRow: this.state.rows[selection[0]] ? this.state.rows[selection[0]] : {} ,
        confrimTarget : this.state.rows[selection[0]] ? this.state.rows[selection[0]].name : "false" ,
      });
    };

    return (
      <div className="content-wrapper cluster-list full">
        {/* 컨텐츠 헤더 */}
        <section className="content-header">
          <h1>
            <span onClick={this.onRefresh} style={{cursor:"pointer"}}>
              Joined Clusters
            </span>
            <small></small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <NavLink to="/dashboard">Home</NavLink>
            </li>
            <li className="active">
              <NavigateNext
                style={{ fontSize: 12, margin: "-2px 2px", color: "#444" }}
              />
              Clusters
            </li>
          </ol>
        </section>
        {this.state.rows ? (
          [
            <section className="content" style={{ position: "relative" }}>
              <Paper>
                <Confirm confirmInfo={this.state.confirmInfo} confrimTarget ={this.state.confrimTarget} confirmed={this.confirmed}/>
                <Grid rows={this.state.rows} columns={this.state.columns}>
                  <Toolbar />
                  {/* 검색 */}
                  <SearchState defaultValue="" />
                  <SearchPanel style={{ marginLeft: 0 }} />

                  {/* Sorting */}
                  <SortingState
                    defaultSorting={[
                      { columnName: "status", direction: "desc" },
                    ]}
                  />

                  {/* 페이징 */}
                  <PagingState
                    defaultCurrentPage={0}
                    defaultPageSize={this.state.pageSize}
                  />
                  <PagingPanel pageSizes={this.state.pageSizes} />

                  <SelectionState
                    selection={this.state.selection}
                    onSelectionChange={onSelectionChange}
                  />

                  <IntegratedFiltering />
                  <IntegratedSorting />
                  <IntegratedSelection />
                  <IntegratedPaging />

                  {/* 테이블 */}
                  <Table cellComponent={Cell} rowComponent={Row} />
                  <TableColumnResizing
                    defaultColumnWidths={this.state.defaultColumnWidths}
                  />
                  <TableHeaderRow
                    showSortingControls
                    rowComponent={HeaderRow}
                  />
                  <TableSelection
                    selectByRowClick
                    highlightRow
                  />
                </Grid>
              </Paper>
            </section>,
            <section
              className="content"
              style={{ position: "relative" }}
            ><ResourceStatus data={this.state.rows}/>
            </section>
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

class ResourceStatus extends Component{
  constructor(props){
    super(props);
    this.state = {
      data : this.props.data
    }
  }
  render(){
    return(
      <div>
      <div className="rs-title">Cluster Resource Status</div>
        {this.state.data.map((item)=>{
          return(
            <Paper className="rs-status">
              <div className="status-title">
                <div>{item.name}</div>
              </div>
              <div className="status-content">
                <div>
                  <span>CPU: </span>
                  <span>{item.cpu}</span>
                </div>
                <div>
                  <span>Memory: </span>
                  <span>{item.ram}</span>
                </div>
                <div>
                  <span>Disk: </span>
                  <span>{item.disk}</span>
                </div>
                <div>
                  <span>Network: </span>
                  <span>{item.network}</span>
                </div>

              </div>
            </Paper>
          )
        })}
      </div>
    )
  }
}

export default ClustersJoined;
