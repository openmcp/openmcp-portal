import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
// import { debug } from "request";

const styles = (props) => ({
  normalColor: {
    backgroundColor: "#3f51b5",
  },
  normalBaseColor: {
    backgroundColor: "#ffffff",
  },
  warnColor: {
    backgroundColor: "#FFA228",
  },
  warnBaseColor: {
    backgroundColor: "#FDEFCF",
  },
  dangerColor: {
    backgroundColor: "#FF3628",
  },
  dangerBaseColor: {
    backgroundColor: "#FFD5C4",
  },
});

class LinearProgressBar2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      total: this.props.total,
      color: this.props.classes.normalColor,
      baseColor: this.props.classes.normalBaseColor,
    };
  }

  componentWillMount() {
      this.setState({
        color: this.props.classes.normalColor,
        baseColor: this.props.classes.normalBaseColor,
      });
  }
  render() {
    // const { classes } = this.props;
    return (
      <div className="linear-progress">
        <LinearProgress
          {...this.props}
          variant="determinate"
          value={(this.state.value / this.state.total) * 100}
          classes={{
            colorPrimary: this.state.baseColor,
            barColorPrimary: this.state.color,
          }}
        />
        {/* .VolumeBar > * { background-color:green; }
.VolumeBar{background-color:gray ;} */}
      </div>
    );
  }
}

export default withStyles(styles)(LinearProgressBar2);
