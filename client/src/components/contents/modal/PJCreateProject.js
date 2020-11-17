import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import SelectBox from "../../modules/SelectBox";
import * as utilLog from '../../util/UtLogs.js';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { TextField, Button, Dialog, DialogActions, DialogContent, IconButton, Typography} from "@material-ui/core";
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
});

class PjCreateProject extends Component {
  constructor(props){
    super(props)
    this.state={
      selectBoxData :[],
      firstValue : "",
      cluster : "",
      project_name : "",
      project_description : "",
      open : false,
    }
    this.onChange = this.onChange.bind(this);
  }

  callApi = async () => {
    const response = await fetch("/clusters/name");
    const body = await response.json();
    return body;
  };

  componentWillMount() {
    // cluster list를 가져오는 api 호출
    this.callApi()
      .then((res) => {
        var data = []
        
        res.map((item)=>{
          data.push({name:item, value:item});
        })
        this.setState({ selectBoxData: data });
        console.log(res[0])
        this.setState({ cluster: res[0], firstValue:res[0] });
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
  }

  onChange(e) {
    console.log("onChangedd");
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    
  };

  handleClose = () => {
    this.setState({
      project_name:"",
      project_description:"",
      cluster:this.state.firstValue,
      open: false
    })
  };

  handleSave = (e) => {
    //Save Changed Taint
    if (this.state.project_name === ""){
      alert("Please insert project name");
      return
    } else if (this.state.cluster === ""){
      alert("Please select cluster");
      return
    }

    const userId = localStorage.getItem("userName");
    utilLog.fn_insertPLogs(userId, 'log-PJ-CR01');

    this.setState({open:false});
    // console.log(this.state.key, this.state.value, this.state.taint)
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

    const onSelectBoxChange = (value) => {
      this.setState({cluster : value});
    }

    // const selectBoxData = [
    //   {name:"NoSchedule", value:"NoSchedule"},
    //   {name:"PreferNoSchedule", value:"PreferNoSchedule"},
    //   {name:"NoExecute", value:"NoExecute"},
    // ]; 
    

    return (
      <div>
        {/* <div
          className="btn-join"
          onClick={this.handleClickOpen}
          style={{
            position: "absolute",
            right: "12px",
            top: "0px",
            zIndex: "10",
          }}
        >
          
        </div> */}
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen} style={{position:"absolute", right:"16px", top:"16px", zIndex:"10", width:"148px", height:"31px", textTransform: "capitalize"}}>
          Create Project
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          fullWidth={false}
          maxWidth={false}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Create Project
          </DialogTitle>
          <DialogContent dividers>
            <div className="pj-create">
              <div className="create-content">
                {/* <input type="text" value={this.state.key} placeholder="key" name="key" onChange={this.onChange}/>
                <input type="text" value={this.state.value} placeholder="value" name="value" onChange={this.onChange}/> */}
                <p>Project</p>
                <TextField
                  id="outlined-multiline-static"
                  label="name"
                  rows={1}
                  placeholder="project name"
                  variant="outlined"
                  value = {this.state.project_name}
                  fullWidth	={true}
                  name="project_name"
                  onChange = {this.onChange}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="decription"
                  multiline
                  rows={2}
                  placeholder="project description"
                  variant="outlined"
                  name="project_description"
                  onChange = {this.onChange}
                  value = {this.state.project_description}
                  fullWidth	={true}
                />
                <p className="pj-cluster">Cluster</p>
                <SelectBox className="selectbox" rows={this.state.selectBoxData} onSelectBoxChange={onSelectBoxChange}  defaultValue={this.state.cluster}></SelectBox>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSave} color="primary">
              save
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

export default PjCreateProject;