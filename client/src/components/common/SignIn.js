import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import SignUp from "./SignUp";
import axios from "axios";
import * as utilLog from "./../util/UtLogs.js";
import { AsyncStorage } from "AsyncStorage";

// AsyncStorage 사용방법
// var username = "test"
// AsyncStorage.setItem("userName", username)
// var userId = ""
// AsyncStorage.getItem("userName",(err, result) => { userId = result})

// localStorage 사용방법
// localStorage.setItem("token", "lkwejflkawef");
// localStorage.getItem("token")

class SignIn extends Component {
  constructor(props) {
    super(props);
    let token = null;
    AsyncStorage.getItem("token", (err, result) => {
      token = result;
    });

    let loggedIn = true;
    if (token === null || token === "null" || token === "") {
      loggedIn = false;
    }

    this.state = {
      username: "",
      password: "",
      loggedIn,
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    //log - login page view
    utilLog.fn_insertPLogs("beforeLogin", "log-LG-VW01");
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();

    var originText = "openmcp-client:openmcp-secret";
    console.log("Original : ", originText);

    // Base64 Encoding
    let base64EncodedText = Buffer.from(originText, "utf8").toString("base64");
    console.log("Base64 Encoded Text : ", base64EncodedText);

    // Base64 Decoding
    let base64DecodedText = Buffer.from(base64EncodedText, "base64").toString(
      "utf8"
    );
    console.log("Base64 Decoded Text : ", base64DecodedText);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic b3Blbm1jcC1jbGllbnQ6b3Blbm1jcC1zZWNyZXQ=`,
        // 'Authorization': `Bearer 01143dd36cb5b363c740678743ff740d295b516e`,
      },
    };
    const { username, password } = this.state;
    const url = `/oauth/token`;
    const data = `grant_type=password&username=${username}&password=${password}`;

    axios
      .post(url, data, config)
      .then((res, err) => {
        if (res.data.access_token !== "fail") {
          AsyncStorage.setItem("token", res.data.access_token);
          AsyncStorage.setItem("refreshToken", res.data.refresh_token);
          
          const url = `/user_login`;
          const data = {
            userid: username,
            password: password,
          };
          axios
          .post(url, data)
          .then((res, err) => {
            if (res.data.data.rowCount > 0) {
              AsyncStorage.setItem("userName", username);
              AsyncStorage.setItem("roles", res.data.data.rows[0].role_id);
              AsyncStorage.setItem("refreshToken", res.data.refresh_token);
              AsyncStorage.setItem("projects",res.data.data.rows[0].projects);

                // var projects;
                // AsyncStorage.getItem("projects",(err, result) => {
                //   projects = result.split(",");
                // })

                this.setState({
                  loggedIn: true,
                });

                // log - logined
                utilLog.fn_insertPLogs(username, "log-LG-LG01");
              } else {
                alert(res.data.data.message);
              }
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          alert(res.data.refresh_token);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/dashboard"></Redirect>;
    }
    return (
      <div className="login">
        <div className="login-form">
          <h1>OpenMCP-Portal</h1>
          <form onSubmit={this.submitForm} style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <input className="btn-signIn" type="submit" value="Sign In" />
          </form>
          {/* <SignUp></SignUp> */}
        </div>
      </div>
    );
  }
}
export default SignIn;
