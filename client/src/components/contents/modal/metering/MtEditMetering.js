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
import * as utilLog from "./../../../util/UtLogs.js";
import { AsyncStorage } from "AsyncStorage";

// import axios from 'axios';

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

function valuetext(value) {
  return `${value}°C`;
}

class MtEditMetering extends Component {
  constructor(props) {
    super(props);
    this.cpu_max = 5000;
    this.memory_max = 10000;
    this.state = {
      title: this.props.name,
      open: false,
      cpu_req: "No Request",
      cpu_limit: "Limitless",
      mem_req: "No Request",
      mem_limit: "Limitless",
      // cpu_value : [this.props.resources.cpu_min.replace('m',''),this.props.resources.cpu_max.replace('m','')],
      // mem_value : [this.props.resources.memory_min.replace('Mi',''),this.props.resources.memory_max.replace('Mi','')],
      cpu_value: [0, 0],
      mem_value: [0, 0],
    };
  }
  componentWillMount() {}

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
      cpu_value: [0, 0],
      mem_value: [0, 0],
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = (e) => {
    //Save modification data (Resource Changed)

    let userId = null;
    AsyncStorage.getItem("userName", (err, result) => {
      userId = result;
    });
    utilLog.fn_insertPLogs(userId, "log-PD-MD01");
    this.setState({ open: false });
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

    const handleChangeCpu = (e, newValue) => {
      this.setState({
        cpu_value: newValue,
      });
    };

    const handleChangeMem = (e, newValue) => {
      this.setState({
        mem_value: newValue,
      });
    };

    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          style={{
            position: "absolute",
            right: "0px",
            top: "2px",
            zIndex: "10",
            width: "148px",
            height: "31px",
            textTransform: "capitalize",
          }}
        >
          Edit Metering
        </Button>

        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          fullWidth={false}
          maxWidth={false}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Edit Metering
          </DialogTitle>
          <DialogContent dividers>
            <div className="mt-set-metering">
              <div className="res transfer-price">
                <Typography id="content-title" gutterBottom>
                  Region
                </Typography>
                <div className="txt">
                  Code : KR, Name : Korea
                </div>
              </div>
              <div className="res transfer-price">
                <Typography id="content-title" gutterBottom>
                  Cluster Cost
                </Typography>
                <div className="txt ">
                  <span className="price">$</span>
                  <div className="input-txt">
                    <input type="number" placeholder="0" name="cpu_req" />
                  </div>
                  <span className="per">per hour for each cluster</span>
                </div>
                
              </div>
              <div className="res transfer-price">
                <div style={{display:"flex"}}>
                  <Typography id="content-title" gutterBottom>
                    Worker Node Cost
                  </Typography>
                  
                </div>
                <MtWorkerNodeCost />

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleClickOpen}
                    style={{
                      width: "100%",
                      height: "31px",
                      textTransform: "capitalize",
                      // fontSize:"25px"
                    }}
                  >
                    +
                  </Button>
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

class MtWorkerNodeCost extends Component {
  render() {
    return [
      <div className="txt">
        <div className="input-section">
          <span className="label">vCPU</span>
          <div className="input-txt">
            <input
              type="number"
              placeholder="0"
              name="mem_req"
              style={{ textAlign: "center", padding: "0" }}
            />
          </div>
        </div>

        <div className="input-section">
          <span className="label">Memory</span>
          <div className="input-txt">
            <input
              type="number"
              placeholder="0"
              name="mem_req"
              style={{ textAlign: "center", padding: "0" }}
            />
          </div>
          <span className="label">GB</span>
        </div>

        <div className="input-section">
          <span className="label">Disk</span>
          <div className="input-txt">
            <input
              type="number"
              placeholder="0"
              name="mem_req"
              style={{ textAlign: "center", padding: "0" }}
            />
          </div>
          <span className="label">GB</span>
        </div>

        <div className="input-section">
          <span className="label">Hourly Cost $</span>
          <div className="input-txt">
            <input
              type="number"
              placeholder="0"
              name="mem_req"
              style={{ textAlign: "center", padding: "0" }}
            />
          </div>
        </div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          style={{
            width: "75px",
            height: "31px",
            textTransform: "capitalize",
            // fontSize:"25px"
          }}
        >
          Delete
        </Button>
      </div>

    ];
  }
}

export default MtEditMetering;
