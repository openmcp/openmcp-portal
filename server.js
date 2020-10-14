const fs = require('fs'); //database.json파일 접근
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.get('/api/hello', (req, res) => {
    res.send({messge: 'Hello Express!'});
});

//데이터베이스 접속 설정
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const {Client} = require('pg');

const connection = new Client({
    user : conf.user,
    host : conf.host,
    database : conf.database,
    password : conf.password,
    port: conf.port
})

//데이터베이스 접속
connection.connect();


app.get('/api/customers',(req, res) => {
    // res.send()
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, result) => {
            console.log("a");
            res.send(result.rows);
        }
    )
});

// app.get('/api/customers',(req, res) => {
//     res.send([
//         {
//             id: 1,
//             image: "https://placeimg.com/64/64/1",
//             name: "신승철",
//             birthday: "961222",
//             gender: "남자",
//             job: "대학생",
//           },
//           {
//             id: 2,
//             image: "https://placeimg.com/64/64/2",
//             name: "홍길동",
//             birthday: "951215",
//             gender: "남자",
//             job: "개발자",
//           },
//           {
//             id: 3,
//             image: "https://placeimg.com/64/64/3",
//             name: "이순신",
//             birthday: "821224",
//             gender: "남자",
//             job: "디자이너",
//           }
//     ])

// });

app.listen(port, () => console.log(`Listening on port ${port}`));
