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
    this.cpu_max = 5;
    this.memory_max = 10000;
    this.state={
      title : this.props.name,
      open : false,
      cpu_req : "No Request",
      cpu_limit : "Limitless",
      mem_req : "No Request",
      mem_limit : "Limitless",
      cpu_value : [this.props.resources.cpu_min,this.props.resources.cpu_max],
      mem_value : [this.props.resources.memory_min,this.props.resources.memory_max],
    }
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
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
    this.setState({ open: false });
  };

  handleSave = (e) => {
    //Save modification data (Resource Changed)
  };

  cpu_marks = [
    {
      value: 0,
      label: 'No Request',
    },
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
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
    console.log("render");
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
                  CPU (Core)
                </Typography>
                <Slider
                  className="sl"
                  name="cpu_value"
                  value={this.state.cpu_value}
                  onChange={handleChangeCpu}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                  step={1}
                  min={0}
                  max={5}
                  marks={this.cpu_marks}
                />
                <div className="txt">
                  <span>Request : </span>
                  <div className="input-txt">
                    <input type="number" placeholder="No Request" name="cpu_req" 
                      value={
                          this.state.cpu_value[0] === 0 ? "No Request" : this.state.cpu_value[0]
                      }
                      onChange={this.onChange} />
                    <span>Core</span>
                  </div>


                  <span>Limit : </span>
                  <div className="input-txt">
                    <input type="number" placeholder="Limiteless" name="cpu_limit" 
                      value={
                        this.state.cpu_value[1] === this.cpu_max ? "Limiteless" : this.state.cpu_value[1]
                      } 
                      onChange={this.onChange} />
                      <span>Core</span>
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
                            this.state.mem_value[0] === 0 ? "No Request" : this.state.mem_value[0]
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