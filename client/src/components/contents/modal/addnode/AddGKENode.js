import React, { Component } from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextField } from "@material-ui/core";
import * as utilLog from "../../../util/UtLogs.js";
import {
  PagingState,
  SortingState,
  SelectionState,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSorting,
  RowDetailState,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableColumnResizing,
  TableHeaderRow,
  PagingPanel,
  TableSelection,
  TableRowDetail,
} from "@devexpress/dx-react-grid-material-ui";
import Paper from "@material-ui/core/Paper";
import axios from 'axios';
import ProgressTemp from './../../../modules/ProgressTemp';
import Confirm2 from './../../../modules/Confirm2';

class AddGKENode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // projectId:"",
      // clientEmail:"",
      // privateKey:"",

      nodeName: "",
      desiredNumber: 0,
      columns: [
        { name: "name", title: "Name" },
        { name: "status", title: "Status" },
        { name: "pools", title: "Pools" },
        { name: "cpu", title: "CPU(%)" },
        { name: "ram", title: "Memory(%)" },
      ],
      defaultColumnWidths: [
        { columnName: "name", width: 130 },
        { columnName: "status", width: 130 },
        { columnName: "pools", width: 130 },
        { columnName: "cpu", width: 130 },
        { columnName: "ram", width: 120 },
      ],
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 3,
      pageSizes: [3, 6, 12, 0],
      open: false,
      clusters: [],
      selection: [],
      selectedRow : "",
      value: 0,
      expandedRowIds : [0],

      confirmOpen: false,
      confirmInfo : {
        title :"Add Node Confirm",
        context :"Are you sure you want to add Node?",
        button : {
          open : "",
          yes : "CONFIRM",
          no : "CANCEL",
        }
      },
      confrimTarget : "",
      confirmTargetKeyname:""
    };
  }

  componentDidMount() {
    this.initState();
    this.setState({ 
      open: true,
    });
    this.callApi("/gke/clusters")
    .then((res) => {
      this.setState({ clusters: res });
    })
    .catch((err) => console.log(err));
  }
  
  initState = () => {
    this.setState({
      selection : [],
      selectedRow:"",
      // projectID:"", 
      // clientEmail:"", 
      // privateKey:"", 
      nodeName:"",
      desiredNumber:0,
      expandedRowIds : [0],
    });
  }

  handleSaveClick = () => {
    // if (this.state.projectId == ""){
    //   alert("Please enter Project ID");
    //   return;
    // } else if (this.state.clientEmail == ""){
    //   alert("Please enter Client Email");
    //   return;
    // } else if (this.state.privateKey == ""){
    //   alert("Please enter PrivateKey");
    //   return;
    // } else if (Object.keys(this.state.selectedRow).length === 0){
    if (Object.keys(this.state.selectedRow).length === 0){
      alert("Please select target Cluster");
      return;
    } else if (this.state.desiredNumber == 0){
      alert("Desired number must be a number greater than 0")
    } else {

      this.setState({
        confirmOpen: true,
      })

      
      
    }
    // alert("GKE SAVE");
  };

  //callback
  confirmed = (result) => {
    this.setState({confirmOpen:false})

    //show progress loading...
    this.setState({openProgress:true})

    if(result) {
      //Add Node excution
      const url = `/nodes/add/gke`;
      const data = {
        // projectId: this.state.projectId,
        // clientEmail: this.state.clientEmail,
        // privateKey: this.state.privateKey,
        cluster:this.state.selectedRow.cluster,
        nodePool: this.state.selectedRow.pool,
        desiredCnt:this.state.desiredNumber,
      };

      // credType = "service_account"
      // projectID = "just-advice-302807"
      // clientEmail = "gkeadmin@just-advice-302807.iam.gserviceaccount.com"
      // privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWdGxXcM+cRb39\nN6fbCBpibF+EIVFkKGjsuuuGJxEoTQIKp2dnl5FlBFKKSa0cSIz4duwgxc5+25KS\neR5cBB6MjSxBC62qK6VeyNUT2KzyIrQfp/zGmxkBVpXFZ13u0JopiwSH5Kvp4vU1\nOJn4wLA3aLs3QMzUC4rXl6IW0yuyMeClooJLFqxjW7ihry2Y0MjMLuSWeHpqCQCK\n0IntRpqhPoKEkWUjonJnQo7Lem5/iqp8rL80vMDPHuDTPLcQt3pI7Ak6z2qk7etm\ng5jkUS1cVU9Xne2jffEMOjTXPrEgozoHWxN0QLwzrA/7vW6zAt3nfOdO9C6wBzh9\n4GgUeTDDAgMBAAECggEAAlWPaFQ+A5bEE/bVyOM0W6Xk/uyDP50rpzKm+vV/O6UQ\nRKAV1rbQ9PyFuXjxKBb8vHzu4lxvfEn/imtEZ/6o0SF9kyesDZIetq1mRFUIwjSb\n0/cMH/fy3w+GNHkvjeM6ClcNBuhM8WVwWH1JOmqT1caPYxvoHta7/XoVCufkLd2q\nqpFcod8LISW3HN7wSgzB5lpDry+Zk8KoXtxn2bAJyRYeky7tkXQbkCwrE10oUkAs\nivgR27wGF0nowoSvs8KwxWME3zW836fVALyF+dGCBlYVtIMvx6T4cu868dI5JANj\nY6U4H3xjB98MQ/zp7uH6w4kj1/cMxvbfAT7jBTiqAQKBgQD9Q/9bEVxPBc+gKEMo\ncXYCJTCT5XsdAgdw/kXHdR463z70sUbLhvHjt/6xwlNCS5j2jkTbN7InLI6xIwY/\nzdfppXsoW4qyEqrgMHjG1af3AlslEA3GLnkLEIx/VM6zoDKlBlI3uz2PMf4wJiFK\nli3X/5tcpYlyc0pCkIJBQ+o2QQKBgQDYxSf8b2/WW87+L3l6/VlbyWMG9aw5RP2v\nitP0cIqoFj/LkD1pJWtJre0Lnlzgz8JJDcRsbrqDZFuIiWnTc8dy8YM1Pv1kz7xZ\nANvpJGEDr5cZjopOoq+w5zfNDrLf/SPB2g6u9/33Ukds3F0++14901b/f7SjHFN2\nH+OPFwMOAwKBgQDPugrird2Rbwm5qexTaqRI5Cnw1ELjKvvhgJzJGNV/ogXn+tM/\nMeKKTSqYr/NMJ+dBKrVtPERh/xjWTwzcHkBegfz+v/6FSexfT0Jwi2NlpMgPIRi7\nGPjsy1kBQxT6nYWMdx/OWEQIhA+hfFTH8V+OjzbliVyvw8H/0LkVQNgEQQKBgBJr\nhn9T9NvxR0CgRiFmX+6FyW1w+OaQ70G4eVRfL9kist8Yba9+p4RGTEtddKUB4o+U\npOlV63F42LJcguqd/wfMcArZRG0JngauJQHFvpyykhNw4l3WQzm0HDDHm/meqCgz\n4GWL2z/l9P3SJ/ZPI+37BHyHnJDzuj/ia9Lf8LmDAoGBAOm92Sp7qFkrwogzIBfp\nU9PtDc2GeiSj7WJctIakuxQ+bSWtOoPq6CPd8OAWmpgZA8SzCfkWMnBQJhB7A6RQ\nZOA50xvE07ybQ397NLkDKAB56zdQ9hDAYpgkzCFWL1AvIouM8OLU48LLIh3KJLxG\nSUwFrPzKIQz4RKj3em+M+iQP\n-----END PRIVATE KEY-----\n"

      axios.post(url, data)
          .then((res) => {
            // console.log()
          })
          .catch((err) => {
              // console.log()
          });
      const userId = localStorage.getItem("userName");
      utilLog.fn_insertPLogs(userId, "log-ND-CR01");

      this.setState({openProgress:false})
      this.props.handleClose()
    } else {
      this.setState({confirmOpen:false})
      this.setState({openProgress:false})
      console.log("cancel")
    }
  }


  callApi = async (uri) => {
    const response = await fetch(uri);
    const body = await response.json();
    return body;
  };

  onChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  HeaderRow = ({ row, ...restProps }) => (
    <Table.Row
      {...restProps}
      style={{
        cursor: "pointer",
        backgroundColor: "whitesmoke",
        // ...styles[row.sector.toLowerCase()],
      }}
      // onClick={()=> alert(JSON.stringify(row))}
    />
  );

  onSelectionChange = (selection) => {
    this.setState({
      desiredNumber: selection.desired.toString(),
      selectedRow: selection
    })
  };

  onExpandedRowIdsChange = (selection) => {
    if (selection.length > 1) selection.splice(0, 1);
    return (this.setState({expandedRowIds:selection}))
  }

  RowDetail = ({ row }) => (
    <div>
      <GKENodePools rowData={row.name} onSelectionChange={this.onSelectionChange}/>
    </div>
  );

  render() {
    return (
      <div>
        {this.state.openProgress ? <ProgressTemp openProgress={this.state.openProgress} closeProgress={this.closeProgress}/> : ""}

        <Confirm2
          confirmInfo={this.state.confirmInfo} 
          confrimTarget ={this.state.confrimTarget} 
          confirmTargetKeyname = {this.state.confirmTargetKeyname}
          confirmed={this.confirmed}
          confirmOpen={this.state.confirmOpen}/>
        {/* <section className="md-content">
          <div style={{display:"flex"}}>
            <div className="props" style={{width:"50%", marginRight:"10px"}}>
              <p>Authentication Type</p>
              <TextField
                id="outlined-multiline-static"
                rows={1}
                placeholder="credetial type"
                variant="outlined"
                value = {this.state.clientId}
                fullWidth	={true}
                name="credType"
                onChange = {this.onChange}
              />
            </div>
            <div className="props" style={{width:"50%"}}>
              <p>Project ID</p>
              <TextField
                id="outlined-multiline-static"
                rows={1}
                placeholder="project Id"
                variant="outlined"
                value = {this.state.clientSec}
                fullWidth	={true}
                name="projectId"
                onChange = {this.onChange}
              />
            </div>
          </div>
          <div>
            <div className="props">
              <p>Client Email</p>
              <TextField
                id="outlined-multiline-static"
                rows={1}
                placeholder="client Email"
                variant="outlined"
                value = {this.state.tenantID}
                fullWidth	={true}
                name="clientEmail"
                onChange = {this.onChange}
              />
            </div>
            
          </div>
          <div>
            <div className="props">
              <p>PrivateKey</p>
              <TextField
                id="outlined-multiline-static"
                // rows={1}
                multiline = {true}
                placeholder="privateKey"
                variant="outlined"
                value = {this.state.subID}
                fullWidth	={true}
                name="privateKey"
                onChange = {this.onChange}
              />
            </div>
          </div>
        </section> */}
        <section className="md-content">
          <div className="outer-table">
            <p>Clusters</p>
            {/* cluster selector */}
            <Paper>
            <Grid rows={this.state.clusters} columns={this.state.columns}>

              {/* Sorting */}
              <SortingState
                defaultSorting={[{ columnName: "status", direction: "asc" }]}
              />

              {/* 페이징 */}
              <PagingState
                defaultCurrentPage={0}
                defaultPageSize={this.state.pageSize}
              />
              <PagingPanel pageSizes={this.state.pageSizes} />
              {/* <SelectionState
                selection={this.state.selection}
                onSelectionChange={this.onSelectionChange}
              /> */}

              <IntegratedFiltering />
              <IntegratedSorting />
              {/* <IntegratedSelection /> */}
              <IntegratedPaging />

              {/* 테이블 */}
              <RowDetailState
                // defaultExpandedRowIds={[2, 5]}
                expandedRowIds={this.state.expandedRowIds}
                onExpandedRowIdsChange={this.onExpandedRowIdsChange}
              />
              <Table />
              <TableColumnResizing
                defaultColumnWidths={this.state.defaultColumnWidths}
              />
              <TableHeaderRow
                showSortingControls
                rowComponent={this.HeaderRow}
              />
              <TableRowDetail
                contentComponent={this.RowDetail}
              />
              {/* <TableSelection
                selectByRowClick
                highlightRow
                // showSelectionColumn={false}
              /> */}
            </Grid>
            </Paper>
          </div>
        </section>
        <section className="md-content">
          <div style={{display:"flex"}}>
            <div className="props" style={{width:"30%"}}>
              <p>Selected Desired Number</p>
              <TextField
                id="outlined-multiline-static"
                rows={1}
                type="number"
                placeholder="workers count"
                variant="outlined"
                value = {this.state.desiredNumber}
                fullWidth	={true}
                name="desiredNumber"
                onChange = {this.onChange}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

class GKENodePools extends Component {
  constructor(props){
    super(props);
    this.state = {
      rows: "",
      columns: [
        { name: "pool", title: "NodePool" },
        { name: "cluster", title: "Cluster" },
        { name: "machine_type", title: "Machine Type" },
        { name: "desired", title: "Desired" },
      ],
      defaultColumnWidths: [
        { columnName: "pool", width: 150 },
        { columnName: "cluster", width: 130 },
        { columnName: "machine_type", width: 130 },
        { columnName: "desired", width: 130 },
      ],

      selection: [],
      selectedRow : "",
      value: 0,
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => {
        var result = [];
        console.log(res);
        res.map(item=>
          item.cluster == this.props.rowData ? result.push(item) : ""
        )
        this.setState({ rows: result });
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
  }

  initState = () => {
    this.setState({
      selection : [],
      selectedRow:"",
    });
  }

  callApi = async () => {
    const response = await fetch(`/gke/clusters/pools?clustername=${this.props.rowData.name}`);
    const body = await response.json();
    return body;
  };

  HeaderRow = ({ row, ...restProps }) => (
    <Table.Row
      {...restProps}
      style={{
        cursor: "pointer",
        backgroundColor: "#ffe7e7",
        // backgroundColor: "whitesmoke",
        // ...styles[row.sector.toLowerCase()],
      }}
      // onClick={()=> alert(JSON.stringify(row))}
    />
  );

  onSelectionChange = (selection) => {
    if (selection.length > 1) selection.splice(0, 1);
    
    this.setState({ selection: selection });
    if(selection.length > 0){
      this.setState({ selectedRow: this.state.rows[selection[0]]})
      this.props.onSelectionChange(this.state.rows[selection[0]])
    } else {
      this.setState({ selectedRow: {} })
      this.props.onSelectionChange(0)
    };
  }

  render(){
    return(
      <div className="inner-table">
        {this.state.rows ? (
        <Grid rows={this.state.rows} columns={this.state.columns}>
          {/* Sorting */}
          <SortingState
            defaultSorting={[{ columnName: "status", direction: "asc" }]}
          />

          <SelectionState
            selection={this.state.selection}
            onSelectionChange={this.onSelectionChange}
          />

          <IntegratedFiltering />
          <IntegratedSorting />

          {/* 테이블 */}
          <Table />
          <TableColumnResizing
            defaultColumnWidths={this.state.defaultColumnWidths}
          />
          <TableHeaderRow
            showSortingControls
            rowComponent={this.HeaderRow}
          />
          <TableSelection
            selectByRowClick
            highlightRow
            // showSelectionColumn={false}
          />
        </Grid>
        ) : (
          <CircularProgress
            variant="determinate"
            value={this.state.completed}
            style={{ position: "absolute", left: "50%", marginTop: "20px" }}
          ></CircularProgress>
        )}
      </div>
    )
  }
}

export default AddGKENode;
