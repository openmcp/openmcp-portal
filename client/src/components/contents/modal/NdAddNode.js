import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import * as utilLog from "../../util/UtLogs.js";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  TextField,
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
  RowDetailState,
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
  TableRowDetail,
  // SearchPanel,
  // Toolbar,
  // TableEditRow,
  // TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Container } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import axios from 'axios';
// import SelectBox from "../../modules/SelectBox";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>
            {children}
          </Box>
        </Container>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class NdAddNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secretKey:"",
      accessKey:"",
      nodeName:"",
      desiredNumber:0,

      InstTypeColumns: [
        { name: "code", title: "Type" },
        { name: "etc", title: "Resources" },
        { name: "description", title: "Description" },
      ],
      defaultInstTypeColumnWidths: [
        { columnName: "code", width: 130 },
        { columnName: "etc", width: 200 },
        { columnName: "description", width: 300 },
      ],

      columns: [
        { name: "name", title: "Name" },
        { name: "status", title: "Status" },
        { name: "nodes", title: "nodes" },
        { name: "cpu", title: "CPU(%)" },
        { name: "ram", title: "Memory(%)" },
      ],
      defaultColumnWidths: [
        { columnName: "name", width: 130 },
        { columnName: "status", width: 130 },
        { columnName: "nodes", width: 130 },
        { columnName: "cpu", width: 130 },
        { columnName: "ram", width: 120 },
      ],

      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 3,
      pageSizes: [3, 6, 12, 0],

      open: false,

      instTypes: [],
      clusters: [],

      selection: [],
      selectedRow : "",
      instTypeSelection: [],
      instTypeSelectedRow : "",

      value: 0,
      instType : "t2.micro",
      expandedRowIds : [0],
    };
    // this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    // console.log("Migration will mount");
    // this.callApi()
    //   .then((res) => {
    //     this.setState({ clusters: res });
    //   })
    //   .catch((err) => console.log(err));

    // this.callApi2()
    //   .then((res) => {
    //     this.setState({ instTypes: res });
    //   })
    //   .catch((err) => console.log(err));
  }

  initState = () => {
    this.setState({
      selection : [],
      selectedRow:"",
      instTypeSelection: [],
      instTypeSelectedRow:"",
      secretKey:"",
      accessKey:"",
      nodeName:"",
      desiredNumber:0,
      expandedRowIds : [0],
    });
  }

  callApi = async () => {
    // const response = await fetch("/aws/clusters");
    const response = await fetch("/aws/clusters");
    const body = await response.json();
    return body;
  };

  callApi2 = async () => {
    const response = await fetch("/aws/ec2-type");
    const body = await response.json();
    return body;
  };

  onChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClickOpen = () => {
    this.initState();
    this.setState({ 
      open: true,
    });
    this.callApi()
    .then((res) => {
      this.setState({ clusters: res });
    })
    .catch((err) => console.log(err));

  this.callApi2()
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
    // if (Object.keys(this.state.instTypeSelectedRow).length === 0) {
    //   alert("Please select target instance type");
    //   return;
    // } 
    // if (Object.keys(this.state.selectedRow).length === 0) {
    //   alert("Please select target cluster");
    //   return;
    // } 


    // implement migration workflow
    // ......
    const url = `/nodes/add/eks`;
    const data = {
      yaml:""
    };
    axios.post(url, data)
    .then((res) => {
    })
    .catch((err) => {
        alert(err);
    });

    

    this.props.onUpdateData();
    // console.log("save", this.state);
    
    // loging Add Node
    const userId = localStorage.getItem("userName");
    utilLog.fn_insertPLogs(userId, "log-ND-CR01");

    //close modal popup
    this.setState({ open: false });
  };

  handleChange = (event, newValue) => {
    this.initState();
    this.setState({ 
      value: newValue
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
    this.setState({desiredNumber:selection.desired})
  };

  
  onInstTypeSelectionChange = (selection) => {
    if (selection.length > 1) selection.splice(0, 1);
    this.setState({ instTypeSelection: selection });
    this.setState({ instTypeSelectedRow: selection.length > 0 ? this.state.instTypes[selection[0]] : {} });
  };

  onExpandedRowIdsChange = (selection) => {
    if (selection.length > 1) selection.splice(0, 1);
    return (this.setState({expandedRowIds:selection}))
  }

  RowDetail = ({ row }) => (
    <div>
      <WorkerGroups rowData={row.name} onSelectionChange={this.onSelectionChange}/>
    </div>
  );

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
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          style={{
            position: "absolute",
            right: "26px",
            top: "26px",
            zIndex: "10",
            width: "148px",
            textTransform: "capitalize",
          }}
        >
          Add Node
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          fullWidth={false}
          maxWidth="md"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Add Public Cloud Node
          </DialogTitle>
          <DialogContent dividers>
            <div className="md-contents-body add-node">
              <AppBar position="static" className="app-bar">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  aria-label="simple tabs example"
                  style={{ backgroundColor: "#16586c" }}
                  indicatorColor="primary"
                >
                  <Tab label="AWS" {...a11yProps(0)} />
                  <Tab label="GCP" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel className="tab-panel" value={this.state.value} index={0}>
                <section className="md-content">
                  <div style={{display:"flex"}}>
                    <div className="props" style={{width:"40%", marginRight:"10px"}}>
                      <p>Secret key</p>
                      <TextField
                        id="outlined-multiline-static"
                        rows={1}
                        placeholder="secret key"
                        variant="outlined"
                        value = {this.state.secretKey}
                        fullWidth	={true}
                        name="secretKey"
                        onChange = {this.onChange}
                      />
                    </div>
                    <div className="props" style={{width:"60%"}}>
                      <p>Access key</p>
                      <TextField
                        id="outlined-multiline-static"
                        rows={1}
                        placeholder="access key"
                        variant="outlined"
                        value = {this.state.accessKey}
                        fullWidth	={true}
                        name="accessKey"
                        onChange = {this.onChange}
                      />
                    </div>
                  </div>
                </section>
                <section className="md-content">
                  <div className="outer-table">
                    <p>Cluster</p>
                    {/* cluster selector */}
                    <Paper>
                    <Grid rows={this.state.clusters} columns={this.state.columns}>

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
                      {/* <SelectionState
                        selection={this.state.selection}
                        onSelectionChange={this.onSelectionChange}
                      /> */}

                      <IntegratedFiltering />
                      <IntegratedSorting />
                      {/* <IntegratedSelection /> */}
                      <IntegratedPaging />

                      {/* 테이블 */}
                      <RowDetailState
                        // defaultExpandedRowIds={[2, 5]}
                        expandedRowIds={this.state.expandedRowIds}
                        onExpandedRowIdsChange={this.onExpandedRowIdsChange}
                      />
                      <Table />
                      <TableColumnResizing
                        defaultColumnWidths={this.state.defaultColumnWidths}
                      />
                      <TableHeaderRow
                        showSortingControls
                        rowComponent={this.HeaderRow}
                      />
                      <TableRowDetail
                        contentComponent={this.RowDetail}
                      />
                      {/* <TableSelection
                        selectByRowClick
                        highlightRow
                        // showSelectionColumn={false}
                      /> */}
                    </Grid>
                    </Paper>
                  </div>
                </section>
                <section className="md-content">
                  <div style={{display:"flex"}}>
                    <div className="props" style={{width:"30%"}}>
                      <p>Selected Desired Number</p>
                      <TextField
                        id="outlined-multiline-static"
                        rows={1}
                        type="number"
                        placeholder="workers count"
                        variant="outlined"
                        value = {this.state.desiredNumber}
                        fullWidth	={true}
                        name="desiredNumber"
                        onChange = {this.onChange}
                      />
                    </div>
                  </div>
                </section>
                
              </TabPanel>
              <TabPanel className="tab-panel" value={this.state.value} index={1}>
                <section className="md-content">
                  <div style={{display:"flex"}}>
                    <div className="props" style={{width:"40%", marginRight:"10px"}}>
                      <p>Secret key</p>
                      <TextField
                        id="outlined-multiline-static"
                        rows={1}
                        placeholder="secret key"
                        variant="outlined"
                        value = {this.state.secretKey}
                        fullWidth	={true}
                        name="secretKey"
                        onChange = {this.onChange}
                      />
                    </div>
                    <div className="props" style={{width:"60%"}}>
                      <p>Access key</p>
                      <TextField
                        id="outlined-multiline-static"
                        rows={1}
                        placeholder="access key"
                        variant="outlined"
                        value = {this.state.accessKey}
                        fullWidth	={true}
                        name="accessKey"
                        onChange = {this.onChange}
                      />
                    </div>
                  </div>
                </section>
                <section className="md-content">
                  <div style={{display:"flex"}}>
                    <div className="props" style={{width:"70%", marginRight:"10px"}}>
                      <p>Name</p>
                      <TextField
                        id="outlined-multiline-static"
                        rows={1}
                        placeholder="node name"
                        variant="outlined"
                        value = {this.state.nodeName}
                        fullWidth	={true}
                        name="nodeName"
                        onChange = {this.onChange}
                      />
                    </div>
                    <div className="props" style={{width:"30%"}}>
                      <p>Counts</p>
                      <TextField
                        id="outlined-multiline-static"
                        rows={1}
                        type="number"
                        placeholder="node counts"
                        variant="outlined"
                        value = {this.state.desiredNumber}
                        fullWidth	={true}
                        name="desiredNumber"
                        onChange = {this.onChange}
                      />
                    </div>
                  </div>
                </section>
                
                <section className="md-content">
                  <div>
                    <p>Cluster</p>
                    {/* cluster selector */}
                    <Paper>
                    <Grid rows={this.state.clusters} columns={this.state.columns}>

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
                        onSelectionChange={this.onSelectionChange}
                      />

                      <IntegratedFiltering />
                      <IntegratedSorting />
                      <IntegratedSelection />
                      <IntegratedPaging />

                      {/* 테이블 */}
                      <Table />
                      <TableColumnResizing
                        defaultColumnWidths={this.state.defaultColumnWidths}
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
              </TabPanel>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSave} color="primary">
              update
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

class WorkerGroups extends Component {
  constructor(props){
    super(props);
    this.state = {
      rows : "",
      columns: [
        { name: "worker", title: "Worker" },
        { name: "cluster", title: "Cluster" },
        { name: "min", title: "Min" },
        { name: "max", title: "Max" },
        { name: "desired", title: "Desired" },
      ],
      defaultColumnWidths: [
        { columnName: "worker", width: 150 },
        { columnName: "cluster", width: 130 },
        { columnName: "min", width: 100 },
        { columnName: "max", width: 100 },
        { columnName: "desired", width: 130 },
      ],

      selection: [],
      selectedRow : "",
      value: 0,
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => {
        var result = [];
        res.map(item=>
          item.cluster == this.props.rowData ? result.push(item) : ""
        )
        this.setState({ rows: result });
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
  }

  initState = () => {
    this.setState({
      selection : [],
      selectedRow:"",
    });
  }

  callApi = async () => {
    const response = await fetch(`/aws/clusters/workers?clustername=${this.props.rowData.name}`);
    const body = await response.json();
    return body;
  };

  HeaderRow = ({ row, ...restProps }) => (
    <Table.Row
      {...restProps}
      style={{
        cursor: "pointer",
        backgroundColor: "#ffe7e7",
        // backgroundColor: "whitesmoke",
        // ...styles[row.sector.toLowerCase()],
      }}
      // onClick={()=> alert(JSON.stringify(row))}
    />
  );

  onSelectionChange = (selection) => {
    if (selection.length > 1) selection.splice(0, 1);
    
    this.setState({ selection: selection });
    if(selection.length > 0){
      this.setState({ selectedRow: this.state.rows[selection[0]]})
      this.props.onSelectionChange(this.state.rows[selection[0]])
    } else {
      this.setState({ selectedRow: {} })
      this.props.onSelectionChange(0)
    };
  }

  render(){
    return(
      <div className="inner-table">
        {this.state.rows ? (
        <Grid rows={this.state.rows} columns={this.state.columns}>
          {/* Sorting */}
          <SortingState
            defaultSorting={[{ columnName: "status", direction: "asc" }]}
          />

          <SelectionState
            selection={this.state.selection}
            onSelectionChange={this.onSelectionChange}
          />

          <IntegratedFiltering />
          <IntegratedSorting />

          {/* 테이블 */}
          <Table />
          <TableColumnResizing
            defaultColumnWidths={this.state.defaultColumnWidths}
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
        ) : (
          <CircularProgress
            variant="determinate"
            value={this.state.completed}
            style={{ position: "absolute", left: "50%", marginTop: "20px" }}
          ></CircularProgress>
        )}
      </div>
    )
  }
}


export default NdAddNode;