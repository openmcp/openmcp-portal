import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import SignUp from "./SignUp";
import axios from 'axios';
import * as utilLog from './../util/UtLogs.js';
import { AsyncStorage } from 'AsyncStorage';


class SignIn extends Component {
  constructor(props) {
    super(props);
    // const token = localStorage.getItem("token")
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
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


  componentDidMount(){
    //log - login page view 
    utilLog.fn_insertPLogs('beforeLogin', 'log-LG-VW01');
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    const { username, password } = this.state;
      const url = `/user_login`;
      const data = {
        userid:username,
        password:password,
      };
      axios.post(url, data)
      .then((res) => {
        if(res.data.data.rowCount > 0 ){
          localStorage.setItem("token", "asdlfkasjldkfjlkwejflkawef");
          localStorage.setItem("userName", username);
          localStorage.setItem("roles", res.data.data.rows[0].roles);
          // AsyncStorage.setItem('clusterName',row.cluster);
          this.setState({
            loggedIn: true,
          });

          // log - logined
          utilLog.fn_insertPLogs(username, 'log-LG-LG01');
        } else {
          alert(res.data.message);
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

