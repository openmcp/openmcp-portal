import React, { Component } from "react";
import { NavLink} from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavigateNext} from '@material-ui/icons';
import Paper from "@material-ui/core/Paper";
// import LineChart from '../../../modules/LineChart';
import {
  SearchState,IntegratedFiltering,PagingState,IntegratedPaging,SortingState,IntegratedSorting,
} from "@devexpress/dx-react-grid";
// import LineReChart from '../../../modules/LineReChart';
import {
  Grid,Table,Toolbar,SearchPanel,TableColumnResizing,TableHeaderRow,PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import * as utilLog from './../../../util/UtLogs.js';
import { AsyncStorage } from 'AsyncStorage';
import { withTranslation } from 'react-i18next';


// let apiParams = "";
class PjConfigMapDetail extends Component {
  state = {
    rows:"",
    completed: 0,
    reRender : ""
  }

  componentWillMount() {
    const result = {
      menu : "projects",
      title : this.props.match.params.project,
      pathParams : {
        searchString : this.props.location.search,
        project : this.props.match.params.project
      }
    }
    this.props.menuData(result);
    // apiParams = this.props.match.params.project;
  }

  componentDidMount() {
    //데이터가 들어오기 전까지 프로그래스바를 보여준다.
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => {
        if(res === null){
          this.setState({ rows: [] });
        } else {
          this.setState({ rows: res });
        }
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
    let userId = null;
    AsyncStorage.getItem("userName",(err, result) => { 
      userId= result;
    })
    utilLog.fn_insertPLogs(userId, 'log-PJ-VW18');
      
  }  

  callApi = async () => {
    var param = this.props.match.params;
    const response = await fetch(`/projects/${param.project}/config/config_maps/${param.config_map}${this.props.location.search}`);
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const {t} = this.props;
    return (
      <div>
        <div className="content-wrapper pod-detail">
          {/* 컨텐츠 헤더 */}
          <section className="content-header">
            <h1>
              {t("projects.detail.config.configmaps.detail.title")}
              <small>{ this.props.match.params.config_map}</small>
            </h1>
            <ol className="breadcrumb">
            <li>
                <NavLink to="/dashboard">
                  {t("common.nav.home")}
                </NavLink>
              </li>
              <li className="active">
                <NavigateNext style={{fontSize:12, margin: "-2px 2px", color: "#444"}}/>
                {t("projects.title")}
              </li>
              <li className="active">
                  <NavigateNext style={{fontSize:12, margin: "-2px 2px", color: "#444"}}/>
                  {t("projects.detail.config.title")}
              </li>
              <li className="active">
                  <NavigateNext style={{fontSize:12, margin: "-2px 2px", color: "#444"}}/>
                  {t("projects.detail.config.configmaps.title")}
              </li>
              <li className="active">
                <NavigateNext style={{fontSize:12, margin: "-2px 2px", color: "#444"}}/>
                {t("projects.detail.config.configmaps.detail.title")}
              </li>
            </ol>
          </section>

          {/* 내용부분 */}
          <section className="content">
          {this.state.rows ? (
            [
              <BasicInfo rowData={this.state.rows.basic_info} t={t}/>,
              <Data rowData={this.state.rows.data} t={t}/>,
            ]
          ) : (
            <CircularProgress
              variant="determinate"
              value={this.state.completed}
              style={{ position: "absolute", left: "50%", marginTop: "20px" }}
            ></CircularProgress>
          )}
          </section>
        </div>
      </div>
    );
  }
}

class BasicInfo extends Component {
  render(){
    const t = this.props.t;
    return (
      <div className="content-box">
        <div className="cb-header">{t("projects.detail.config.configmaps.detail.basicInfo.title")}</div>
        <div className="cb-body">
          <div style={{display:"flex"}}>
            <div className="cb-body-left">
              <div>
                <span>Name : </span>
                <strong>{this.props.rowData.name}</strong>
              </div>
              <div>
                <span>Project : </span>
                {this.props.rowData.project}
              </div>
            </div>
            <div className="cb-body-right">
              <div>
                <span>Created Time : </span>
                {this.props.rowData.created_time}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "key", title: "Key" },
        { name: "value", title: "Value" },
      ],
      defaultColumnWidths: [
        { columnName: "key", width: 300 },
        { columnName: "value", width: 600 },
      ],
      rows: this.props.rowData,

      // Paging Settings
      currentPage: 0,
      setCurrentPage: 0,
      pageSize: 10, 
      pageSizes: [5, 10, 15, 0],

      completed: 0,
    };
  }

  componentWillMount() {
    // this.props.onSelectMenu(false, "");
  }

  

  // callApi = async () => {
  //   const response = await fetch("/clusters");
  //   const body = await response.json();
  //   return body;
  // };

  // progress = () => {
  //   const { completed } = this.state;
  //   this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  // };

  // //컴포넌트가 모두 마운트가 되었을때 실행된다.
  // componentDidMount() {
  //   //데이터가 들어오기 전까지 프로그래스바를 보여준다.
  //   this.timer = setInterval(this.progress, 20);
  //   this.callApi()
  //     .then((res) => {
  //       this.setState({ rows: res });
  //       clearInterval(this.timer);
  //     })
  //     .catch((err) => console.log(err));
  // };

  render() {
    const t = this.props.t;
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

    const Cell = (props) => {
      const { column } = props;
      if (column.name === "value") {
        console.log("cell : ", props);
        return (
          <Table.Cell
            {...props}
            style={{ wordBreak:"break-all", whiteSpace: "inherit" }}
          ><pre>{props.value}</pre></Table.Cell>
        );
      }
      return <Table.Cell {...props} />;
    };



    return (
      <div className="content-box">
        <div className="cb-header">{t("projects.detail.config.configmaps.detail.data.title")}</div>
        <div className="cb-body">
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
                    // defaultSorting={[{ columnName: 'status', direction: 'desc' }]}
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
        </div>
      </div>
    );
  };
};

export default withTranslation()(PjConfigMapDetail); 