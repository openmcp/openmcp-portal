import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import SelectBox from "../../modules/SelectBox";
import * as utilLog from '../../util/UtLogs.js';
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

class NdTaintConfig extends Component {
  constructor(props){
    super(props)
    this.cpu_max = 5;
    this.memory_max = 10000;
    this.taint_list = ["NoSchedule","PreferNoSchedule","NoExecute"];
    this.state={
      key:this.props.taint.key,
      value:this.props.taint.value,
      title : this.props.name,
      open : false,
      taint : this.taint_list.find(item => item === this.props.taint.taint) ? this.props.taint.taint : "NoSchedule"
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
  }

  onChange(e) {
    // console.log("onChangedd");
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = (e) => {
    //Save Changed Taint
    if (this.state.key === ""){
      alert("Please enter taint key");
      return
    } else if (this.state.value === ""){
      alert("Please enter taint value");
      return
    }

    const userId = localStorage.getItem("userName");
    utilLog.fn_insertPLogs(userId, 'log-ND-MD01');
    // console.log(this.state.key, this.state.value, this.state.taint)
    this.setState({open:false});
  };

  
  onSelectBoxChange = (value) => {
    this.setState({taint : value});
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
              <CloseIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
      );
    });

    const selectBoxData = [
      {name:"NoSchedule", value:"NoSchedule"},
      {name:"PreferNoSchedule", value:"PreferNoSchedule"},
      {name:"NoExecute", value:"NoExecute"},
    ]; 


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
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen} style={{position:"absolute", right:"0px", top:"0px", zIndex:"10", width:"148px", height:"31px", textTransform: "capitalize"}}>
          config taint
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          fullWidth={false}
          maxWidth={false}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Taint
          </DialogTitle>
          <DialogContent dividers>
            <div className="nd-taint-config">
              <div className="taint">
                <input type="text" value={this.state.key} placeholder="key" name="key" onChange={this.onChange}/>
                <input type="text" value={this.state.value} placeholder="value" name="value" onChange={this.onChange}/>



                <SelectBox className="selectbox" rows={selectBoxData} onSelectBoxChange={this.onSelectBoxChange}  defaultValue={this.state.taint}></SelectBox>
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

export default NdTaintConfig;