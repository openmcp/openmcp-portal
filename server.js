const fs = require("fs"); //database.json파일 접근
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

var os = require("os");
var path = require("path");

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.send({ messge: "Hello Express!" });
});

//데이터베이스 접속 설정
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const { Client } = require("pg");

const connection = new Client({
  user: conf.user,
  host: conf.host,
  database: conf.database,
  password: conf.password,
  port: conf.port,
});

//데이터베이스 접속
connection.connect();

//데이터베이스에서 데이터 가져오기
// app.get("/api/customers", (req, res) => {
//   // res.send()
//   connection.query("SELECT * FROM CUSTOMER", (err, result) => {
//     res.send(result.rows);
//   });
// });




function getDateTime() {
  var d = new Date();
  d = new Date(d.getTime());
  var date_format_str =
    d.getFullYear().toString() +
    "-" +
    ((d.getMonth() + 1).toString().length == 2
      ? (d.getMonth() + 1).toString()
      : "0" + (d.getMonth() + 1).toString()) +
    "-" +
    (d.getDate().toString().length == 2
      ? d.getDate().toString()
      : "0" + d.getDate().toString()) +
    " " +
    (d.getHours().toString().length == 2
      ? d.getHours().toString()
      : "0" + d.getHours().toString()) +
    ":" +
    // ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2
    //   ? (parseInt(d.getMinutes() / 5) * 5).toString()
    //   : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) +
    // ":00";
    (d.getMinutes().toString().length == 2
      ? d.getMinutes().toString()
      : "0" +d.getMinutes().toString()) +
    ":" + 
    (d.getSeconds().toString().length == 2
      ? d.getSeconds().toString()
      : "0" +d.getSeconds().toString());    
  // console.log(date_format_str);
  return date_format_str;
}

///////////////////////
// Write Log
///////////////////////
app.post("/apimcp/portal-log", (req, res) => {
  const bcrypt = require("bcrypt");
  var created_time = getDateTime();
  // console.log("portal-log");

  connection.query(
    `insert into tb_portal_logs values ('${req.body.userid}','${req.body.code}','${created_time}');`,
    (err, result) => {
      var result_set = {
        data: [],
        message: "Update success",
      };

      if (err !== "null") {
        console.log(err)
        const result_set = {
          data: [],
          message: "Update log failed : " + err,
        };
      } 

      res.send(result_set);
    }
  );
});



///////////////////////
// Create Account
///////////////////////

app.post("/user_login", (req, res) => {
  const bcrypt = require("bcrypt");

  connection.query(
    `select * from tb_accounts where user_id = '${req.body.userid}';`,
    (err, result) => {
      var result_set = {
        data: [],
        message: "Please check your Password",
      };

      console.log(result.rows.length);
      if (result.rows.length < 1) {
        console.log("empty");
        result_set = {
          data: [],
          message: "There is no user, please check your account",
        };
        res.send(result_set);
      } else {
        const hashPassword = result.rows[0].user_password;
        bcrypt.compare(req.body.password, hashPassword).then(function (r) {
          if (r) {
            // console.log("compare", r, result_set)
            result_set = {
              data: result,
              message: "Login Successful !!",
            };
            console.log("compare", r, result_set);
          }
          res.send(result_set);
        });
      }
    }
  );
});

app.post("/create_account", (req, res) => {
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  var password = "";

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash_password) {
      var create_time = getDateTime();
      connection.query(
        `insert into tb_accounts values ('${req.body.userid}', '${hash_password}','${req.body.role}','${create_time}','${create_time}');`,
        (err, result) => {
          if (err !== "null") {
            const result_set = {
              data: [],
              message: "Account creation was successful !!",
            };
            res.send(result_set);
          } else {
            const result_set = {
              data: [],
              message: "Account creation was faild, please check account",
            };
            res.send(result_set);
          }
        }
      );
    });
  });
});

///////////////////////
/* Dashboard APIs */
///////////////////////
app.get("/dashboard", (req, res) => {
  // let rawdata = fs.readFileSync("./json_data/dashboard.json");
  // let overview = JSON.parse(rawdata);
  // console.log(overview);
  // res.send(overview);
  var request = require("request");
  var options = {
    uri: "http://192.168.0.34:4885/apis/dashboard",
    // "http://192.168.0.51:4885/apis/dashboard",
    method: "GET",
    // headers: {
    //   Authorization:
    //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDMxMDQ4NzcsImlhdCI6MTYwMzEwMTI3NywidXNlciI6Im9wZW5tY3AifQ.mgO5hRruyBioZLTJ5a3zwZCkNBD6Bg2T05iZF-eF2RI",
    // },
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log("result", body);
      res.send(body);
    } else {
      console.log("error", error);
      return error;
    }
  });
});

let token = "";

// Projects 리스트 가져오기
app.get("/api/projects", (req, res) => {
  var request = require("request");
  // var url = "http://192.168.0.152:31635/token?username=openmcp&password=keti";
  // var uri ="http://192.168.0.152:31635/api/v1/namespaces/kube-system/pods?clustername=cluster1";

  var options = {
    uri:
      "http://192.168.0.152:31635/api/v1/namespaces/kube-system/pods?clustername=cluster1",
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDMxMDQ4NzcsImlhdCI6MTYwMzEwMTI3NywidXNlciI6Im9wZW5tY3AifQ.mgO5hRruyBioZLTJ5a3zwZCkNBD6Bg2T05iZF-eF2RI",
    },
  };

  var options = {
    uri:
      "http://192.168.0.152:31635/api/v1/namespaces/kube-system/pods?clustername=cluster1",
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDMxMDQ4NzcsImlhdCI6MTYwMzEwMTI3NywidXNlciI6Im9wZW5tY3AifQ.mgO5hRruyBioZLTJ5a3zwZCkNBD6Bg2T05iZF-eF2RI",
    },
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("result", body);
    } else {
      console.log("error", error);
      return error;
    }
  });

  //   request(url, function (error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //         console.log(body);
  //         token = body.token;
  //     } else {
  //         return error
  //     }
  //   });

  connection.query("SELECT * FROM PROJECT_LIST", (err, result) => {
    res.send(result.rows);
  });
});

///////////////////////
/* Projects APIs */
///////////////////////

// Prjects
app.get("/projects", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > overview
app.get("/projects/:project/overview", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_overview.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > Resources > Workloads > Deployments
app.get("/projects/:project/resources/workloads/deployments", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_deployments.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > Resources > Workloads > Deployments > detail
app.get(
  "/projects/:project/resources/workloads/deployments/:deployment",
  (req, res) => {
    let rawdata = fs.readFileSync(
      "./json_data/projects_deployment_detail.json"
    );
    let overview = JSON.parse(rawdata);
    // console.log(overview);
    res.send(overview);
  }
);

// Prjects > Resources > Workloads > Deployments > detail > replica status
app.get(
  "/projects/:project/resources/workloads/deployments/:deployment/replica_status",
  (req, res) => {
    connection.query(
      "select * from tb_replica_status order by cluster asc, created_time desc, status desc",
      (err, result) => {
        var result2 = result.rows.reduce(
          (obj, { cluster, status, pod, created_time }, index) => {
            if (!obj[cluster]) {
              obj[cluster] = { cluster: cluster, pods: [] };
            }

            obj[cluster].pods.push({
              status: status,
              name: pod,
              created_time: created_time,
            });
            return obj;
          },
          {}
        );

        var arr = [];
        for (i = 0; i < Object.keys(result2).length; i++) {
          arr.push(result2[Object.keys(result2)[i]]);
          // console.log(result2[Object.keys(result2)[i]]);
        }
        // console.log(arr)

        res.send(arr);
      }
    );
    // let rawdata = fs.readFileSync("./json_data/projects_deployment_detail.json");
    // let overview = JSON.parse(rawdata);
    // console.log(overview);
    // res.send(overview);
  }
);

app.post(
  "/projects/:project/resources/workloads/deployments/:deployment/replica_status/add_pod",
  (req, res) => {
    var create_time = getDateTime();
    var podName = Math.random().toString(36).substring(10);
    connection.query(
      `insert into tb_replica_status values ('${req.body.cluster}', '${podName}','config','${create_time}');`,
      (err, result) => {
        res.send(result);
      }
    );
  }
);

app.delete(
  "/projects/:project/resources/workloads/deployments/:deployment/replica_status/del_pod",
  (req, res) => {
    console.log("delete", req.body);
    connection.query(
      `delete from tb_replica_status where ctid IN (select ctid from tb_replica_status where cluster = '${req.body.cluster}' order by created_time desc limit 1)`,
      (err, result) => {
        res.send(result);
      }
    );
  }
);

// Deployments 상세부터 구현해나가야 함

// // Prjects > Resources > Workloads > Statefulsets
// app.get("/projects/:project/resources/workloads/statefulsets", (req, res) => {
//   let rawdata = fs.readFileSync("./json_data/projects_statefulsets.json");
//   let overview = JSON.parse(rawdata);
//   console.log(overview);
//   res.send(overview);
// });

// Prjects > Resources > pods
app.get("/projects/:project/resources/pods", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_pods.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > Resources > Pods Detail
app.get("/projects/:project/resources/pods/:pod", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_pod_detail.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > Resources > Services
app.get("/projects/:project/resources/services", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_services.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > Resources > Services Detail
app.get("/projects/:project/resources/services/:service", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_service_detail.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > Resources > Ingress
app.get("/projects/:project/resources/ingress", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_ingress.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > Resources > Ingress Detail
app.get("/projects/:project/resources/ingress/:ingress", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_ingress_detail.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > volumes
app.get("/projects/:project/volumes", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_volumes.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > volumes Detail
app.get("/projects/:project/volumes/:volume", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_volume_detail.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > Config > Secrets
app.get("/projects/:project/config/secrets", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_secrets.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > Config > Secrets Detail
app.get("/projects/:project/config/secrets/:secret", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_secret_detail.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > Config > ConfigMaps
app.get("/projects/:project/config/config_maps", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_config_maps.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > Config > ConfigMaps Detail
app.get("/projects/:project/config/config_maps/:config_map", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_config_map_detail.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Prjects > Settings > Members
app.get("/projects/:project/settings/members", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_members.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

///////////////////////
/* Clusters APIs */
///////////////////////
app.get("/clusters", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/clusters.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Clusters > overview
app.get("/clusters/:cluster/overview", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/clusters_overview.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Clusters > nodes
app.get("/clusters/:cluster/nodes", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/clusters_nodes.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Clusters > nodes > detail
app.get("/clusters/:cluster/nodes/:node", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/clusters_node_detail.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Clusters > pods
app.get("/clusters/:cluster/pods", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/clusters_pods.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Clusters > pods > detail
app.get("/clusters/:cluster/pods/:pod", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/clusters_pod_detail.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Clusters > Storage Class
app.get("/clusters/:cluster/storage_class", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/clusters_storage_class.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Clusters > Storage Class > detail
app.get("/clusters/:cluster/storage_class/:storage_class", (req, res) => {
  let rawdata = fs.readFileSync(
    "./json_data/clusters_storage_class_detail.json"
  );
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Nodes
app.get("/nodes", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/nodes.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Nodes > datail
app.get("/nodes/:node", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/nodes_detail.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Pods
app.get("/pods", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/pods.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Pods > detail
app.get("/pods/:pod", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/pods_detail.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

// Pods > detail
app.get("/settings/accounts", (req, res) => {
  connection.query(`select
  user_id, 
  roles,
  array(
      select role_name 
      from tb_account_roles t 
      where t.role_id = ANY(u.roles)
      ) as role_name,
  last_login_time
from tb_accounts u`, (err, result) => {
    res.send(result.rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
