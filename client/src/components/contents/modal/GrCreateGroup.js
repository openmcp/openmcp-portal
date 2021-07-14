import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
// import SelectBox from "../../modules/SelectBox";
import * as utilLog from "../../util/UtLogs.js";
import { AsyncStorage } from 'AsyncStorage';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  TextField,
} from "@material-ui/core";
import {
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
  TableColumnResizing,
  TableHeaderRow,
  PagingPanel,
  TableSelection,
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";
import axios from 'axios';
import LensIcon from '@material-ui/icons/Lens';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

// import Typography from "@material-ui/core/Typography";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import IconButton from "@material-ui/core/IconButton";
// import axios from 'axios';
// import { ContactlessOutlined } from "@material-ui/icons";

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
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
});

class GrCreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName : "",
      description : "",
      open: false,

      rows : [],

      selectedRoleIds : [],
      roleSelectionId : [],

      selectedUserIds : [],
      userSelectionId : [],

      activeStep : 0,
    };
    // this.onChange = this.onChange.bind(this);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentWillMount() {
  }

  handleClickOpen = () => {
    this.setState({ 
      open: true,
      roleSelection : []
    });
  };

  handleClose = () => {
    this.setState({
      groupName : "",
      description : "",
      rows : [],
      selectedRoleIds : [],
      roleSelectionId : [],
      selectedUserIds : [],
      userSelectionId : [],
      activeStep : 0,
      open: false,
    });
    this.props.menuClose();
  };

  handleSave = (e) => {
  if (this.state.groupName === "") {
    alert("Please insert 'group name' data");
    return;
  } else if (this.state.description === "") {
    alert("Please insert 'description' data");
    return;
  } else if (Object.keys(this.state.selectedRoleIds).length === 0) {
    alert("Please select roles");
    return;
  } else if (Object.keys(this.state.selectedUserIds).length === 0) {
    alert("Please select users");
    return;
  }

    // Update user role
    const url = `/settings/group-role`;
      const data = {
        groupName:this.state.groupName,
        description:this.state.description,
        role_id:this.state.selectedRoleIds,
        user_id:this.state.selectedUserIds,
      };
      axios.post(url, data)
      .then((res) => {
          alert(res.data.message);
          this.setState({ open: false });
          this.props.menuClose();
          this.props.onUpdateData();
      })
      .catch((err) => {
          alert(err);
      });


    // loging deployment migration
    let userId = null;
    AsyncStorage.getItem("userName",(err, result) => { 
      userId= result;
    })
    utilLog.fn_insertPLogs(userId, "log-PJ-MD01");

    //close modal popup
    this.setState({ open: false });
  };

  onSelectRoles = (rows, selectionId) => {
    let roleIds = [];
    rows.map((role) => {
      roleIds.push(role.role_id);
    });

    this.setState({
      selectedRoleIds : roleIds,
      roleSelectionId : selectionId
    })
  }

  onSelectUsers = (rows, selectionId) => {
    let userIds = [];
    rows.map((user) => {
      userIds.push(user.user_id);
    });

    this.setState({
      selectedUserIds : userIds,
      userSelectionId : selectionId
    })
  }

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
              <CloseIcon/>
            </IconButton>
          ) : null}
        </MuiDialogTitle>
      );
    });

    const steps = ['Set Group Informations', 'Select Group Roles', 'Select Group Users'];
    const handleNext = () => {
      switch (this.state.activeStep){
        case 0 :
          if (this.state.groupName === "") {
            alert("Please insert 'group name' data");
            return;
          } else if (this.state.description === "") {
            alert("Please insert 'description' data");
            return;
          } else {
            this.setState({activeStep : this.state.activeStep + 1});
            return;
          }
        case 1:
          if (Object.keys(this.state.selectedRoleIds).length === 0) {
            alert("Please select roles");
            return;
          } else {
            this.setState({activeStep : this.state.activeStep + 1});
            return;
          }
      }
    };
  
    const handleBack = () => {
      this.setState({activeStep : this.state.activeStep - 1});
    };
    return (
      <div>
        <div
          onClick={this.handleClickOpen}
          style={{
            zIndex: "10",
            width: "148px",
            textTransform: "capitalize",
          }}
        >
          Create Group
        </div>
        <Dialog
          // onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          fullWidth={false}
          maxWidth="md"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Create Group Role
          </DialogTitle>
          <DialogContent dividers>
            <div className="md-contents-body small-grid">
            <Stepper activeStep={this.state.activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
            <Typography>
              {this.state.activeStep === 0 ? (
                <div>
                  <section className="md-content">
                    <p>Group Role Name</p>
                    <TextField
                      id="outlined-multiline-static"
                      rows={1}
                      placeholder="group role name"
                      variant="outlined"
                      value={this.state.groupName}
                      fullWidth={true}
                      name="groupName"
                      onChange={this.onChange}
                    />
                  </section>
                  <section className="md-content">
                    <p>Description</p>
                    <TextField
                      id="outlined-multiline-static"
                      rows={1}
                      placeholder="group information"
                      variant="outlined"
                      value={this.state.description}
                      fullWidth={true}
                      name="description"
                      onChange={this.onChange}
                    />
                  </section>
                </div>
              ) : this.state.activeStep === 1 ? (
                <section className="md-content">
                  <GrRoles 
                    selection={this.state.roleSelectionId}
                    onSelectedRoles={this.onSelectRoles}
                  />
                </section>
              ) : (
                <section className="md-content">
                  <GrUsers 
                    selection={this.state.userSelectionId}
                    onSelectedUsers={this.onSelectUsers}
                  />
                </section>
              )}
            </Typography>
          </div>
              
             
            </div>
          </DialogContent>
          <DialogActions>
            <div>
              <Button
                disabled={this.state.activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              {this.state.activeStep === steps.length - 1 ? (
                <Button onClick={this.handleSave} color="primary">
                  save
                </Button>
              ) : (
                <Button color="primary" onClick={handleNext}>
                  next
                </Button>
              )}
              
            </div>
            {/* <Button onClick={this.handleSave} color="primary">
              save
            </Button> */}
            <Button onClick={this.handleClose} color="primary">
              cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

class GrRoles extends Component{
  constructor(props){
    super(props);
    this.state = {
      columns: [
        { name: "role_name", title: "Role" },
        { name: "description", title: "Description" },
        { name: "role_id", title: "Role id" },
      ],
      defaultColumnWidths: [
        { columnName: "role_name", width: 200 },
        { columnName: "description", width: 480 },
        { columnName: "role_id", width: 0 },
      ],
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 5,
      pageSizes: [5, 10, 15, 0],
      rows:[],
      selection: this.props.selection,
      selectedRow : [],
    }
  }

  callApi = async () => {
    const response = await fetch("/account-roles");
    const body = await response.json();
    return body;
  };

  componentWillMount(){
    this.callApi()
    .then((res) => {
      this.setState({ rows: res});
      let selectedRows = [];
      this.props.selection.map((id) => {
        selectedRows.push(res[id]);
      });
      this.setState({ selectedRow: selectedRows});
      })
      .catch((err) => console.log(err));
  }

  render(){
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

    const onSelectionChange = (selection) => {
      let selectedRows = [];
      selection.map((id) => {
        selectedRows.push(this.state.rows[id]);
      });
      this.setState({ selectedRow: selectedRows});
      this.setState({ selection: selection });

      this.props.onSelectedRoles(selectedRows, selection);
    };

    return(
      <div>
        <p>Select Group Roles</p>
          <div id="md-content-info" style={{display:"block", minHeight:"95px",marginBottom:"10px"}}>
              {this.state.selectedRow.length > 0 
                ? this.state.selectedRow.map((row)=>{
                  return (
                    <span>
                      <LensIcon style={{fontSize:"8px", marginRight:"5px"}}/>
                      {row.role_name}
                    </span>
                  );
                }) 
                : <div style={{
                  color:"#9a9a9a",
                  textAlign: "center",
                  paddingTop: "30px"}}>
                    Please Select Roles
                  </div>}
          </div>
        {/* <p>Select Role</p> */}
        <Paper>
          <Grid rows={this.state.rows} columns={this.state.columns}>
            {/* <Toolbar /> */}
            {/* 검색 */}
            {/* <SearchState defaultValue="" />
            <SearchPanel style={{ marginLeft: 0 }} /> */}

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
            <Table />
            <TableColumnResizing
              defaultColumnWidths={this.state.defaultColumnWidths}
            />
            <TableHeaderRow
              showSortingControls
              rowComponent={HeaderRow}
            />
            <TableColumnVisibility
              defaultHiddenColumnNames={['role_id']}
            />
            <TableSelection
              selectByRowClick
              highlightRow
            />
          </Grid>
        </Paper>
      </div>
    );
  }
}

class GrUsers extends Component{
  constructor(props){
    super(props);
    this.state = {
      columns: [
        { name: "user_id", title: "User ID" },
        { name: "role", title: "Roles" },
      ],
      defaultColumnWidths: [
        { columnName: "user_id", width: 200 },
        { columnName: "role", width: 500 },
      ],
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 5,
      pageSizes: [5, 10, 15, 0],
      rows:[],
      selection: this.props.selection,
      selectedRow : [],
    }
  }

  callApi = async () => {
    const response = await fetch("/settings/accounts");
    const body = await response.json();
    return body;
  };

  componentWillMount(){
    this.callApi()
      .then((res) => {
        this.setState({ rows: res});
        let selectedRows = [];
        this.props.selection.map((index) => {
          selectedRows.push(res[index]);
        });
        this.setState({ selectedRow: selectedRows});
        })
      .catch((err) => console.log(err));
  }

  render(){
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

    const onSelectionChange = (selection) => {
      let selectedRows = [];
      selection.map((id) => {
        selectedRows.push(this.state.rows[id]);
      });
      this.setState({ selectedRow: selectedRows});
      this.setState({ selection: selection });

      this.props.onSelectedUsers(selectedRows, selection);
    };

    return(
      <div>
        <p>Select Users</p>
          <div id="md-content-info" style={{display:"block", minHeight:"95px",marginBottom:"10px"}}>
              {this.state.selectedRow.length > 0 
                ? this.state.selectedRow.map((row)=>{
                  return (
                    <span>
                      <LensIcon style={{fontSize:"8px", marginRight:"5px"}}/>
                      {row.user_id}
                    </span>
                  );
                }) 
                : <div style={{
                  color:"#9a9a9a",
                  textAlign: "center",
                  paddingTop: "30px"}}>
                    Please Select Roles
                  </div>}
          </div>
        {/* <p>Select Role</p> */}
        <Paper>
          <Grid rows={this.state.rows} columns={this.state.columns}>
            {/* <Toolbar /> */}
            {/* 검색 */}
            {/* <SearchState defaultValue="" />
            <SearchPanel style={{ marginLeft: 0 }} /> */}

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
            <Table />
            <TableColumnResizing
              defaultColumnWidths={this.state.defaultColumnWidths}
            />
            <TableHeaderRow
              showSortingControls
              rowComponent={HeaderRow}
            />
            <TableColumnVisibility
              defaultHiddenColumnNames={['role_id']}
            />
            <TableSelection
              selectByRowClick
              highlightRow
            />
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default GrCreateGroup;
