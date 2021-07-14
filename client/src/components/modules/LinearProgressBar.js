import React, { Component } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

class LinearProgressBar extends Component {
  constructor(props){
    super(props);
    this.state={
      value : 20,
      total : 100,
      progress : 20
    }
  }

  componentWillMount(){
    if(this.state.percentage === null){
      this.setState({progress: this.state.value / this.state.total * 100})
    }
  }
  render() {
    return (
      <div className="linear-progress">
        <LinearProgress variant="determinate" value={this.state.progress} />
      </div>
    );
  }
}

export default LinearProgressBar;