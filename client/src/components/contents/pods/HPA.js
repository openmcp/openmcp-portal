import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { NavLink, Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  SearchState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableColumnResizing,
  TableHeaderRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import { NavigateNext} from '@material-ui/icons';
import * as utilLog from '../../util/UtLogs.js';
// import Editor from "./../../modules/Editor";
import axios from 'axios';
// import ProgressTemp from './../../modules/ProgressTemp';

// let apiParams = "";
class HPA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "name", title: "Name" },
        { name: "namespace", title: "Project" },
        { name: "cluster", title: "Cluster"},
        { name: "reference", title: "Reference"},
        { name: "min_repl", title: "Min"},
        { name: "max_repl", title: "Max" },
        { name: "current_repl", title: "Replicas" },
      ],
      defaultColumnWidths: [
        { columnName: "name", width: 300 },
        { columnName: "namespace", width: 130 },
        { columnName: "cluster", width: 130 },
        { columnName: "reference", width: 200 },
        { columnName: "min_repl", width: 80 },
        { columnName: "max_repl", width: 80 },
        { columnName: "current_repl", width: 100 },
      ],
      rows: "",

      // Paging Settings
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 10, 
      pageSizes: [5, 10, 15, 0],

      completed: 0,
      editorContext : `apiVersion: openmcp.k8s.io/v1alpha1
kind: OpenMCPDeployment
metadata:
  name: openmcp-deployment2
  namespace: openmcp
spec:
  replicas: 3
  labels:
      app: openmcp-nginx
  template:
    spec:
      template:
        spec:
          containers:
          - image: nginx
            name: nginx`,
      openProgress:false,
    };
  }

  componentWillMount() {
    this.props.menuData("none");
  }


  

  callApi = async () => {
    const response = await fetch(`/hpa`);
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  //컴포넌트가 모두 마운트가 되었을때 실행된다.
  componentDidMount() {
    //데이터가 들어오기 전까지 프로그래스바를 보여준다.
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => {
        if(res == null){
          this.setState({ rows: [] });
        } else {
          this.setState({ rows: res });
        }
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));

    const userId = localStorage.getItem("userName");
    utilLog.fn_insertPLogs(userId, 'log-PD-VW01');
  };

  onRefresh = () => {
    if(this.state.openProgress){
      this.setState({openProgress:false})
    } else {
      this.setState({openProgress:true})
    }
    this.callApi()
      .then((res) => {
        if(res == null){
          this.setState({ rows: [] });
        } else {
          this.setState({ rows: res });
        }
      })
      .catch((err) => console.log(err));
  };

  
  excuteScript = (context) => {

    if(this.state.openProgress){
      this.setState({openProgress:false})
    } else {
      this.setState({openProgress:true})
    }

    const url = `/deployments/create`;
    const data = {
      yaml:context
    };
    console.log(context)
    axios.post(url, data)
    .then((res) => {
        // alert(res.data.message);
        this.setState({ open: false });
        this.onUpdateData();
    })
    .catch((err) => {
        alert(err);
    });
  }

  closeProgress = () => {
    this.setState({openProgress:false})
  }

  render() {

    // 셀 데이터 스타일 변경
    const HighlightedCell = ({ value, style, row, ...restProps }) => (
      <Table.Cell
        {...restProps}
        style={{
          // backgroundColor:
          //   value === "Healthy" ? "white" : value === "Unhealthy" ? "white" : undefined,
          // cursor: "pointer",
          ...style,
        }}>
        <span
          style={{
            color:
              value === "Pending" ? "orange" : 
                value === "Failed" ? "red" : 
                  value === "Unknown" ? "red" : 
                    value === "Succeeded" ? "skyblue" : 
                      value === "Running" ? "#1ab726" : "black"
          }}>
          {value}
        </span>
      </Table.Cell>
    );

    //셀
    const Cell = (props) => {
      const { column, row } = props;
      // console.log("cell : ", props);
      // const values = props.value.split("|");
      // console.log("values", props.value);
      
      // const values = props.value.replace("|","1");
      // console.log("values,values", values)

    

      if (column.name === "status") {
        return <HighlightedCell {...props} />;
      } else if (column.name === "name") {
        // console.log("name", props.value);
        return (
          <Table.Cell
            {...props}
            style={{ cursor: "pointer" }}
          ><Link to={{
            pathname: `/pods/${props.value}`,
            state: {
              data : row
            }
          }}>{props.value}</Link></Table.Cell>
        );
      }
      return <Table.Cell>{props.value}</Table.Cell>;
    };

    const HeaderRow = ({ row, ...restProps }) => (
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
    const Row = (props) => {
      // console.log("row!!!!!! : ",props);
      return <Table.Row {...props} key={props.tableRow.key}/>;
    };

    return (
      <div className="content-wrapper full">
        {/* {this.state.openProgress ? <ProgressTemp openProgress={this.state.openProgress} closeProgress={this.closeProgress}/> : ""} */}
        {this.state.clusterName}
        {/* 컨텐츠 헤더 */}
          {/* <Editor btTitle="create" title="Create HAS" context={this.state.editorContext} excuteScript={this.excuteScript}/> */}
        <section className="content-header"  onClick={this.onRefresh} style={{position:"relative"}}>
          <h1>
          <span>
          HPA
          </span>
            <small>(Horizental Pod Autoscaler)</small>
          {/* <span>
          HAS
          </span>
            <small>(Hybrid Auto Scaler)</small> */}
          </h1>
          <ol className="breadcrumb">
            <li>
              <NavLink to="/dashboard">Home</NavLink>
            </li>
            <li className="active">
              <NavigateNext style={{fontSize:12, margin: "-2px 2px", color: "#444"}}/>
              Pods
            </li>
          </ol>
        </section>
        <section className="content" style={{ position: "relative" }}>
          {/* <div className="HPA-TEMP">
            HPA
            <small> (Horizental Pod Autoscaler)</small>
          </div> */}
          <Paper>
            {this.state.rows ? (
              [
                
                <Grid
                  rows={this.state.rows}
                  columns={this.state.columns}
                >
                  <Toolbar />
                  {/* 검색 */}
                  <SearchState defaultValue="" />
                  <IntegratedFiltering />
                  <SearchPanel style={{ marginLeft: 0 }} />

                  {/* Sorting */}
                  <SortingState
                    defaultSorting={[{ columnName: 'status', direction: 'desc' }]}
                  />
                  <IntegratedSorting />

                  {/* 페이징 */}
                  <PagingState defaultCurrentPage={0} defaultPageSize={this.state.pageSize} />
                  <IntegratedPaging />
                  <PagingPanel pageSizes={this.state.pageSizes} />

                  {/* 테이블 */}
                  <Table cellComponent={Cell} rowComponent={Row} />
                  <TableColumnResizing defaultColumnWidths={this.state.defaultColumnWidths} />
                  <TableHeaderRow
                    showSortingControls
                    rowComponent={HeaderRow}
                  />
                </Grid>,
              ]
            ) : (
              <CircularProgress
                variant="determinate"
                value={this.state.completed}
                style={{ position: "absolute", left: "50%", marginTop: "20px" }}
              ></CircularProgress>
            )}
          </Paper>
        </section>
      </div>
    );
  }
}

export default HPA;
