import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import * as utilLog from "../../util/UtLogs.js";
import { AsyncStorage } from "AsyncStorage";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { dateFormat } from "../../util/Utitlity.js";

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

class ExcuteSnapshot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "name", title: "Name" },
        { name: "status", title: "Status" },
        { name: "nodes", title: "nodes" },
        { name: "cpu", title: "CPU(%)" },
        { name: "ram", title: "Memory(%)" },
        { name: "region", title: "Region" },
        { name: "zone", title: "Zone" },
      ],
      defaultColumnWidths: [
        { columnName: "name", width: 130 },
        { columnName: "status", width: 130 },
        { columnName: "nodes", width: 130 },
        { columnName: "cpu", width: 100 },
        { columnName: "ram", width: 120 },
        { columnName: "region", width: 130 },
        { columnName: "zone", width: 130 },
      ],
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 5,
      pageSizes: [5, 10, 15, 0],
      open: false,
      dpCount: 0,
      snapshotName: "",
      dpInfo: [],
      clusters: [],
      selection: [],
      selectedRow: "",
      completed: 0,
    };
  }

  callApi = async () => {
    const response = await fetch("/clusters");
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  handleClickOpen = () => {
    if (Object.keys(this.props.rowData).length === 0) {
      alert("Please select deployment");
      this.setState({ open: false });
      return;
    }

    let dpCnt = this.props.rowData.length;
    let info = [];
    this.props.rowData.forEach((dp) => {
      info.push({ name: dp.name, cluster: dp.cluster, namespace: dp.project });
    });

    let snapshotName = `snapshot-${info[0].name}-${dateFormat(
      new Date(),
      "%Y%m%d%H%M%S",
      false
    )}`;

    this.setState({
      open: true,
      dpCount: dpCnt,
      dpInfo: info,
      selection: [],
      snapshotName: snapshotName,
    });
  };

  componentWillMount() {}

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSave = (e) => {
    const url = `/apis/snapshot`;
    const data = {
      cluster: "openmcp",
      // namespace: this.state.dpInfo[0].namespace,
      namespace: "default",
      value: {
        apiVersion: "openmcp.k8s.io/v1alpha1",
        kind: "Snapshot",
        metadata: {
          name: this.state.snapshotName,
        },
        spec: {
          snapshotSources: [
            {
              // resourceCluster: this.state.dpInfo[0].cluster,
              // resourceNamespace: this.state.dpInfo[0].namespace,
              resourceCluster: "cluster1",
              resourceNamespace: "default",
              resourceType: "PersistentVolume",
              resourceName: "iot-gateway-pv",
            },
            {
              // resourceCluster: this.state.dpInfo[0].cluster,
              // resourceNamespace: this.state.dpInfo[0].namespace,
              resourceCluster: "cluster1",
              resourceNamespace: "default",
              resourceType: "PersistentVolumeClaim",
              resourceName: "iot-gateway-pvc",
            },
            {
              // resourceCluster: this.state.dpInfo[0].cluster,
              // resourceNamespace: this.state.dpInfo[0].namespace,
              // resourceName: this.state.dpInfo[0].name,
              resourceCluster: "cluster1",
              resourceNamespace: "default",
              resourceType: "Deployment",
              resourceName: "iot-gateway",
            },
            {
              // resourceCluster: this.state.dpInfo[0].cluster,
              // resourceNamespace: this.state.dpInfo[0].namespace,
              resourceCluster: "cluster1",
              resourceNamespace: "default",
              resourceType: "Service",
              resourceName: "iot-gateway-sv",
            },
          ],
        },
      },
    };

    axios
      .post(url, data)
      .then((res) => {
        alert(res.data[0].text);
        this.setState({ open: false });
      })
      .catch((err) => {
        alert(err);
      });

    this.props.onUpdateData();

    // loging deployment migration
    let userId = null;
    AsyncStorage.getItem("userName", (err, result) => {
      userId = result;
    });
    utilLog.fn_insertPLogs(userId, "log-MG-MD01");

    //close modal popup
    this.setState({ open: false });
  };

  render() {
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

    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          style={{
            // position: "absolute",
            // right: "115px",
            // top: "26px",
            zIndex: "10",
            width: "148px",
            textTransform: "capitalize",
          }}
        >
          Take Snapshot
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          fullWidth={false}
          maxWidth="md"
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            {this.props.title}
          </DialogTitle>
          <DialogContent dividers>
            <div className="md-contents-body migration">
              <section className="md-content">
                {/* deployment informations */}
                <p>Snapshot Info</p>
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "#f1f1f1",
                    minWidth: "900px",
                    marginBottom: "20px",
                  }}
                >
                  {this.state.dpInfo.map((item, idx) => {
                    return [
                      <div id="md-content-info">
                        <div class="md-partition-x">
                          <div class="md-item">
                            <span style={{ margin: "4px" }}>
                              <strong> Snapshot : </strong>
                            </span>
                            <span>{this.state.snapshotName}</span>
                          </div>
                        </div>
                      </div>,
                      <div id="md-content-info">
                        <div class="md-partition-x">
                          <div class="md-item">
                            <span style={{ margin: "4px" }}>
                              <strong> Deployment : </strong>
                            </span>
                            <span>{item.deployment}</span>
                          </div>
                        </div>
                      </div>,
                      <div id="md-content-info">
                        <div class="md-partition-x">
                          <div class="md-item">
                            <span style={{ margin: "4px" }}>
                              <strong> Cluster : </strong>
                            </span>
                            <span>{item.cluster}</span>
                          </div>
                        </div>
                      </div>,
                      <div id="md-content-info">
                        <div class="md-partition-x">
                          <div class="md-item">
                            <span style={{ margin: "4px" }}>
                              <strong> Namespace : </strong>
                            </span>
                            <span>{item.namespace}</span>
                          </div>
                        </div>
                      </div>,
                    ];
                  })}
                </div>
              </section>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSave} color="primary">
              excution
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

export default ExcuteSnapshot;