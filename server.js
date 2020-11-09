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
    uri:
      "http://192.168.0.152:4885/apis/dashboard",
      // "http://192.168.0.51:4885/apis/dashboard",
    method: "GET",
    // headers: {
    //   Authorization:
    //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDMxMDQ4NzcsImlhdCI6MTYwMzEwMTI3NywidXNlciI6Im9wZW5tY3AifQ.mgO5hRruyBioZLTJ5a3zwZCkNBD6Bg2T05iZF-eF2RI",
    // },
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("result", body);
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
app.get("/projects/:project/resources/workloads/deployments/:deployment", (req, res) => {
  let rawdata = fs.readFileSync("./json_data/projects_deployment_detail.json");
  let overview = JSON.parse(rawdata);
  console.log(overview);
  res.send(overview);
});

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
  let rawdata = fs.readFileSync("./json_data/clusters_storage_class_detail.json");
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




app.listen(port, () => console.log(`Listening on port ${port}`));
