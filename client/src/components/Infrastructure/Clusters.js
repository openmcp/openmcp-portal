import React, { Component } from "react";

class Clusters extends Component {
  render() {
    return (
        <div className="content-wrapper">
        {/* 컨텐츠 헤더 */}
        <section className="content-header">
          <h1>
            Clusters
            <small>Info</small>
          </h1>
          <ol className="breadcrumb">
            <li>
              <a href="/dashboard/">
                <i className="fa fa-dashboard"></i> Home
              </a>
            </li>
            <li className="active">Dashboard</li>
          </ol>
        </section>
      </div>
    );
  }
}

export default Clusters;
