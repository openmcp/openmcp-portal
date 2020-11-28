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

class PcSetPolicy extends Component {
  constructor(props){
    super(props)
    this.geo_r_max = 10;
    this.period_max = 10;
    this.resource = {
      geo_r_min: "0",
      geo_r_max: "2",
      period_min: "1",
      period_max: "5"
    }
    this.state={
      title : this.props.policy,
      open : false,
      geo_r_req : "No Request",
      geo_r_limit : "Limitless",
      period_req : "No Request",
      period_limit : "Limitless",
      geo_r_value : [this.resource.geo_r_min,this.resource.geo_r_max],
      period_value : [this.resource.period_min,this.resource.period_max],
    }
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    console.log(this.props.policy)
  }

  onChange(e) {
    // console.log("onChangedd");
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClickOpen = () => {
    if (Object.keys(this.props.policy).length === 0) {
      alert("please select account");
      this.setState({ open: false });
      return;
    }
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = (e) => {
    // console.log(this.state.geo_r_value)
    // console.log(this.state.period_value)
    
    //Save modification data (Policy Changed)
    // YAML SET

    const userId = localStorage.getItem("userName");
    utilLog.fn_insertPLogs(userId, 'log-PD-MD01');
    this.setState({open:false});
  };

  geo_rate_marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 8,
      label: '8',
    },
    {
      value: 10,
      label: '10',
    },
  ];

  period_marks_ = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 10,
      label: '10',
    }
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
        geo_r_value: newValue,
      });
    };
    
    const handleChangePeriod = (e, newValue) => {
      this.setState({
        period_value: newValue,
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
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen} style={{position:"absolute", right:"26px", top:"26px", zIndex:"10", width:"148px", height:"31px", textTransform: "capitalize"}}>
          edit policy 
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          fullWidth={false}
          maxWidth={false}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {this.props.policy.name}
          </DialogTitle>
          <DialogContent dividers>
            <div className="pd-resource-config">
              <div className="res">
                <Typography id="range-slider" gutterBottom>
                  Geo Rate
                </Typography>
                <Slider
                  className="sl"
                  name="geo_r_value"
                  value={this.state.geo_r_value}
                  onChange={handleChangeCpu}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                  step={2}
                  min={0}
                  max={10}
                  marks={this.geo_rate_marks}
                />
                <div className="txt">
                </div>
              </div>
              <div className="res">
                <Typography id="range-slider" gutterBottom>
                    Period
                </Typography>
                <Slider
                  className="sl"
                  name="period_value"
                  value={this.state.period_value}
                  onChange={handleChangePeriod}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                  step={5}
                  min={1}
                  max={10}
                  marks={this.period_marks}
                />
                <div className="txt">
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

export default PcSetPolicy;