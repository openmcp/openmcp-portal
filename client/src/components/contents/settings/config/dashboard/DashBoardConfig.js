import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { AsyncStorage } from "AsyncStorage";
import { Button, TextField } from "@material-ui/core";
import Axios from "axios";

class DashBoardConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cycle: 0,
    };
  }

  componentWillMount() {
    let cycle = 0;
    AsyncStorage.getItem("dashboard-cycle", (err, result) => {
      cycle = result;
    });

    this.setState({ cycle: cycle });
  }

  render() {
    return (
      <div className="sub-content-wrapper fulled">
        <section className="content" style={{ position: "relative" }}>
          <Paper>
            {this.state.cycle > 0 ? (
              <DashBoardConfigSet data={this.state.cycle} />
            ) : null}
          </Paper>
        </section>
      </div>
    );
  }
}

class DashBoardConfigSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cycle: this.props.data,
    };
  }

  onChange = (e) => {
    this.setState({
      cycle: e.target.value,
    });
  };

  onSave = () => {
    if (parseInt(this.state.cycle) < 5) {
      alert("Please enter greater than 5(seconds)");
      return;
    }

    const url = `/apis/config-codes/dashboard-config`;
    const data = {
      config: parseInt(this.state.cycle),
    };

    Axios.put(url, data)
      .then((res) => {
        alert(res.data.message);
        AsyncStorage.setItem("dashboard-cycle", this.state.cycle);
      })
      .catch((err) => {
        alert(err);
      });
  };

  render() {
    return (
      <div className="dash-config">
        <span>Refresh-Cycle(second)</span>
        <TextField
          id="outlined-multiline-static"
          rows={1}
          placeholder="group role name"
          variant="outlined"
          value={this.state.cycle}
          fullWidth={true}
          name="groupName"
          onChange={this.onChange}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={this.onSave}
          style={{
            width: "100px",
            height: "31px",
            textTransform: "capitalize",
            float: "right",
            margin: "0px 15px",
            padding: "18px",
          }}
        >
          save
        </Button>

      </div>
    );
  }
}

export default DashBoardConfig;
