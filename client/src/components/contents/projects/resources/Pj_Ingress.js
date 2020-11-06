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
import Editor from "./../../../common/Editor";
import { NavigateNext } from "@material-ui/icons";

let apiParams = "";
class Pj_Ingress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "name", title: "Name" },
        { name: "namespace", title: "Namespace" },
        { name: "address", title: "Address" },
        { name: "created_time", title: "Created Time" },
      ],
      defaultColumnWidths: [
        { columnName: "name", width: 130 },
        { columnName: "namespace", width: 130 },
        { columnName: "address", width: 130 },
        { columnName: "created_time", width: 150 },
      ],
      rows: "",

      // Paging Settings
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 10, //화면 리스트 개수
      pageSizes: [5, 10, 15, 0],

      completed: 0,
    };
  }

  componentWillMount() {
    const result = {
      menu: "projects",
      title: this.props.match.params.project,
    };
    this.props.menuData(result);

    apiParams = this.props.match.params.project;
  }

  callApi = async () => {
    var param = this.props.match.params.cluster;
    const response = await fetch(`/projects/${apiParams}/resources/ingress`);
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
  }

  render() {
    // 셀 데이터 스타일 변경
    const HighlightedCell = ({ value, style, row, ...restProps }) => (
      <Table.Cell
        {...restProps}
        style={{
          // backgroundColor:
          //   value === "Healthy" ? "white" : value === "Unhealthy" ? "white" : undefined,
          cursor: "pointer",
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
                ? "green"
                : "skyblue",
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
      // debugger;
      // const values = props.value.replace("|","1");
      // console.log("values,values", values)

      const fnEnterCheck = () => {
        return props.value.indexOf("|") > 0
          ? props.value.split("|").map((item) => {
              return <p>{item}</p>;
            })
          : props.value;
      };

      if (column.name === "status") {
        return <HighlightedCell {...props} />;
      } else if (column.name === "name") {
        console.log("name", props.value);
        return (
          <Table.Cell {...props} style={{ cursor: "pointer" }}>
            <Link
              to={{
                pathname: `/projects/${apiParams}/resources/ingress/${props.value}`,
                state: {
                  data: row,
                },
              }}
            >
              {fnEnterCheck()}
            </Link>
          </Table.Cell>
        );
      }
      return <Table.Cell>{fnEnterCheck()}</Table.Cell>;
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

    return (
      <div className="content-wrapper">
        {/* 컨텐츠 헤더 */}
        <section className="content-header">
          <h1>
            Ingress
            <small> in {apiParams}</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <NavLink to="/dashboard">Home</NavLink>
            </li>
            <li className="active">
              <NavigateNext
                style={{ fontSize: 12, margin: "-2px 2px", color: "#444" }}
              />
              Projects
            </li>
            <li className="active">
              <NavigateNext
                style={{ fontSize: 12, margin: "-2px 2px", color: "#444" }}
              />
              Resources
            </li>
          </ol>
        </section>
        <section className="content" style={{ position: "relative" }}>
          <Paper>
            {this.state.rows ? (
              [
                <Editor />,
                <Grid rows={this.state.rows} columns={this.state.columns}>
                  <Toolbar />
                  {/* 검색 */}
                  <SearchState defaultValue="" />
                  <IntegratedFiltering />
                  <SearchPanel style={{ marginLeft: 0 }} />

                  {/* 페이징 */}
                  <PagingState
                    defaultCurrentPage={0}
                    defaultPageSize={this.state.pageSize}
                  />
                  <IntegratedPaging />
                  <PagingPanel pageSizes={this.state.pageSizes} />

                  {/* Sorting */}
                  <SortingState
                    defaultSorting={[
                      { columnName: "status", direction: "desc" },
                    ]}
                  />
                  <IntegratedSorting />

                  {/* 테이블 */}
                  <Table cellComponent={Cell} rowComponent={Row} />
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
        </section>
      </div>
    );
  }
}

export default Pj_Ingress;
