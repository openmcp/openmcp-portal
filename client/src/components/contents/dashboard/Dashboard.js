import React, { Component } from "react";
import { NavigateNext } from "@material-ui/icons";
import { AsyncStorage } from "AsyncStorage";
import { RiDashboardFill } from "react-icons/ri";
import CustomDynamicView from "./CustomDynamicView";
import DashboardSelectModule from "../modal/dashboard/DashboardSelectModule";
import { CircularProgress } from "@material-ui/core";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      reRender: "",
      masterCluster: "",
      componentCodes:"",
      componentList: "",
      myComponentList: "",
    };
  }

  // componentWillMount() {
  // }

  componentWillMount() {
    this.props.menuData("none");
    this.callApi()
      .then((res) => {
        var mycomp = [];
        var comp = [];
        if (res === null) {
          this.setState({ myComponentList: "" });
        } else {
          res.forEach((item) => {
            if (item.mycomp !== null) {
              mycomp.push(item.description);
            } else {
              comp.push(item.description);
            }
          });

          this.setState({
            componentCodes: res,
            componentList: comp,
            myComponentList: mycomp,
          });
        }
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    let userId = null;
    AsyncStorage.getItem("userName", (err, result) => {
      userId = result;
    });
    const response = await fetch(`/apis/dashboard/components?userId=${userId}`);
    const body = await response.json();
    return body;
  };

  onRefresh = () => {
    console.log('onRefresh')
    this.callApi()
      .then((res) => {
        var mycomp = [];
        var comp = [];
        if (res === null) {
          this.setState({ myComponentList: "" });
        } else {
          res.forEach((item) => {
            if (item.mycomp !== null) {
              mycomp.push(item.description);
            } else {
              comp.push(item.description);
            }
          });

          this.setState({
            componentCodes: res,
            componentList: comp,
            myComponentList: mycomp,
          });
        }
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };
  angle = {
    full: {
      startAngle: 0,
      endAngle: 360,
    },
    half: {
      startAngle: 0,
      endAngle: 180,
    },
  };

  render() {
    console.log("dash render")
    return (
      <div className="content-wrapper dashboard-main">
        {/* 컨텐츠 헤더 */}
        <section className="content-header">
          <h1>
            <i>
              <RiDashboardFill />
            </i>
            <span onClick={this.onRefresh} style={{ cursor: "pointer" }}>
              Dashboard
            </span>
            <span>
              {this.state.myComponentList.length > 0 ||
              this.state.componentList.length > 0 ? (
                <DashboardSelectModule
                onUpdateData={this.onRefresh}
                  componentCodes={this.state.componentCodes}
                  componentList={this.state.componentList}
                  myComponentList={this.state.myComponentList}
                />
              ) : (
                <div></div>
              )}
            </span>
            <small></small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <a href="/dashboard">
                <i className="fa fa-dashboard"></i> Home
              </a>
            </li>
            <li className="active">
              <NavigateNext
                style={{ fontSize: 12, margin: "-2px 2px", color: "#444" }}
              />
              Dashboard
            </li>
          </ol>
        </section>

        {/* 컨텐츠 내용 */}

        {this.state.myComponentList ? (
          [
            <section className="content" style={{ minWidth: 1160 }}>
              <CustomDynamicView myComponentList={this.state.myComponentList} />
            </section>,
          ]
        ) : (
          <CircularProgress
            variant="determinate"
            value={this.state.completed}
            style={{ position: "absolute", left: "50%", marginTop: "20px" }}
          ></CircularProgress>
        )}
      </div>
    );
  }
}

// class DashboardCard02 extends Component {
//   render() {
//     return (
//       <div className="content-box" style={{ width: this.props.width }}>
//       <div className="cb-header">
//         <span>{this.props.title}</span>
//         {/* <div className="cb-btn">
//           <Link to={this.props.path}>detail</Link>
//         </div> */}
//       </div>
//       <div
//         className="cb-body"
//         style={{ position: "relative", width: "100%", display:"flex"}}
//       >
//         <PieHalfReChart data={this.props.data.cpu} angle={this.props.angle}></PieHalfReChart>
//         <PieHalfReChart data={this.props.data.memory} angle={this.props.angle}></PieHalfReChart>
//         <PieHalfReChart data={this.props.data.storage} angle={this.props.angle}></PieHalfReChart>
//       </div>
//     </div>
//     );
//   }
// }

export default Dashboard;
