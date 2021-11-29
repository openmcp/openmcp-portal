// import React, { Component } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { FaServer } from "react-icons/fa";
// import { RiArrowLeftRightFill, RiArrowLeftRightLine } from "react-icons/ri";
// import { BsArrowLeftRight } from "react-icons/bs";

// class DbClusterJoinUnjoin extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       rows: "",
//       completed: 0,
//       reRender: "",
//       masterCluster: "",
//       componentList: [],
//     };
//   }

//   componentWillMount() {}

//   componentDidMount() {
//     //데이터가 들어오기 전까지 프로그래스바를 보여준다.
//     // this.timer = setInterval(this.progress, 20);
//     // this.callApi()
//     //   .then((res) => {
//     //     if(res === null){
//     //       this.setState({ rows: "" });
//     //     } else {
//     //       console.log(res)
//     //       this.setState({ rows: res });
//     //     }
//     //     clearInterval(this.timer);
//     //   })
//     //   .catch((err) => console.log(err));
//     // let userId = null;
//     // AsyncStorage.getItem("userName",(err, result) => {
//     //   userId = result;
//     // });
//     // utilLog.fn_insertPLogs(userId, 'log-DS-VW03');
//   }

//   callApi = async () => {
//     const response = await fetch(`/apis/dashboard/omcp`);
//     const body = await response.json();
//     return body;
//   };

//   onRefresh = () => {
//     this.callApi()
//       .then((res) => {
//         if (res === null) {
//           this.setState({ rows: "" });
//         } else {
//           this.setState({ rows: res });
//         }
//         clearInterval(this.timer);
//       })
//       .catch((err) => console.log(err));
//   };

//   progress = () => {
//     const { completed } = this.state;
//     this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
//   };
//   angle = {
//     full: {
//       startAngle: 0,
//       endAngle: 360,
//     },
//     half: {
//       startAngle: 0,
//       endAngle: 180,
//     },
//   };

//   render() {
//     return (
//       <div className="dash-comp">
//         {/* 컨텐츠 내용 */}
//         {/* {this.state.rows ? (
//           [ */}
//         <div style={{ display: "flex" }}>
//           <div className="content-box">
//             <div className="cb-header" onClick={this.onRefresh}>
//               <span style={{ cursor: "pointer" }}>Cluster Join/Unjoin</span>
//             </div>
//             <div
//               className="cb-body"
//               style={{
//                 position: "relative",
//                 width: "100%",
//                 display: "flex",
//               }}
//             >
//               <ClusterDnd />
//             </div>
//           </div>
//         </div>
//         {/* ]
//         ) : (
//           <CircularProgress
//             variant="determinate"
//             value={this.state.completed}
//             style={{ position: "absolute", left: "50%", marginTop: "20px" }}
//           ></CircularProgress>
//         )} */}
//       </div>
//     );
//   }
// }

// // fake data generator
// const getItems = (count, offset = 0) =>
//   Array.from({ length: count }, (v, k) => k).map((k) => ({
//     id: `cluster-${k + offset}`,
//     content: `cluster ${k + offset}`,
//   }));

// const grid = 8;
// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   // padding: grid * 2,

//   // change background colour if dragging
//   background: isDragging ? "#FFFFFF" : "#FFFFFF00",
  
//   // styles we need to apply on draggables
//   ...draggableStyle,
// });

// const getListStyle = (isDraggingOver) => ({
//   background: isDraggingOver ? "lightgrey" : "#ecf0f5",

// });

// class ClusterDnd extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: getItems(10),
//       selected: getItems(1, 10),
//     };
//     this.onDragEnd = this.onDragEnd.bind(this);
//   }

//   /**
//    * A semi-generic way to handle multiple lists. Matches
//    * the IDs of the droppable container to the names of the
//    * source arrays stored in the state.
//    */
//   id2List = {
//     droppable: "items",
//     droppable2: "selected",
//   };

//   getList = (id) => this.state[this.id2List[id]];

//   reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);

//     return result;
//   };

//   // Moves an item from one list to another list.
//   move = (source, destination, droppableSource, droppableDestination) => {
//     const sourceClone = Array.from(source);
//     const destClone = Array.from(destination);
//     const [removed] = sourceClone.splice(droppableSource.index, 1);

//     destClone.splice(droppableDestination.index, 0, removed);

//     const result = {};
//     result[droppableSource.droppableId] = sourceClone;
//     result[droppableDestination.droppableId] = destClone;

//     return result;
//   };

//   onDragEnd = (result) => {
//     const { source, destination } = result;

//     // dropped outside the list
//     if (!destination) {
//       return;
//     }

//     if (source.droppableId === destination.droppableId) {
//       //리스트 순서 이동
//       const items = this.reorder(
//         this.getList(source.droppableId),
//         source.index,
//         destination.index
//       );

//       let state = { items };

//       if (source.droppableId === "droppable2") {
//         state = { selected: items };
//       }

//       this.setState(state);
//     } else {
//       //리스트 간의 이동
//       const result = this.move(
//         this.getList(source.droppableId),
//         this.getList(destination.droppableId),
//         source,
//         destination
//       );

//       this.setState({
//         items: result.droppable,
//         selected: result.droppable2,
//       });
//     }
//   };

//   render() {
//     // a little function to help us with reordering the result

//     return (
//       <div>
//         <DragDropContext onDragEnd={this.onDragEnd}>
//           <div className="cluster-joined">
//             <Droppable droppableId="droppable" direction="horizontal">
//               {(provided, snapshot) => ([
//                 <div  className="join-unjoin-title">Joined Cluster</div>,
//                 <div
//                   className="dnd-list"
//                   ref={provided.innerRef}
//                   style={getListStyle(snapshot.isDraggingOver)}
//                 >
//                   {this.state.items.map((item, index) => (
//                     <Draggable
//                       key={item.id}
//                       draggableId={item.id}
//                       index={index}
//                     >
//                       {(provided, snapshot) => (
//                         <div
//                           className="dnd-item"
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           style={getItemStyle(
//                             snapshot.isDragging,
//                             provided.draggableProps.style
//                           )}
//                         >
//                           <div>
//                             <FaServer
//                               style={{
//                                 fontSize: "30px",
//                                 color: "#0088fe",
//                                 stroke: "none",
//                                 background: "#FFFFFF00",
//                               }}
//                             />
//                           </div>
//                           <div title={item.content}>{item.content}</div>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {/* {provided.placeholder} */}
//                 </div>]
//               )}
//             </Droppable>
//           </div>
//           <div className="dnd-navi">
//             <div>Join</div>
//             <RiArrowLeftRightLine/>
//             <div>Unjoin</div>
//           </div>
//           <div className="cluster-joinable">
//             <Droppable droppableId="droppable2" direction="horizontal">
//               {(provided, snapshot) => ([
//                 <div className="join-unjoin-title"
//                 >Joinable Cluster</div>,
//                 <div 
//                   className="dnd-list"
//                   ref={provided.innerRef}
//                   style={getListStyle(snapshot.isDraggingOver)}
//                 >
//                   {this.state.selected.map((item, index) => (
//                     <Draggable
//                       key={item.id}
//                       draggableId={item.id}
//                       index={index}
//                     >
//                       {(provided, snapshot) => (
//                         <div
//                           className ="dnd-item"
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           style={getItemStyle(
//                             snapshot.isDragging,
//                             provided.draggableProps.style
//                           )}
//                         >
//                           <div>
//                             <FaServer
//                               style={{
//                                 fontSize: "30px",
//                                 color: "#959595",
//                                 stroke: "none",
//                                 background: "#FFFFFF00",
//                               }}
//                             />
//                           </div>
//                           <div title={item.content}>{item.content}</div>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {/* {provided.placeholder} */}
//                 </div>]
//               )}
//             </Droppable>
//           </div>
//         </DragDropContext>
//       </div>
//     );
//   }
// }

// export default DbClusterJoinUnjoin;
