// UtLogs is group of functions what writing portal users behaviors
// import * as noti from "./../modules/Notification.js";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


class BgThresholdCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preProps : this.props.propsData
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.checkResource, 10000);
    clearInterval(this.timer);
  }

  callApiThreshold = async () => {
    const response = await fetch(`/settings/threshold`);
    const body = await response.json();
    return body;
  };

  callApi = async () => {
    //실제 호출할 API를 정의 하고 데이터를 수집한다.
    //전체 노드에 대해 호출한다. (CPU, RAM, STORAGE) 사용량
    const response = await fetch(`/apis/nodes_metric`);
    const body = await response.json();
    return body;
  };

  handleClick = (url) => {
    let preProps = this.props.propsData
    this.props.propsData.info.history.push("/nodes");
    setTimeout(function() {
      preProps.info.history.push(url);
    }, 100);
  };

  setLog = (status, message, cluster, node, resourceType) => {
    const url = `/settings/threshold/log`;
    const data = {
      nodeName: node,
      clusterName: cluster,
      message: message,
      resource: resourceType,
      status: status,
    };
    axios
      .post(url, data)
      .then((res) => {})
      .catch((err) => {
        alert(err);
      });
  };

  showNotification = (status, message, id, cluster, node, resourceType) => {
    let url = `/nodes/${node}?clustername=${cluster}`;
    if (status == "warn") {
      toast.warn(message, {
        toastId: id,
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
    } else if (status == "danger") {
      toast.error(message, {
        toastId: id,
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
    this.setLog(status, message, cluster, node, resourceType);
  };

  checkResource = () => {
    var thresholds = [];
    //임계가 설정된 노드들의 CPU,RAM,DISK정보를 수집한뒤
    this.callApiThreshold().then((res) => {
      if (res.length > 0) {
        thresholds = res;

        toast.warn("test", {
          toastId: "test",
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss: false,
          onClick: (props) =>
            this.handleClick("/nodes/cluster1-master.dev.gmd.life?clustername=cluster1"),
        });

        this.callApi()
          .then((res) => {
            //전체 노드리소스 정보
            res.map((item) => {
              let cluster = item.cluster;
              let node = item.node;

              let cpuUsage = item.cpu.status[0].value;
              let cpuTotal = item.cpu.status[1].value;

              let ramUsage = item.memory.status[0].value;
              let ramTotal = item.memory.status[1].value;

              let storageUsage = item.storage.status[0].value;
              let storageTotal = item.storage.status[1].value;

              let cpuUsed = (cpuUsage / cpuTotal) * 100;
              let ramUsed = (ramUsage / ramTotal) * 100;
              let storageUsed = (storageUsage / storageTotal) * 100;

              console.log("cpuUsed: ", cpuUsed + "%");
              console.log("ramUsed: ", ramUsed + "%");
              console.log("storageUsed: ", storageUsed + "%");

              let message = "";
              let resourceType = ""; // cpu/ram/storage
              let status = ""; // warn/danger
              let id = "";

              //설정된 임계치 정보
              thresholds.map((ht) => {
                // ht.node_name,
                // ht.cluster_name,
                // ht.cpu_warn,
                // ht.cpu_danger,
                // ht.ram_warn,
                // ht.ram_danger,
                // ht.storage_warn,
                // ht.storage_danger,

                if (ht.node_name == node && ht.cluster_name == cluster) {
                  if (cpuUsed >= ht.cpu_warn) {
                    resourceType = "cpu";
                    status = "warn";
                    message = `[WARN] ${resourceType} useage ${cpuUsed}% over threshold ${ht.cpu_warn}%`;
                    id = ht.cluster_name + ht.node_name + resourceType;
                    this.showNotification(
                      status,
                      message,
                      id,
                      ht.cluster_name,
                      ht.node_name,
                      resourceType
                    );
                  } else if (cpuUsed >= ht.cpu_danger) {
                    resourceType = "cpu";
                    status = "danger";
                    message = `[DANGER] ${resourceType} useage ${cpuUsed}% over threshold ${ht.cpu_danger}%`;
                    id = ht.cluster_name + ht.node_name + resourceType;
                    this.showNotification(
                      status,
                      message,
                      id,
                      ht.cluster_name,
                      ht.node_name,
                      resourceType
                    );
                  }

                  if (ramUsed >= ht.ram_warn) {
                    resourceType = "cpu";
                    status = "warn";
                    message = `[WARN] ${resourceType} useage ${ramUsed}% over threshold ${ht.ram_warn}%`;
                    id = ht.cluster_name + ht.node_name + resourceType;
                    this.showNotification(
                      status,
                      message,
                      id,
                      ht.cluster_name,
                      ht.node_name,
                      resourceType
                    );
                  } else if (ramUsed >= ht.ram_danger) {
                    resourceType = "cpu";
                    status = "danger";
                    message = `[DANGER] ${resourceType} useage ${ramUsed}% over threshold ${ht.ram_danger}%`;
                    id = ht.cluster_name + ht.node_name + resourceType;
                    this.showNotification(
                      status,
                      message,
                      id,
                      ht.cluster_name,
                      ht.node_name,
                      resourceType
                    );
                  }

                  if (storageUsed >= ht.storage_warn) {
                    resourceType = "storage";
                    status = "warn";
                    message = `[WARN] ${resourceType} useage ${storageUsed}% over threshold ${ht.storage_warn}%`;
                    id = ht.cluster_name + ht.node_name + resourceType;
                    this.showNotification(
                      status,
                      message,
                      id,
                      ht.cluster_name,
                      ht.node_name,
                      resourceType
                    );
                  } else if (storageUsed >= ht.storage_danger) {
                    resourceType = "cpu";
                    status = "danger";
                    message = `[DANGER] ${resourceType} useage ${storageUsed}% over threshold ${ht.storage_danger}%`;
                    id = ht.cluster_name + ht.node_name + resourceType;
                    this.showNotification(
                      status,
                      message,
                      id,
                      ht.cluster_name,
                      ht.node_name,
                      resourceType
                    );
                  }
                }
              });
            });
          })
          .catch((err) => console.log(err));
      } else {
        return;
      }
    });
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
