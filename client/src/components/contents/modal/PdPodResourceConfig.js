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
import Slider from '@material-ui/core/Slider';
import * as utilLog from './../../util/UtLogs.js';
import { AsyncStorage } from 'AsyncStorage';
import axios from 'axios';

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

class PdPodResourceConfig extends Component {
  constructor(props){
    super(props)
    this.cpu_max = 5000;
    this.memory_max = 10000;
    this.state={
      title : this.props.data.name,
      open : false,
      cpu_req : "No Request",
      cpu_limit : "Limitless",
      mem_req : "No Request",
      mem_limit : "Limitless",
      // cpu_value : [this.props.resources.cpu_min.replace('m',''),this.props.resources.cpu_max.replace('m','')],
      // mem_value : [this.props.resources.memory_min.replace('Mi',''),this.props.resources.memory_max.replace('Mi','')],
      cpu_value : [0, 0],
      mem_value : [0, 0]
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
    let resource = this.props.data.resources
    let cpu_req = resource[0].requests.cpu == "-" ? "No Request" : parseInt(resource[0].requests.cpu.split("m")[0]);
    let cpu_limit = resource[0].limits.cpu == "-" ? "Limitless" : parseInt(resource[0].limits.cpu.split("m")[0]);
    let mem_req = resource[0].requests.memory == "-" ? "No Request" :parseInt(resource[0].requests.memory.split("Mi")[0]);
    let mem_limit = resource[0].limits.memory == "-" ? "Limitless" : parseInt(resource[0].limits.memory.split("Mi")[0]);
    let cpu_value = [
      resource[0].requests.cpu === "-" ? 0 : parseInt(resource[0].requests.cpu.split("m")[0]),
      resource[0].limits.cpu === "-" ? this.cpu_max : parseInt(resource[0].limits.cpu.split("m")[0]),
      ];
    let mem_value = [
      resource[0].requests.memory === "-" ? 0 : parseInt(resource[0].requests.memory.split("Mi")[0]),
      resource[0].limits.memory === "-" ? this.memory_max : parseInt(resource[0].limits.memory.split("Mi")[0]),
      ];
    this.setState({
      open: true,
      cpu_req : cpu_req,
      cpu_limit : cpu_limit,
      mem_req : mem_req,
      mem_limit : mem_limit,
      cpu_value : cpu_value,
      mem_value : mem_value,
    })
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = (e) => {
    //Save modification data (Resource Changed)
    let value = {
      "spec": {
        "template": {
          "spec": {
            "containers": [
              // {
              //   "name": "nginx",
              //   "resources": {"requests": { "cpu": "200m" }}
              // }
            ]
          }
        }
      }
    }
    this.props.data.resources.forEach((item) => {
      let resourceObj = {
        name : item.name,
        resources:{}
      }

      let cpu_value = this.state.cpu_value;
      let mem_value = this.state.mem_value;

      if(cpu_value[0] !== 0 && cpu_value[0] !== this.cpu_max){
        resourceObj.resources.requests = {}
        resourceObj.resources.requests.cpu = cpu_value[0] + "m";
      }

      if(cpu_value[1] !== 0 && cpu_value[1] !== this.cpu_max){
        resourceObj.resources.limits = {}
        resourceObj.resources.limits.cpu = cpu_value[1] + "m";
      }

      if(mem_value[0] !== 0 && mem_value[0] !== this.memory_max){
        if(!resourceObj.resources.hasOwnProperty("requests")){
          resourceObj.resources.requests = {}
        }
        resourceObj.resources.requests.memory = mem_value[0] + "Mi";
      }

      if(mem_value[1] !== 0 && mem_value[1] !== this.memory_max){
        if(!resourceObj.resources.hasOwnProperty("limits")){
          resourceObj.resources.limits = {}
        }
        resourceObj.resources.limits.memory = mem_value[1] + "Mi";
      }

      value.spec.template.spec.containers.push(resourceObj);
    });

    // Save modification data (Policy Changed)
    const url = `/apis/deployments/resources`;
    const data = {
      deployment : this.props.data.name,
      namespace : this.props.data.project,
      cluster : this.props.data.cluster,
      resources: value,
    };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.length > 0) {
          if (res.data[0].code == 200) {
            this.props.refresh()

            let userId = null;
            AsyncStorage.getItem("userName", (err, result) => {
              userId = result;
            });
            utilLog.fn_insertPLogs(userId, "log-DP-MD01");
          }
          alert(res.data[0].text);
        }
      })
      .catch((err) => {
        alert(err);
      });
    this.setState({ open: false });

    let userId = null;
    AsyncStorage.getItem("userName",(err, result) => { 
      userId= result;
    })
    utilLog.fn_insertPLogs(userId, 'log-DP-MD01');
    this.setState({open:false});
  };

  cpu_marks = [
    {
      value: 0,
      label: 'No Request',
    },
    {
      value: 1000,
      label: '1000',
    },
    {
      value: 2000,
      label: '2000',
    },
    {
      value: 3000,
      label: '3000',
    },
    {
      value: 4000,
      label: '4000',
    },
    {
      value: 5000,
      label: 'Limitless',
    },
  ];

  mem_marks = [
    {
      value: 0,
      label: 'No Request',
    },
    {
      value: 1000,
      label: '1000',
    },
    {
      value: 2000,
      label: '2000',
    },
    {
      value: 4000,
      label: '4000',
    },
    {
      value: 8000,
      label: '8000',
    },
    {
      value: 10000,
      label: 'Limitless',
    },
  ];

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
          resource config
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          fullWidth={false}
          maxWidth={false}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Pod Resource Configration
          </DialogTitle>
          <DialogContent dividers>
            <div className="pd-resource-config">
              <div className="res">
                <Typography id="range-slider" gutterBottom>
                  CPU (Milli Core)
                </Typography>
                <Slider
                  className="sl"
                  name="cpu_value"
                  value={this.state.cpu_value}
                  onChange={handleChangeCpu}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                  step={10}
                  min={0}
                  max={5000}
                  marks={this.cpu_marks}
                />
                <div className="txt">
                  <span>Request : </span>
                  <div className="input-txt">
                    <input type="number" placeholder="No Request" name="cpu_req" 
                      value={
                          this.state.cpu_value[0]  === 0 ? "No Request" : this.state.cpu_value[0]
                      }
                      onChange={this.onChange} />
                    <span>m</span>
                  </div>


                  <span>Limit : </span>
                  <div className="input-txt">
                    <input type="number" placeholder="Limiteless" name="cpu_limit" 
                      value={
                        this.state.cpu_value[1] === this.cpu_max ? "Limiteless" : this.state.cpu_value[1]
                      } 
                      onChange={this.onChange} />
                      <span>m</span>
                  </div>
                </div>
              </div>
              <div className="res">
                <Typography id="range-slider" gutterBottom>
                    Memory (Mi)
                </Typography>
                <Slider
                  className="sl"
                  name="mem_value"
                  value={this.state.mem_value}
                  onChange={handleChangeMem}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                  step={1000}
                  min={0}
                  max={10000}
                  marks={this.mem_marks}
                />
                <div className="txt">
                  <span>Request : </span>
                  <div className="input-txt">
                    <input type="number" placeholder="No Request" name="mem_req" 
                          value={
                            this.state.mem_value[0]  === 0 ? "No Request" : this.state.mem_value[0]
                          }
                          onChange={this.onChange} 
                    />
                    <span>Mi</span>
                  </div>
                  <span>Limit : </span>
                  <div className="input-txt">
                    <input type="number" placeholder="Limiteless" name="mem_limit"
                      value={
                        this.state.mem_value[1] === this.memory_max ? "Limiteless" : this.state.mem_value[1]
                      } 
                      onChange={this.onChange} />
                    <span>Mi</span>
                  </div>
                </div>
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

export default PdPodResourceConfig;