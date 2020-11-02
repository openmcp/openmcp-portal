// import React, { Component } from "react";
// import Tree from "react-d3-tree";
// import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
// import StorageIcon from "@material-ui/icons/Storage";
// import DnsIcon from "@material-ui/icons/Dns";
// import MapIcon from '@material-ui/icons/Map';
// import AccountTreeIcon from '@material-ui/icons/AccountTree';
// import AmpStoriesIcon from '@material-ui/icons/AmpStories';
// import BallotIcon from '@material-ui/icons/Ballot';
// import LayersIcon from '@material-ui/icons/Layers';


// const myTreeData = [
//   {
//     name: "ap-northeast-2",
//     attributes: {
//       status: "healthy",
//     },
//     children: [
//       {
//         name: "cluster_01",
//         attributes: {
//           status: "healthy",
//         },
//       },
//       {
//         name: "cluster_02",
//         attributes: {
//           status: "healthy",
//         },
//       },
//       {
//         name: "cluster_03",
//         attributes: {
//           status: "healthy",
//         },
//       },
//     ],
//   },
//   {
//     name: "ap-northeast-1",
//     attributes: {
//       status: "healthy",
//     },
//     children: [
//       {
//         name: "cluster_01",
//         attributes: {
//           status: "healthy",
//         },
//       },
//       {
//         name: "cluster_02",
//         attributes: {
//           status: "unhealthy",
//         },
//       },
//       {
//         name: "cluster_03",
//         attributes: {
//           status: "healthy",
//         },
//       },
//       {
//         name: "cluster_04",
//         attributes: {
//           status: "healthy",
//         },
//       },
//       {
//         name: "cluster_05",
//         attributes: {
//           status: "healthy",
//         },
//       },
//     ],
//   },
//   {
//     name: "eu-west-2",
//     attributes: {
//       status: "healthy",
//     },
//     children: [
//       {
//         name: "cluster_01",
//         attributes: {
//           status: "healthy",
//         },
//       },
//       {
//         name: "cluster_02",
//         attributes: {
//           status: "unhealthy",
//         },
//       },
//       {
//         name: "cluster_03",
//         attributes: {
//           status: "healthy",
//         },
//       },
//     ],
//   },
//   // {
//   //   name: "us-east-2",
//   //   attributes: {
//   //     status: "healthy",
//   //   },
//   //   children: [
//   //     {
//   //       name: "cluster_01",
//   //       attributes: {
//   //         status: "healthy",
//   //       },
//   //     },
//   //     {
//   //       name: "cluster_02",
//   //       attributes: {
//   //         status: "unhealthy",
//   //       },
//   //     },
//   //     {
//   //       name: "cluster_03",
//   //       attributes: {
//   //         status: "healthy",
//   //       },
//   //     },
//   //     {
//   //       name: "cluster_04",
//   //       attributes: {
//   //         status: "healthy",
//   //       },
//   //     },
//   //     {
//   //       name: "cluster_05",
//   //       attributes: {
//   //         status: "healthy",
//   //       },
//   //     },
//   //     {
//   //       name: "cluster_06",
//   //       attributes: {
//   //         status: "healthy",
//   //       },
//   //     },
//   //   ],
//   // }

  
// ];




// class NodeLabel extends Component {
//   render() {
//     const { className, nodeData } = this.props;
//     return (
//       <div className={className}>
        
//         {/* <StorageIcon style={{ fontSize:"43px", color: "#367fa9", stroke: "none" }}/>
//         <h2>{nodeData.name}</h2>
//         {nodeData._children && (
//           <button>{nodeData._collapsed ? "Expand" : "Collapse"}</button>
//         )} */}

//         {nodeData._children ? 
//           [
//             <div class="" style={{fontSize:"16px", fontWeight:"bold", color:"#006280"}}>{nodeData.name}</div>,
//             <MapIcon style={{position:"relative", fontSize:"43px", color: "#367fa9", background: "#ffffff", stroke: "none" }}/>,
//           ] : 
//           [
//             <AmpStoriesIcon style={{ fontSize:"43px", color: (nodeData.attributes.status === "healthy" ? "#0088fe" : "#ff8042"), stroke: "none", background: "#ffffff" }}/>,
//             <div class="" style={{fontSize:"14px", fontWeight:"bold"}}>{nodeData.name}</div>,
//             <div class="" style={{fontSize:"14px"}}>
//               <span style={{color:(nodeData.attributes.status === "healthy" ? "#0088fe" : "#ff8042"), fontSize:"14px"}}>{nodeData.attributes.status}</span>
//             </div>
//           ]}

//       </div>
//     );
//   }
// }

// class MyComponent extends React.Component {
//   state = {};
//   componentDidMount() {
//     // console.log("didMount")
//     const dimensions = this.treeContainer.getBoundingClientRect();
//     console.log("dimensions.width", dimensions.width, dimensions.height);
//     this.setState({
//       translate: {
//         x: dimensions.width / 2,
//         y: dimensions.height / 4,
//       },
//       // aa : this.treeContainer
//     });
//   }
  

//   render() {
//     const svgSquare = {
//       shape: "rect",
//       shapeProps: {
//         width: 20,
//         height: 20,
//         x: -10,
//         y: -10,
//         fill: "#ffffff",
//         stroke:"none"
//       },
//     };

//     const svgSquare2 = {
//       shape: "image",
//       shapeProps: {
//         href: "https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png",
//         width: 40,
//         height: 40,
//       },
//     };

//     const styles = {
//       links: {
//         stroke: "black",
//         strokeWidth: 2,
//       },
//       // nodes: {
//       //   node: {
//       //     rect: {
//       //       stroke: "blue",
//       //       strokeWidth: "1",
//       //       fill: "green",
//       //     },
//       //   },
//       // },
//     };

//     // const styles={
//     //   links: {
//     //     stroke: 'blue',
//     //     strokeWidth: 3
//     //   }
//     //   nodes: {
//     //     node: {
//     //       circle: {
//     //         cx="50",
//     //         cy="50",
//     //         r="45",
//     //         stroke="blue",
//     //         strokeWidth="2.5",
//     //         fill="green"
//     //       },
//     //       // {/* name: <svgStyleObject>,
//     //       // attributes: <svgStyleObject>, */}
//     //     },
//     //     // leafNode: {
//     //     //   circle: <svgStyleObject>,
//     //     //   name: <svgStyleObject>,
//     //     //   attributes: <svgStyleObject>,
//     //     // },
//     //   },
//     // };
//     console.log("aassss", this.state.aa);
//     const containerStyles = {
//       // width: 100/myTreeData.length+"%",
//       width: "33.3%",
//       height: "45vh",
//       float:"left"
//     };

//     console.log("ddddd");
//     return (
//       /* <Tree /> will fill width/height of its container; in this case `#treeWrapper` */
//       // <div id="treeWrapper" style={{ width: "50em", height: "20em" }}>
//       <div style={{ width: "100%"}}>
//         {myTreeData.map((c) => {
//           return (
//             <div style={containerStyles} ref={(tc) => (this.treeContainer = tc)}>
//               <Tree
//                 data={c}
//                 pathFunc="diagonal" //
//                 nodeSvgShape={svgSquare}
//                 collapsible	= {false}
//                 zoomable = {false}
//                 separation = {{siblings: 0.7, nonSiblings: 2}}
//                 // nodeSvgShape={svgSquare2}
//                 translate={this.state.translate}
//                 orientation="vertical" //horizontal
//                 allowForeignObjects
//                 nodeLabelComponent={{
//                   render: <NodeLabel className="myLabelComponentInSvg" />,
//                   // <StorageIcon style={{ fontSize:"43px", color: "#367fa9", stroke: "none" }}/>,
//                   foreignObjectWrapper: {
//                     width:"250px",
//                     y: -30,
//                     // x: -60,
//                     x: -125,
//                     style: {textAlign:"center"}
//                   },
//                 }}
//                 styles={styles}
//               />
//             </div>
//           );
//         })}
        
//         {/* <div style={containerStyles} ref={(tc) => (this.treeContainer = tc)}>
//           <Tree
//             data={myTreeData}
//             translate={this.state.translate}
//             orientation="vertical" //horizontal
//             // allowForeignObjects
//             // nodeLabelComponent={{
//             //   render: <NodeLabel className="myLabelComponentInSvg" />,
//             //   foreignObjectWrapper: {
//             //     y: 0,
//             //   },
//             // }}
//           />
//         </div> */}
//       </div>
//     );
//   }
// }

// export default MyComponent;
