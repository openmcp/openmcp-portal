// import { CircularProgress } from "@material-ui/core";
// import React, { Component, useState } from "react";
// import { PieChart, Pie, Sector, Cell } from "recharts";
// import PieReChartPowerRange from "../../modules/PieReChartPowerRange";

// class DbPowerUsage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // range : this.props.range,
//       range: [
//         { name: "low", value: 20 },
//         { name: "medium", value: 50 },
//         { name: "high", value: 30 },
//       ],
//       // rows: this.props.data,
//       rows: [
//         { name: "usage", value: 10 },
//         { name: "available", value: 90 },
//       ],
//       // settings : this.props.settings
//       settings: {
//         width: 170,
//         height: 140,
//         cx: 80,
//         cy: 80,
//         outerRadius: 69,
//         innerRadius: 40,
//         startAngle: 200,
//         endAngle: -20,
//       },
//     };
//   }

//   render() {
//     return (
//         <div className="dash-comp">
//           {/* 컨텐츠 내용 */}

//           <div style={{ display: "flex" }}>
//             <div className="content-box">
//               <div className="cb-header">
//                 <span>Cluster Power Usage (AVG)</span>
//                 {/* <div className="cb-btn">
//                       <Link to={this.props.path}>detail</Link>
//                     </div> */}
//               </div>
//               <div
//                 className="cb-body"
//                 style={{ position: "relative"}}
//               >
//                 {this.state.rows ? (
//                   <PieReChartPowerRange range={this.state.range} data={this.state.rows} settings={this.state.settings}/>
//                 ) : (
//                   <div
//                     style={{
//                       position: "relative",
//                       margin: "10px auto",
//                       left: 0,
//                       right: 0,
//                     }}
//                   >
//                     {this.state.loadErr ? (
//                       <div>{this.state.loadErr}</div>
//                     ) : (
//                       <CircularProgress
//                         variant="determinate"
//                         value={this.state.completed}
//                       ></CircularProgress>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//     );
//   }
// }

// export default DbPowerUsage;
