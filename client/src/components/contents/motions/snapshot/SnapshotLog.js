import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  SearchState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
  RowDetailState,
  SelectionState,
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
  TableRowDetail,
  TableColumnVisibility
} from "@devexpress/dx-react-grid-material-ui";
import * as utilLog from "../../../util/UtLogs.js";
import { AsyncStorage } from "AsyncStorage";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { convertUTCTime } from "../../../util/Utitlity.js";

class SnapshotLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        // deployment, currentCluster, targetCluster, start, end, status
        { name: "type", title: "Type" },
        { name: "snapshot", title: "Snapshot" },
        { name: "deployment", title: "Deployment" },
        { name: "namespace", title: "Namespace" },
        { name: "status", title: "Status" },
        { name: "reason", title: "Reason" },
        { name: "creationTime", title: "Created Time" },
        { name: "elapsedTime", title: "Elapsed Time" },
        { name: "snapshotkey", title: "Snapshot key" },
        { name: "sub_info", title: "sub" },
        
      ],
      defaultColumnWidths: [
        { columnName: "type", width: 100 },
        { columnName: "snapshot", width: 250 },
        { columnName: "deployment", width: 130 },
        { columnName: "namespace", width: 120 },
        { columnName: "status", width: 100 },
        { columnName: "reason", width: 400 },
        { columnName: "creationTime", width: 200 },
        { columnName: "elapsedTime", width: 130 },
        { columnName: "snapshotkey", width: 150 },
        { columnName: "sub_info", width: 130 },
      ],
      rows: "",
      selectedRowData: "",

      // Paging Settings
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 30,
      pageSizes: [30, 40, 50, 0],

      completed: 0,
      onClickUpdatePolicy: false,
    };
  }

  componentWillMount() {}

  callApi = async () => {
    const response = await fetch(`/apis/snapshot/log`);
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => {
        if (res === null) {
          this.setState({ rows: [] });
        } else {
          this.setState({ rows: res });
        }
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));

    let userId = null;
    AsyncStorage.getItem("userName", (err, result) => {
      userId = result;
    });
    utilLog.fn_insertPLogs(userId, "log-SS-VW02");
  }

  onUpdateData = () => {
    this.setState({
      selection: [],
      selectedRow: "",
    });
    this.callApi()
      .then((res) => {
        
        if (res === null) {
          this.setState({ rows: [] });
        } else {
          this.setState({ rows: res });
        }
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
  };

  onClickUpdatePolicy = (rowData) => {
    this.setState({
      onClickUpdatePolicy: true,
      selectedRowData: rowData,
    });
  };
  onExpandedRowIdsChange = (selection) => {
    if (selection.length > 1) selection.splice(0, 1);
    return this.setState({ expandedRowIds: selection });
  };

  onCloseUpdatePolicy = (value) => {
    this.setState({ onClickUpdatePolicy: value });
  };

  RowDetail = ({ row }) => (
    <div>
      <SnapshotLogDetail
        row={row.sub_info}
        onSelectionChange={this.onSelectionChange}
      />
    </div>
  );

  render() {
    const Cell = (props) => {
      const { column } = props;

      if (column.name === "status") {
        return (
          <Table.Cell
            {...props}
            // style={{ cursor: "pointer" }}
            aria-haspopup="true"
          >
            <div style={{ position: "relative", top: "-3px" }}>
              {props.value === "Success" ? (
                <CheckCircleIcon
                  style={{
                    fontSize: "24px",
                    marginRight: "5px",
                    position: "relative",
                    top: "5px",
                    color: "#00B80F",
                  }}
                />
              ) : (
                <WarningRoundedIcon
                  style={{
                    fontSize: "24px",
                    marginRight: "5px",
                    position: "relative",
                    top: "5px",
                    color: "#dc0505",
                  }}
                />
              )}
              <span>{props.value}</span>
            </div>
          </Table.Cell>
        );
      } else if (column.name === "creationTime") {
        return (
          <Table.Cell {...props}>
            <span>
              {convertUTCTime(
                new Date(props.value),
                "%Y-%m-%d %H:%M:%S",
                false
              )}
            </span>
          </Table.Cell>
        );
      } else {
        return <Table.Cell>{props.value}</Table.Cell>;
      }
    };

    const HeaderRow = ({ row, ...restProps }) => (
      <Table.Row
        {...restProps}
        style={{
          cursor: "pointer",
          backgroundColor: "whitesmoke",
        }}
      />
    );
    const Row = (props) => {
      return <Table.Row {...props} key={props.tableRow.key} />;
    };

    return (
      <div className="sub-content-wrapper fulled">
        <section className="content" style={{ position: "relative" }}>
          <Paper>
            {this.state.rows ? (
              [
                <Grid rows={this.state.rows} columns={this.state.columns}>
                  <Toolbar />
                  <SearchState defaultValue="" />
                  <SearchPanel style={{ marginLeft: 0 }} />

                  <PagingState
                    defaultCurrentPage={0}
                    defaultPageSize={this.state.pageSize}
                  />
                  <PagingPanel pageSizes={this.state.pageSizes} />

                  <SortingState
                    defaultSorting={[
                      { columnName: "creationTime", direction: "desc" },
                    ]}
                  />

                  <IntegratedFiltering />
                  <IntegratedSorting />
                  <IntegratedPaging />

                  <RowDetailState
                  // defaultExpandedRowIds={[2, 5]}
                  expandedRowIds={this.state.expandedRowIds}
                  onExpandedRowIdsChange={this.onExpandedRowIdsChange}
                />
                  <Table cellComponent={Cell} rowComponent={Row} />
                  <TableColumnResizing
                    defaultColumnWidths={this.state.defaultColumnWidths}
                  />
                  <TableHeaderRow
                    showSortingControls
                    rowComponent={HeaderRow}
                  />
                  <TableColumnVisibility
                    defaultHiddenColumnNames={['sub_info']}
                  />
                  <TableRowDetail contentComponent={this.RowDetail} />
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

class SnapshotLogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: "",
      columns: [
        { name: "cluster", title: "Cluster" },
        { name: "resource_name", title: "Resource Name" },
        { name: "namespace", title: "Namespace" },
        { name: "type", title: "Type" },
        { name: "snapshot_key", title: "SnapshotKey" },
      ],
      defaultColumnWidths: [
        { columnName: "cluster", width: 150 },
        { columnName: "resource_name", width: 150 },
        { columnName: "namespace", width: 100 },
        { columnName: "type", width: 200 },
        { columnName: "snapshot_key", width: 500 },
      ],
      value: 0,
    };
  }

  componentDidMount() {
    let result = [];
    this.props.row.map((item)=> result.push(item));
    this.setState({ rows: result });
  }

  initState = () => {
    this.setState({
      selection: [],
      selectedRow: "",
    });
  };

  HeaderRow = ({ row, ...restProps }) => (
    <Table.Row
      {...restProps}
      style={{
        cursor: "pointer",
        // backgroundColor: "#ffe7e7",
        // backgroundColor: "whitesmoke",
        // ...styles[row.sector.toLowerCase()],
      }}
      // onClick={()=> alert(JSON.stringify(row))}
    />
  );

  render() {
    return (
      <div className="inner-table">
        {this.state.rows ? (
          <Grid rows={this.state.rows} columns={this.state.columns}>
            {/* Sorting */}
            <SortingState
              defaultSorting={[{ columnName: "status", direction: "asc" }]}
            />

            <IntegratedFiltering />
            <IntegratedSorting />

            {/* 테이블 */}
            <Table />
            <TableColumnResizing
              defaultColumnWidths={this.state.defaultColumnWidths}
            />
            <TableHeaderRow showSortingControls rowComponent={this.HeaderRow} />
          </Grid>
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

export default SnapshotLog;
