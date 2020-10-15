import React, { Component } from "react";
import Customer from "./components/Customer";
import "./App.css";
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {withStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  root:{
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX:"auto"
  },
  table:{
    minWidth:1080
  },
  progress: {
    margin : theme.spacing(2)
  }
})

const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/1",
    name: "신승철",
    birthday: "961222",
    gender: "남자",
    job: "대학생",
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "홍길동",
    birthday: "951215",
    gender: "남자",
    job: "개발자",
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "이순신",
    birthday: "821224",
    gender: "남자",
    job: "디자이너",
  },
];

/*
라이프사이클
1) constructor()
컨스트럭터를 부르고

2) componentWillMount()
컴포넌트가 마운드되기전

3) reder()
컴포넌트를 화면에 그린다

4) componentDidMount()
컴포넌트디드마운트가 불려짐

#props or state 가 변경되는경우
 > shouldComponentUpdate() 함수등이 사용되어서 render함수를 호출하여 화면을 다시 그리게 된다.
*/



class App extends Component {

  state={
    customers : "",
    completed : 0
  }

  //컴포넌트가 모두 마운트가 되었을때 실행된다.
  componentDidMount(){
    //데이터가 들어오기 전까지 프로그래스바를 보여준다.
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers:res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1});
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? this.state.customers.map((c) => {
              // function item(c){
              return (
                <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.gender} gender={c.gender} job={c.job}></Customer>
              );
            }) : 
            // 프로그래스바가 등러오도록 수정
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}></CircularProgress>
              </TableCell>
            </TableRow>
            // 프로그래스바가 등러오도록 수정
            }

          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App) ;
