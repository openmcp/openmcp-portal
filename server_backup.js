// const fs = require("fs"); //database.json파일 접근
// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();

// var os = require('os');
// var path = require('path');


// const port = process.env.PORT || 5000;



// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/api/hello", (req, res) => {
//   res.send({ messge: "Hello Express!" });
// });

// //데이터베이스 접속 설정
// const data = fs.readFileSync("./database.json");
// const conf = JSON.parse(data);
// const { Client } = require("pg");

// const connection = new Client({
//   user: conf.user,
//   host: conf.host,
//   database: conf.database,
//   password: conf.password,
//   port: conf.port,
// });

// //데이터베이스 접속
// connection.connect();



// //데이터베이스에서 데이터 가져오기
// // app.get("/api/customers", (req, res) => {
// //   // res.send()
// //   connection.query("SELECT * FROM CUSTOMER", (err, result) => {
// //     res.send(result.rows);
// //   });
// // });




// // Dashboard 데이터
// app.get("/dashboard", (req, res) => {
//   let rawdata = fs.readFileSync('./api_sample_json/dashboard_sample.json');
//   let overview = JSON.parse(rawdata);
//   console.log(overview);
//   res.send(overview);
// });

// ///////////////////////
// /* projects 관련 API */
// ///////////////////////

// let token = "";

// // Projects 리스트 가져오기
// app.get("/api/projects", (req, res) => {
//   var request = require("request");
//   // var url = "http://192.168.0.152:31635/token?username=openmcp&password=keti";
//   // var uri ="http://192.168.0.152:31635/api/v1/namespaces/kube-system/pods?clustername=cluster1";

// var options = {
//     uri:"http://192.168.0.152:31635/api/v1/namespaces/kube-system/pods?clustername=cluster1",
//     method: 'GET',
//     headers: {
//         "Authorization" : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDMxMDQ4NzcsImlhdCI6MTYwMzEwMTI3NywidXNlciI6Im9wZW5tY3AifQ.mgO5hRruyBioZLTJ5a3zwZCkNBD6Bg2T05iZF-eF2RI',
//       }
//   };

//   var options = {
//     uri:"http://192.168.0.152:31635/api/v1/namespaces/kube-system/pods?clustername=cluster1",
//     method: 'GET',
//     headers: {
//         "Authorization" : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDMxMDQ4NzcsImlhdCI6MTYwMzEwMTI3NywidXNlciI6Im9wZW5tY3AifQ.mgO5hRruyBioZLTJ5a3zwZCkNBD6Bg2T05iZF-eF2RI',
//       }
//   };

// request(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log('result',body);
//     } else {
//         console.log('error',error);
//         return error
//     }
//   });

// //   request(url, function (error, response, body) {
// //     if (!error && response.statusCode == 200) {
// //         console.log(body);
// //         token = body.token;
// //     } else {
// //         return error
// //     }
// //   });
  
//   connection.query("SELECT * FROM PROJECT_LIST", (err, result) => {
//     res.send(result.rows);
//   });
// });

// // Prjects > overview 데이터
// app.get("/projects/:name/overview", (req, res) => {
//   let rawdata = fs.readFileSync('./api_sample_json/projects_overview.json');
//   let overview = JSON.parse(rawdata);
//   console.log(overview);
//   res.send(overview);
// });




// // callApi = async () => {
// //     const response = await fetch("http://192.168.0.152:31635/token?username=openmcp&password=keti");
// //     const body = await response.json();
// //     return body;
// //   };
// //    callApi= async ()=>{
// //     const response = await fetch("http://192.168.0.152:31635/token?username=openmcp&password=keti");
// //     const body = await response.json();
// //     return body;
// //   }


// // app.get('/api/customers',(req, res) => {
// //     res.send([
// //         {
// //             id: 1,
// //             image: "https://placeimg.com/64/64/1",
// //             name: "신승철",
// //             birthday: "961222",
// //             gender: "남자",
// //             job: "대학생",
// //           },
// //           {
// //             id: 2,
// //             image: "https://placeimg.com/64/64/2",
// //             name: "홍길동",
// //             birthday: "951215",
// //             gender: "남자",
// //             job: "개발자",
// //           },
// //           {
// //             id: 3,
// //             image: "https://placeimg.com/64/64/3",
// //             name: "이순신",
// //             birthday: "821224",
// //             gender: "남자",
// //             job: "디자이너",
// //           }
// //     ])

// // });
// const multer = require('multer'); //추후사용하지 않으니 삭제하길 바람
// const upload = multer({dest:'./uplad'});

// app.use('/image', express.static('./upload'));

// //고객정보 등록
// app.post('/api/customers', upload.single('image'), (req, res)=>{
//   let sql = 'INSERT INTO CUSTOMER VALUES (null, ?,?,?,?,?)';
//   let image = '/image/' + req.file.filename;
//   let name = req.body.name;
//   let birthday = req.body.name;
//   let gender = req.body.name;
//   let job = req.body.name;
//   let params = [image,name,birthday,gender,job];
//   connection.query(sql, params,
//     (err, rows, fields) => {
//       res.send(rows);
//     })

// })

// app.listen(port, () => console.log(`Listening on port ${port}`));
