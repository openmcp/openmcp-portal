import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import line_chart_sample from "./../../../../json_sample/line_chart_sample.json";
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
  TableHeaderRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import MyResponsiveLine from "./../../../modules/LineChart";
import SelectBox from "./../../../modules/SelectBox";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";







const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
















let apiParams = "";
class Pj_Workloads extends Component {
  state = {
    rows: "",
    completed: 0,
    reRender: "",
    value: 0,
  };

  componentWillMount() {
    //왼쪽 메뉴쪽에 타이틀 데이터 전달
    this.props.menuData(this.props.match.params);
    apiParams = this.props.match.params;
  }

  componentDidMount() {
    //데이터가 들어오기 전까지 프로그래스바를 보여준다.
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => {
        this.setState({ rows: res });
        clearInterval(this.timer);
      })
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    var param = this.props.match.params.name;
    const response = await fetch(`/projects/${param}/overview`);
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const handleChange = (event, newValue) => {
      this.setState({ value: newValue });
    };

    // console.log("Pj_Workloads_Render : ", this.state.rows.basic_info);
    const { classes } = this.props;
    return (
      <div>
        <div className="content-wrapper">
          {/* 컨텐츠 헤더 */}
          <section className="content-header">
            <h1>
              Workloads
              <small>{this.props.match.params.name}</small>
            </h1>
            <ol className="breadcrumb">
              <li>
                <NavLink to="/dashboard">Home</NavLink>
              </li>
              <li>
                <NavLink to="/Projects">Projects</NavLink>
              </li>
              <li className="active">Resources</li>
            </ol>
          </section>

          {/* 내용부분 */}
          <section>
            {/* 탭매뉴가 들어간다. */}
            <div className={classes.root + "content"}>
              <AppBar position="static">
                <Tabs
                  value={this.state.value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Item One" {...a11yProps(0)} />
                  <Tab label="Item Two" {...a11yProps(1)} />
                  <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <TabPanel value={this.state.value} index={0}>
                Item One
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={this.state.value} index={2}>
                Item Three
              </TabPanel>
            </div>

            {/* {this.state.rows ? (
            [
            <BasicInfo rowData={this.state.rows.basic_info}/>,
            <div style={{display:"flex"}}>
              <ProjectResources rowData={this.state.rows.project_resource}/>
              <UsageTop5 rowData={this.state.rows.usage_top_5}/>
            </div>,
            <PhysicalResources rowData={this.state.rows.physical_resources}/>
            ]
          ) : (
            <CircularProgress
              variant="determinate"
              value={this.state.completed}
              style={{ position: "absolute", left: "50%", marginTop: "20px" }}
            ></CircularProgress>
          )} */}
          </section>
        </div>
      </div>
    );
  }
}

class BasicInfo extends Component {
  render() {
    // console.log("BasicInfo:", this.props.rowData.name)

    return (
      <div className="content-box">
        <div className="cb-header">BaseicInfo</div>
        <div className="cb-body">
          <div>
            <span>name : </span>
            <strong>{this.props.rowData.name}</strong>
          </div>
          <div>
            <span>creator : </span>
            {this.props.rowData.creator}
          </div>
          <div>
            <span>description : </span>
            {this.props.rowData.description}
          </div>
        </div>
      </div>
    );
  }
}

class ProjectResources extends Component {
  state = {
    columns: [
      { name: "resource", title: "Resource" },
      { name: "total", title: "Total" },
      { name: "abnormal", title: "Abnormal" },
    ],
  };
  render() {
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
    return (
      <div className="content-box col-sep-2 ">
        <div className="cb-header">Project Resources</div>
        <div className="cb-body table-style">
          <Grid rows={this.props.rowData} columns={this.state.columns}>
            {/* Sorting */}
            <SortingState
            // defaultSorting={[{ columnName: 'city', direction: 'desc' }]}
            />
            <IntegratedSorting />

            <Table />
            <TableHeaderRow showSortingControls rowComponent={HeaderRow} />
          </Grid>
        </div>
      </div>
    );
  }
}

class UsageTop5 extends Component {
  state = {
    columns: [
      { name: "name", title: "Name" },
      { name: "type", title: "Type" },
      { name: "usage", title: "Usage" },
    ],
    rows: this.props.rowData.cpu,
  };

  callApi = async () => {
    const response = await fetch(`/projects/${apiParams}/overview`);
    const body = await response.json();
    return body;
  };

  render() {
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

    const onSelectBoxChange = (data) => {
      console.log("onSelectBoxChange", data);
      switch (data) {
        case "cpu":
          console.log("cpu");
          // this.setState({rows:this.props.rowData.cpu});

          this.callApi()
            .then((res) => {
              this.setState({ rows: res.usage_top_5.cpu });
            })
            .catch((err) => console.log(err));

          break;
        case "memory":
          console.log("memory");
          // this.setState({rows:this.props.rowData.memory});

          this.callApi()
            .then((res) => {
              this.setState({ rows: res.usage_top_5.memory });
            })
            .catch((err) => console.log(err));

          break;
        default:
          this.setState(this.props.rowData.cpu);
      }
    };

    const selectBoxData = [
      { name: "cpu", value: "cpu" },
      { name: "memory", value: "memory" },
    ];
    return (
      <div className="content-box col-sep-2">
        <div className="cb-header">
          Usage Top5
          <SelectBox
            rows={selectBoxData}
            onSelectBoxChange={onSelectBoxChange}
          ></SelectBox>
        </div>

        <div className="cb-body table-style">
          {this.state.aaa}
          <Grid rows={this.state.rows} columns={this.state.columns}>
            {/* Sorting */}
            <SortingState
            // defaultSorting={[{ columnName: 'city', direction: 'desc' }]}
            />
            <IntegratedSorting />

            <Table />
            <TableHeaderRow showSortingControls rowComponent={HeaderRow} />
          </Grid>
        </div>
      </div>
    );
  }
}

class PhysicalResources extends Component {
  render() {
    return (
      <div className="content-box">
        <div className="cb-header">Physical Resources</div>
        <div className="cb-body">
          <div className="cb-bdoy-content" style={{ height: "250px" }}>
            <MyResponsiveLine
              data={line_chart_sample[0].cpu}
            ></MyResponsiveLine>
          </div>
          <div className="cb-bdoy-content" style={{ height: "250px" }}>
            <MyResponsiveLine
              data={line_chart_sample[1].memory}
            ></MyResponsiveLine>
          </div>
          <div className="cb-bdoy-content" style={{ height: "250px" }}>
            <MyResponsiveLine
              data={line_chart_sample[2].network}
            ></MyResponsiveLine>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Pj_Workloads);
