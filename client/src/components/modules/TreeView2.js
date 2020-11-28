import React, { Component } from "react";
import Tree from "react-d3-tree";
// import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
// import StorageIcon from "@material-ui/icons/Storage";
// import DnsIcon from "@material-ui/icons/Dns";
// import MapIcon from '@material-ui/icons/Map';
// import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
// import BallotIcon from '@material-ui/icons/Ballot';
// import LayersIcon from '@material-ui/icons/Layers';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { Link } from 'react-router-dom';




class NodeLabel extends Component {
  render() {
    const { className, nodeData } = this.props;
    return (
      <div className={className}>
        
        {/* <StorageIcon style={{ fontSize:"43px", color: "#367fa9", stroke: "none" }}/>
        <h2>{nodeData.name}</h2>
        {nodeData._children && (
          <button>{nodeData._collapsed ? "Expand" : "Collapse"}</button>
        )} */}

        {nodeData._children ? 
          [
            <div className="" style={{fontSize:"16px", fontWeight:"bold", color:"#006280"}}>{nodeData.name}</div>,
            <HomeWorkIcon style={{position:"relative", fontSize:"43px", color: "#367fa9", background: "#ffffff", stroke: "none" }}/>,
          ] : 
          [
            <Link to={"/clusters/"+nodeData.name+"/overview"}>
              <AmpStoriesIcon style={{ fontSize:"43px", color: (nodeData.attributes.status === "Healthy" ? "#0088fe" : "#ff8042"), stroke: "none", background: "#ffffff" }}/>
              <div class="" style={{fontSize:"14px", fontWeight:"bold", marginTop:"-8px"}}>
                {nodeData.name}
              </div>
              <div class="" style={{fontSize:"14px", marginTop:"-6px"}}>
                <span style={{color:(nodeData.attributes.status === "Healthy" ? "#0088fe" : "#ff8042"), fontSize:"14px", marginRight:0}}>
                  {nodeData.attributes.status}
                </span>
              </div>
            </Link>
          ]}

      </div>
    );
  }
}

class TreeView2 extends React.Component {
  state = {
    data: this.props.data
  }
  componentDidMount() {
    // console.log("didMount")
    const dimensions = this.treeContainer.getBoundingClientRect();
    // console.log("dimensions.width", dimensions.width, dimensions.height);
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 4.5,
      },
      // aa : this.treeContainer
    });
  }

  componentDidUpdate(){
    // console.log(this.treeContainer.getElementsByTagName("g")[0].getBoundingClientRect().width);
  }
  

  render() {
    const svgSquare = {
      shape: "rect",
      shapeProps: {
        width: 20,
        height: 20,
        x: -10,
        y: -10,
        fill: "#ffffff",
        stroke:"none"
      },
    };

    // const svgSquare2 = {
    //   shape: "image",
    //   shapeProps: {
    //     href: "https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png",
    //     width: 40,
    //     height: 40,
    //   },
    // };

    const styles = {
      links: {
        stroke: "black",
        strokeWidth: 2,
      },
    };

    const containerStyles = {
      // width: 100/myTreeData.length+"%",
      width: "20%",
      height: "45vh",
      // border:"1px solid #000",
      float:"left"
    };

    // console.log("ddddd");
    return (
      /* <Tree /> will fill width/height of its container; in this case `#treeWrapper` */
      // <div id="treeWrapper" style={{ width: "50em", height: "20em" }}>
      <div style={{ width: "100%"}}>
        {this.state.data.map((c) => {
          return (
            <div style={containerStyles} ref={(tc) => (this.treeContainer = tc)}>
              <Tree
                data={c}
                pathFunc="diagonal" //
                nodeSvgShape={svgSquare}
                collapsible	= {false}
                zoomable = {false}
                separation = {{siblings: 0.7, nonSiblings: 2}}
                // nodeSvgShape={svgSquare2}
                translate={this.state.translate}
                orientation="vertical" //horizontal
                allowForeignObjects
                nodeLabelComponent={{
                  render: <NodeLabel className="myLabelComponentInSvg" />,
                  // <StorageIcon style={{ fontSize:"43px", color: "#367fa9", stroke: "none" }}/>,
                  foreignObjectWrapper: {
                    // width:"250px",
                    y: -30,
                    // x: -60,
                    x: -58,
                    style: {textAlign:"center",cursor:"default"}
                  },
                }}
                styles={styles}
              />
            </div>
          );
        })}
        
        {/* <div style={containerStyles} ref={(tc) => (this.treeContainer = tc)}>
          <Tree
            data={myTreeData}
            translate={this.state.translate}
            orientation="vertical" //horizontal
            // allowForeignObjects
            // nodeLabelComponent={{
            //   render: <NodeLabel className="myLabelComponentInSvg" />,
            //   foreignObjectWrapper: {
            //     y: 0,
            //   },
            // }}
          />
        </div> */}
      </div>
    );
  }
}

export default TreeView2;


// const myTreeData = [
//   {
//     name: "ap-northeast-2",
//     attributes: {
//       status: "Healthy",
//     },
//     children: [
//       {
//         name: "cluster_01",
//         attributes: {
//           status: "Healthy",
//         },
//       },
//       {
//         name: "cluster_02",
//         attributes: {
//           status: "Healthy",
//         },
//       },
//       {
//         name: "cluster_03",
//         attributes: {
//           status: "Healthy",
//         },
//       },
//     ],
//   },
//   {
//     name: "ap-northeast-1",
//     attributes: {
//       status: "Healthy",
//     },
//     children: [
//       {
//         name: "cluster_01",
//         attributes: {
//           status: "Healthy",
//         },
//       },
//       {
//         name: "cluster_02",
//         attributes: {
//           status: "unHealthy",
//         },
//       },
//       {
//         name: "cluster_03",
//         attributes: {
//           status: "Healthy",
//         },
//       }
//     ],
//   },
//   {
//     name: "eu-west-2",
//     attributes: {
//       status: "Healthy",
//     },
//     children: [
//       {
//         name: "cluster_01",
//         attributes: {
//           status: "Healthy",
//         },
//       },
//       {
//         name: "cluster_02",
//         attributes: {
//           status: "unHealthy",
//         },
//       },
//       {
//         name: "cluster_03",
//         attributes: {
//           status: "Healthy",
//         },
//       },
//     ],
//   },
//   {
//     name: "us-east-2",
//     attributes: {
//       status: "Healthy",
//     },
//     children: [
//       {
//         name: "cluster_01",
//         attributes: {
//           status: "Healthy",
//         },
//       },
//       {
//         name: "cluster_02",
//         attributes: {
//           status: "unHealthy",
//         },
//       },
//       {
//         name: "cluster_03",
//         attributes: {
//           status: "Healthy",
//         },
//       }
//     ],
//   },
//   {
//     name: "us-east-2",
//     attributes: {
//       status: "Healthy",
//     },
//     children: [
//       {
//         name: "cluster_01",
//         attributes: {
//           status: "Healthy",
//         },
//       },
//       {
//         name: "cluster_02",
//         attributes: {
//           status: "unHealthy",
//         },
//       },
//       {
//         name: "cluster_03",
//         attributes: {
//           status: "Healthy",
//         },
//       },
//       {
//         name: "cluster_03",
//         attributes: {
//           status: "Healthy",
//         },
//       }
//     ],
//   },
// ];
