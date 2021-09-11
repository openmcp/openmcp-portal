// UtLogs is group of functions what writing portal users behaviors
// import * as noti from "./../modules/Notification.js";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export function fn_bgThresholdCheck() {
//   console.log("thrsh");
//   checkResource();
//   this.timer = setInterval(checkResource, 8000);
//   // clearInterval(this.timer);
// }

class BgThresholdCheck extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.timer = setInterval(this.checkResource, 10000);
    clearInterval(this.timer);
  }

  callApi = async () => {

    //실제 호출할 API를 정의 하고 데이터를 수집한다.
    //전체 노드에 대해 호출한다. (CPU, RAM, STORAGE) 사용량
    const response = await fetch(
      `/nodes/cluster2-master.dev.gmd.life?clustername=cluster2`
    );
    const body = await response.json();
    return body;
  };

  handleClick = (url) => {
    this.props.propsData.info.history.push(url);
  };

  checkResource = () => {
    //임계가 설정된 노드들의 CPU,RAM,DISK정보를 수집한뒤
    this.callApi()
      .then((res) => {
        //임계와 비교하여 임계치를 넘어가는 노드들에 대해 알림을 띄운다.
        let cpuUsage = res.node_resource_usage.cpu.status[0].value;
        let cpuTotal = res.node_resource_usage.cpu.status[1].value;
        let used = (cpuUsage / cpuTotal) * 100;
        console.log("res: ", cpuUsage);
        console.log("res2: ", cpuTotal);
        console.log("used: ", used);

        let url = "/nodes/cluster2-master.dev.gmd.life?clustername=cluster2";

        if (used > 6.2) {
          toast.warn("warn : " + used, {
            toastId: "w"+"customId",
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false,
            onClick: (props) => this.handleClick(url),
          });
        } else if (used > 3.0) {
          toast.error("danger : " + used, {
            toastId: "d"+"customId",
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: false,
            onClick: (props) => this.handleClick(url),
          });
        }
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <ToastContainer />
      </div>
    );
  }
}

export default BgThresholdCheck;
