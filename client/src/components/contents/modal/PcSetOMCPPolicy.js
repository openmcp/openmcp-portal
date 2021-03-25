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
import Slider from "@material-ui/core/Slider";
import * as utilLog from "../../util/UtLogs.js";
import axios from "axios";

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

// function valuetext(value) {
//   return `${value}°C`;
// }

class PcSetOMCPPolicy extends Component {
  constructor(props) {
    super(props);
    this.g_rate_max = 10;
    this.period_max = 10;
    this.state = {
      title: "",
      policyId : "",
      open: false,
      g_rate_value: [],
      period_value: [],
    };
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
    if (Object.keys(this.props.policy).length === 0) {
      alert("Please Select Policy");
      this.setState({ open: false });
      return;
    }

    let g_rate_start = parseInt(this.props.policy.rate.split('-')[0])
    let g_rate_end = parseInt(this.props.policy.rate.split('-')[1])
    let period_start = parseInt(this.props.policy.period.split('-')[0])
    let period_end = parseInt(this.props.policy.period.split('-')[1])
    
    this.setState({ 
      open: true, 
      title:this.props.policy.policy_name,
      policyId:this.props.policy.policy_id,
      g_rate_value: [g_rate_start, g_rate_end],
      period_value: [period_start, period_end]
    });
    
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = (e) => {
    // console.log(this.state.g_rate_value)
    // console.log(this.state.period_value)

    //Save modification data (Policy Changed)
    const url = `/settings/policy/openmcp-policy`;
    const data = {
      policyId: this.state.policyId,
      rate: {
        start: this.state.g_rate_value[0],
        end: this.state.g_rate_value[1],
      },
      period: {
        start: this.state.period_value[0],
        end: this.state.period_value[1],
      },
    };

    axios.put(url, data)
      .then((res) => {
        console.log("res",res.data)
        if (res.data.data.rowCount > 0) {
          // log - policy update
          
        } else {
          this.props.onUpdateData();
          // console.log("sdfsdf",this.props)
          const userId = localStorage.getItem("userName");
          utilLog.fn_insertPLogs(userId, "log-PO-MD01");
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err);
      });

      // this.props.onUpdateData();

    const userId = localStorage.getItem("userName");
    utilLog.fn_insertPLogs(userId, "log-PD-MD01");
    this.setState({ open: false });
  };

  g_rateate_marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 6,
      label: "6",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 10,
      label: "10",
    },
  ];

  period_marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
  ];

  render() {
    const DialogTitle = withStyles(styles)((props) => {
      const { children, classes, onClose, ...other } = props;
      return (
        <div>
            <MuiDialogTitle
              disableTypography
              className={classes.root}
              {...other}
            >
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
        </div>
      );
    });

    const handleChangeCpu = (e, newValue) => {
      this.setState({
        g_rate_value: newValue,
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
            height: "31px",
            textTransform: "capitalize",
          }}
        >
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
            {this.state.title}
          </DialogTitle>
          <DialogContent dividers>
            <div className="pd-resource-config">
              <div className="res">
                <Typography id="range-slider" gutterBottom>
                  Geo Rate
                </Typography>
                <Slider
                  className="sl"
                  name="g_rate_value"
                  value={this.state.g_rate_value}
                  onChange={handleChangeCpu}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  // getAriaValueText={valuetext}
                  step={null}
                  min={0}
                  max={10}
                  marks={this.g_rateate_marks}
                />
                <div className="txt"></div>
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
                  // getAriaValueText={valuetext}
                  step={null}
                  min={1}
                  max={10}
                  marks={this.period_marks}
                />
                <div className="txt"></div>
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

export default PcSetOMCPPolicy;
