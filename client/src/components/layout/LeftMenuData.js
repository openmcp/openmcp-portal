export function getMenu(pathParams) {
  const menuData = {
    clusters : [
      {
        type: "single",
        title : "OverView",
        path : "/clusters/" + pathParams.cluster + "/overview",
      },
      {
        type: "single",
        title : "Nodes",
        path : "/clusters/" + pathParams.cluster + "/nodes",
      },
      {
        type: "single",
        title : "Pods",
        path : "/clusters/" + pathParams.cluster + "/pods",
      },
      // {
      //   type: "single",
      //   title : "Storage Class",
      //   path : "/clusters/" + pathParams + "/storage_class",
      // },
      // {
      //   type: "multi",
      //   title : "Settings",
      //   path : "/clusters/" + pathParams + "/settings",
      //   sub : [
      //     { title: "Workloads", path: "/clusters/"+pathParams+"/settings/member" },
      //   ]
      // }
    ],
    nodes : [
      {
        type: "single",
        title : "OverView",
        path : "/nodes/" + pathParams.node + "/overview",
      },
      {
        type: "multi",
        title : "Resources",
        path : "/nodes/" + pathParams.node + "/resources",
        sub : [
          { title: "Workloads", path: "/nodes/"+pathParams.node+"/resources/workloads" },
          { title: "Pods", path: "/nodes/"+pathParams.node+"/resources/pods" },
          { title: "Services", path: "/nodes/"+pathParams.node+"/resources/services" },
          { title: "Ingress", path: "/nodes/"+pathParams.node+"/resources/ingress" },
        ]
      }
    ],
    projects : [
      {
        type: "single",
        title : "OverView",
        path : "/projects/"+pathParams.project + "/overview" + pathParams.searchString,
      },
      {
        type: "multi",
        title : "Resources",
        path : "/projects/"+pathParams.project + "/resources" + pathParams.searchString,
        sub : [
          { title: "Workloads", path: "/projects/"+pathParams.project+"/resources/workloads" + pathParams.searchString },
          { title: "Pods", path: "/projects/"+pathParams.project+"/resources/pods" + pathParams.searchString },
          { title: "Services", path: "/projects/"+pathParams.project+"/resources/services" + pathParams.searchString },
          { title: "Ingress", path: "/projects/"+pathParams.project+"/resources/ingress" + pathParams.searchString },
        ]
      },
      {
        type: "single",
        title : "Volumes",
        path : "/projects/"+pathParams.project + "/volumes" + pathParams.searchString,
      },
      {
        type: "multi",
        title : "Config",
        path : "/projects/"+pathParams.project + "/config" + pathParams.searchString,
        sub : [
          { title: "Secrets", path: "/projects/"+pathParams.project + "/config/secrets" + pathParams.searchString},
          { title: "ConfigMaps", path: "/projects/"+pathParams.project+"/config/config_maps" + pathParams.searchString},
        ]
      },
      // {
      //   type: "multi",
      //   title : "Settings",
      //   path : "/projects/" + pathParams + "/settings",
      //   sub : [
      //     { title: "Members", path: "/projects/" + pathParams + "/settings/members"},
      //   ]
      // }
    ],
    pods : [
      {
        type: "single",
        title : "OverView",
        path : "/pods/" + pathParams.pod + "/overview",
      },
      {
        type: "multi",
        title : "Resources",
        path : "/nodes/" + pathParams.pod + "/resources",
        sub : [
          { title: "Workloads", path: "/pods/"+pathParams.pod+"/resources/workloads" },
          { title: "Pods", path: "/pods/"+pathParams.pod+"/resources/pods" },
          { title: "Services", path: "/pods/"+pathParams.pod+"/resources/services" },
          { title: "Ingress", path: "/pods/"+pathParams.pod+"/resources/ingress" },
        ]
      }
    ]
  }
  return menuData;
}