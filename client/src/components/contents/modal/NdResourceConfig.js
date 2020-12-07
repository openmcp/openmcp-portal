import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import * as utilLog from "../../util/UtLogs.js";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  PagingState,
  SortingState,
  SelectionState,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSelection,
  // SearchState,
  // EditingState,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableColumnResizing,
  TableHeaderRow,
  PagingPanel,
  TableSelection,
  // SearchPanel,
  // Toolbar,
  // TableEditRow,
  // TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

class NdResourceConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {

      columns: [
        { name: "code", title: "Type" },
        { name: "etc", title: "Resources" },
        { name: "description", title: "Description" },
      ],
      defaultColumnWidths: [
        { columnName: "code", width: 100 },
        { columnName: "etc", width: 200 },
        { columnName: "description", width: 300 },
      ],

      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 3,
      pageSizes: [3, 6, 12, 0],

      
      instType: "t2.micro",
      instTypes: [],
      selection: [],
      selectedRow: "",

      open: false,
    };
    // this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    // console.log("Migration will mount");
    // this.callApi()
    //   .then((res) => {
    //     this.setState({ instTypes: res });
    //   })
    //   .catch((err) => console.log(err));
  }

  initState = () => {
    this.setState({
      selection: [],
      selectedRow: "",
    });
  };

  callApi = async () => {
    const response = await fetch("/aws/ec2-type");
    const body = await response.json();
    return body;
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClickOpen = () => {
    this.initState();
    this.setState({
      open: true,
    });

    this.callApi()
      .then((res) => {
        this.setState({ instTypes: res });
      })
      .catch((err) => console.log(err));
  };

  handleClose = () => {
    this.initState();
    this.setState({
      open: false,
    });
  };

  handleSave = (e) => {
    // {/* name, os, ip, status:healthy아니면 confirm 창  */}
    if (Object.keys(this.state.selectedRow).length === 0) {
      alert("Please select Instance Type");
      return;
    }

    let confirmText = "Do you want to proceed?"
    if(this.props.rowData.status !== "Healthy"){
      confirmText = "Node status is not Healthy. Do you want to proceed?"
    } 

    if (window.confirm(confirmText) == true){
      // implement migration workflow
      // ......
      console.log(this.state);


      this.props.onUpdateData();
      // console.log("save", this.state);

      // loging Add Node
      const userId = localStorage.getItem("userName");
      utilLog.fn_insertPLogs(userId, "log-ND-MD02");

      //close modal popup
      this.setState({ open: false });
    }else{
        return;
    }
  };

  handleChange = (event, newValue) => {
    this.initState();
    this.setState({
      value: newValue,
    });
  };

  HeaderRow = ({ row, ...restProps }) => (
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

  onSelectionChange = (selection) => {
    if (selection.length > 1) selection.splice(0, 1);
    this.setState({ selection: selection });
    this.setState({
      selectedRow: this.state.instTypes[selection[0]]
        ? this.state.instTypes[selection[0]]
        : {},
    });
  };

  render() {
    const DialogTitle = withStyles(styles)((props) => {
      const { children, classes, onClose, ...other } = props;
      return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
          <Typography variant="h6">{children}</Typography>
          {onClose ? (
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
      );
    });

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen} style={{position:"absolute", right:"160px", top:"0px", zIndex:"10", width:"148px", height:"31px", textTransform: "capitalize"}}>
          Resource Config
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          fullWidth={false}
          maxWidth="md"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
           Node Resource Configration
          </DialogTitle>
          <DialogContent dividers>
            <div className="md-contents-body">
            <section className="md-content">
                {/* deployment informations */}
                <p>Target Node Info</p>
                <div id="md-content-info">
                  <div class="md-partition">
                    <div class="md-item">
                      <span><strong>Name : </strong></span>
                      <span>{this.props.rowData.name}</span>
                    </div>
                    <div class="md-item">
                      <span><strong>OS : </strong></span>
                      <span>{this.props.rowData.os}</span>
                    </div>
                  </div>
                  <div class="md-partition">
                    <div class="md-item">
                      <span><strong>Status : </strong></span>
                      <span>{this.props.rowData.status}</span>
                    </div>
                    <div class="md-item">
                      <span><strong>IP : </strong></span>
                      <span>{this.props.rowData.ip}</span>
                    </div>
                  </div>
                </div>
              </section>
              <section className="md-content">
                <div>
                  <p>Instance Type</p>
                  {/* cluster selector */}
                  <Paper>
                    <Grid
                      rows={this.state.instTypes}
                      columns={this.state.columns}
                    >
                      {/* Sorting */}
                      <SortingState
                        defaultSorting={[
                          { columnName: "code", direction: "asc" },
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
                        onSelectionChange={this.onSelectionChange}
                      />

                      <IntegratedFiltering />
                      <IntegratedSorting />
                      <IntegratedSelection />
                      <IntegratedPaging />

                      {/* 테이블 */}
                      <Table />
                      <TableColumnResizing
                        defaultColumnWidths={
                          this.state.defaultColumnWidths
                        }
                      />
                      <TableHeaderRow
                        showSortingControls
                        rowComponent={this.HeaderRow}
                      />
                      <TableSelection
                        selectByRowClick
                        highlightRow
                        // showSelectionColumn={false}
                      />
                    </Grid>
                  </Paper>
                </div>
              </section>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSave} color="primary">
              create
            </Button>
            <Button onClick={this.handleClose} color="primary">
              cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default NdResourceConfig;
