import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  SearchState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
  // EditingState,
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
  // TableEditRow,
  // TableEditColumn,
  TableSelection,
} from "@devexpress/dx-react-grid-material-ui";
import Editor from "./../../../modules/Editor";
import * as utilLog from "./../../../util/UtLogs.js";
import PjDeploymentMigration from "./../../modal/PjDeploymentMigration";
import queryString from 'query-string';
// import { NavigateNext} from '@material-ui/icons';


// let apiParams = "";
class PjwDeployments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "name", title: "Name" },
        { name: "status", title: "Ready" },
        { name: "cluster", title: "Cluster" },
        { name: "project", title: "Project" },
        { name: "image", title: "Image" },
        { name: "created_time", title: "Created Time" },
      ],
      defaultColumnWidths: [
        { columnName: "name", width: 250 },
        { columnName: "status", width: 100 },
        { columnName: "cluster", width: 130 },
        { columnName: "project", width: 200 },
        { columnName: "image", width: 370 },
        { columnName: "created_time", width: 170 },
      ],
      rows: "",

      // Paging Settings
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 5,
      pageSizes: [5, 10, 15, 0],

      completed: 0,
      selection: [],
      selectedRow: "",
      clusterName : ""
    };
  }

  componentWillMount() {
    
    // console.log(this.props.match.params.project)
    // const query = queryString.parse(this.props.location.search).cluster
    // console.log(query);
    // const result = {
    //   menu : "clusters",
    //   title : this.props.match.params.cluster
    // }
    // this.props.menuData(result);
    // apiParams = this.props.param;
  }

  callApi = async () => {

    // var param = this.props.match.params.cluster;
    // queryString = queryString.parse(this.props.location.search).cluster
    console.log(this.props.match.params.project, this.props.location.search);
    const response = await fetch(
      `/projects/${this.props.match.params.project}/resources/workloads/deployments${this.props.location.search}`
    );
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

    const userId = localStorage.getItem("userName");
    utilLog.fn_insertPLogs(userId, "log-PJ-VW03");
  }

  onUpdateData = () => {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => {
        this.setState({ 
          selection : [],
          selectedRow : "",
          rows: res });
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));

    const userId = localStorage.getItem("userName");
    utilLog.fn_insertPLogs(userId, "log-PJ-VW03");
  };


  render() {
    // 셀 데이터 스타일 변경
    const HighlightedCell = ({ value, style, row, ...restProps }) => (
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
              value === "Warning"
                ? "orange"
                : value === "Unschedulable"
                ? "red"
                : value === "Stop"
                ? "red"
                : value === "Running"
                ? "#1ab726"
                : "black",
          }}
        >
          {value}
        </span>
      </Table.Cell>
    );

    //셀
    const Cell = (props) => {
      const { column, row } = props;
      // console.log("cell : ", props);
      // const values = props.value.split("|");
      // console.log("values", props.value);
      
      // const values = props.value.replace("|","1");
      // console.log("values,values", values)

      // const fnEnterCheck = () => {
      //   return (
      //     props.value.indexOf("|") > 0 ?
      //       props.value.split("|").map( item => {
      //         return (
      //           <p>{item}</p>
      //       )}) :
      //         props.value
      //   )
      // }

      if (column.name === "status") {
        return <HighlightedCell {...props} />;
      } else if (column.name === "name") {
        // // console.log("name", props.value);
        // console.log("this.props.match.params", this.props)
        return (
          <Table.Cell {...props} style={{ cursor: "pointer" }}>
            <Link
              to={{
                pathname: `/projects/${this.props.match.params.project}/resources/workloads/deployments/${props.value}`,
                search: this.props.location.search,
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
      return <Table.Cell>{props.value}</Table.Cell>;
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
      // console.log(this.state.rows[selection[0]])
      if (selection.length > 1) selection.splice(0, 1);
      this.setState({ selection: selection });
      this.setState({ selectedRow: this.state.rows[selection[0]] ? this.state.rows[selection[0]] : {} });
    };

    return (
      <div className="content-wrapper full">
        {this.state.clusterName}
        {/* 컨텐츠 헤더 */}
        <section className="content" style={{ position: "relative" }}>
          <Paper>
            {this.state.rows ? (
              [
                <PjDeploymentMigration
                  title="migration"
                  rowData={this.state.selectedRow}
                  onUpdateData = {this.onUpdateData}
                />,
                <Editor title="create" />,
                <Grid rows={this.state.rows} columns={this.state.columns}>
                  <Toolbar />
                  {/* 검색 */}
                  <SearchState defaultValue="" />

                  <SearchPanel style={{ marginLeft: 0 }} />

                  {/* Sorting */}
                  <SortingState
                  // defaultSorting={[{ columnName: 'status', direction: 'desc' }]}
                  />

                  {/* 페이징 */}
                  <PagingState
                    defaultCurrentPage={0}
                    defaultPageSize={this.state.pageSize}
                  />

                  <PagingPanel pageSizes={this.state.pageSizes} />

                  {/* <EditingState
                    onCommitChanges={commitChanges}
                  /> */}
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
                    // showSelectionColumn={false}
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
        </section>
      </div>
    );
  }
}

export default PjwDeployments;
