import React, { Component } from "react";
import {
  Button,
} from "@material-ui/core";
import {
  SearchState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
  SelectionState,
  IntegratedSelection,
  TableColumnVisibility,
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
import Paper from "@material-ui/core/Paper";
import EditEKSAuth from "../../../modal/public-cloud-auth/EditEKSAuth.js";

class ConfigEKS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // tb_auth_eks > seq,cluster,type,accessKey,secretKey
      columns: [
        { name: "seq", title:"No"},
        { name: "cluster", title: "Cluster" },
        { name: "accessKey", title: "Access Key" },
        { name: "secretKey", title: "Secret Key" },
      ],
      defaultColumnWidths: [
        { columnName: "seq", width: 100 },
        { columnName: "cluster", width: 200 },
        { columnName: "accessKey", width: 300 },
        { columnName: "secretKey", width: 400 },
      ],
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 5,
      pageSizes: [5, 10, 15, 0],

      open: false,
      account: "",
      account_role: "",
      rows: [],

      selection: [],
      selectedRow: "",
      popTitle:"",
    };
  }

  callApi = async () => {
    const response = await fetch(`/settings/config/pca/eks`);
    const body = await response.json();
    return body;
  };

  componentWillMount() {

    this.callApi()
      .then((res) => {
        this.setState({ rows: res });
      })
      .catch((err) => console.log(err));
  }

  Cell = (props) => {
    const { column, row } = props;
    if (column.name === "control") {
      return (
        <Table.Cell
          {...props}
          style={{
            borderRight: "1px solid #e0e0e0",
            borderLeft: "1px solid #e0e0e0",
            textAlign: "center",
            background: "whitesmoke",
          }}
        >
        </Table.Cell>
      );
    }
    return <Table.Cell>{props.value}</Table.Cell>;
  };

  handleClickNew = () => {
    this.setState({ 
      open : true,
      new : true,
      popTitle:"Add EKS Authentication",
      data:{}
    });
  };

  handleClickEdit = () => {
    if (Object.keys(this.state.selectedRow).length === 0) {
      alert("Please select a authentication data row");
      this.setState({ open: false });
      return;
    }

    this.setState({ 
      open: true, 
      new: false, 
      popTitle:"Edit EKS Authentication",
      data:{
        seq : this.state.selectedRow.seq,
        cluster: this.state.selectedRow.cluster,
        accessKey: this.state.selectedRow.accessKey,
        secretKey: this.state.selectedRow.secretKey,
      }
    });
  };

  callBackClosed = () => {
    this.setState({
      open : false,
      selection: [],
      selectedRow: "",});
    this.callApi()
    .then((res) => {
      this.setState({ rows: res });
    })
    .catch((err) => console.log(err));
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
    const onSelectionChange = (selection) => {
      // console.log(selection);
      if (selection.length > 1) selection.splice(0, 1);
      this.setState({ selection: selection });
      this.setState({
        selectedRow: this.state.rows[selection[0]]
          ? this.state.rows[selection[0]]
          : {},
      });
    };

    return (
      <div>
        <EditEKSAuth 
          open={this.state.open}
          new={this.state.new}
          callBackClosed={this.callBackClosed}
          title={this.state.popTitle}
          data={this.state.data}
        />
        
        <div className="md-contents-body">
          <div style={{padding: "15px 15px 15px 25px",
                        backgroundColor: "#bfdcec",
                        boxShadow: "0px 0px 3px 0px #b9b9b9"
                      }}
          > EKS Authentications Configration</div>
          <section className="md-content">
            <Paper>
              <Grid 
                rows={this.state.rows} 
                columns={this.state.columns}
              >
                <div style={{position:"relative"}}>
                  <div style = {{position:"absolute",
                        right: "13px",
                        top: "13px",
                        zIndex: "10",}}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.handleClickNew}
                      style={{
                        width: "120px",
                        marginRight:"10px",
                        textTransform: "capitalize",
                      }}
                    >
                      New
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={this.handleClickEdit}
                      style={{
                        width: "120px",
                        textTransform: "capitalize",
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <Toolbar />
                {/* 검색 */}
                <SearchState defaultValue="" />
                <SearchPanel style={{ marginLeft: 0 }} />

                {/* Sorting */}
                <SortingState
                  defaultSorting={[{ columnName: "status", direction: "asc" }]}
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
                <Table
                  cellComponent={this.Cell}
                  rowComponent={Row}
                />
                <TableColumnResizing
                    defaultColumnWidths={this.state.defaultColumnWidths}
                />
                <TableHeaderRow showSortingControls rowComponent={HeaderRow} />
                {/* <TableColumnVisibility defaultHiddenColumnNames={["role_id"]} /> */}
                <TableSelection
                  selectByRowClick
                  highlightRow
                  // showSelectionColumn={false}
                />
              </Grid>
            </Paper>
          </section>
        </div>
      </div>
    );
  }
}

export default ConfigEKS;
