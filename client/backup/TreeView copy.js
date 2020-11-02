// import React, { Component } from "react";
// import Tree from "react-d3-tree";
// import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
// import StorageIcon from "@material-ui/icons/Storage";
// import DnsIcon from "@material-ui/icons/Dns";

// const myTreeData = [
//   {
//     name: "Region",
//     attributes: {
//       keyA: "ASIA",
//       status: "pro",
//     },
//     children: [
//       {
//         name: "Level 2: A",
//         attributes: {
//           keyA: "val A",
//           keyB: "val B",
//           keyC: "val C",
//         },
//       },
//       {
//         name: "Level 2: B",
//       },
//     ],
//   }
// ];

// class NodeLabel extends Component {
//   render() {
//     const { className, nodeData } = this.props;
//     return (
//       <div className={className}>
        
//         <StorageIcon style={{ fontSize:"43px", color: "#367fa9", stroke: "none" }}/>
//         <h2>{nodeData.name}</h2>
//         {nodeData._children && (
//           <button>{nodeData._collapsed ? "Expand" : "Collapse"}</button>
//         )}
//       </div>
//     );
//   }
// }

// class MyComponent extends React.Component {
//   state = {};
//   componentDidMount() {
//     const dimensions = this.treeContainer.getBoundingClientRect();
//     console.log("dimensions.width", dimensions.width, dimensions.height);
//     this.setState({
//       translate: {
//         x: dimensions.width / 2,
//         y: dimensions.height / 2,
//       },
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
//         stroke: "blue",
//         strokeWidth: 3,
//       },
//       // nodes: {
//       //   node: {
//       //     circle: {
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

//     const containerStyles = {
//       width: "50%",
//       height: "50vh",
//       // display : "flex"
//     };

//     return (
//       /* <Tree /> will fill width/height of its container; in this case `#treeWrapper` */
//       // <div id="treeWrapper" style={{ width: "50em", height: "20em" }}>
//       <div style={{ width: "100%", display:"flex"}}>
//         <div style={containerStyles} ref={(tc) => (this.treeContainer = tc)}>
//           {/* <StorageIcon style={{fontSize:"50px", color:"red"}}/>
//         <DnsIcon style={{fontSize:"50px", color:"red"}}/> */}
//         <AccessAlarmIcon style={{ color: "green"}}  />
//           <Tree
//             data={myTreeData}
//             // nodeSvgShape={svgSquare}
//             // nodeSvgShape={svgSquare2}
//             translate={this.state.translate}
//             orientation="vertical" //horizontal
//             allowForeignObjects
//             nodeLabelComponent={{
//               render: <NodeLabel className="myLabelComponentInSvg" />,
//               // <StorageIcon style={{ fontSize:"43px", color: "#367fa9", stroke: "none" }}/>,
//               foreignObjectWrapper: {
//                 y: -20,
//                 x: -20
//               },
//             }}
//             styles={styles}
//           />
//         </div>
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
