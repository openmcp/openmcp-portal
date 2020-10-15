import React, { Component } from "react";

class Dashboard extends Component {
  render() {
    return (
      <div className="content-wrapper">

        {/* 컨텐츠 헤더 */}
        <section className="content-header">
          <h1>
            Dashboard
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

        {/* 컨텐츠 내용 */}
        <section className="content">
          {/* 테이블 */}
          <div className="row">
            <div className="col-xs-9">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Recent History</h3>
                </div>
                <div className="box-body">
                  <div
                    id="tbl_history_wrapper"
                    className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                  >
                    <div className="row">
                      <div className="col-sm-6"></div>
                      <div className="col-sm-6"></div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <table
                          id="tbl_history"
                          className="table table-bordered table-striped dataTable no-footer"
                          role="grid"
                        >
                          <thead>
                            <tr role="row">
                              <th
                                className="sorting_disabled"
                                rowspan="1"
                                colspan="1"
                              >
                                Changed By
                              </th>
                              <th
                                className="sorting_disabled"
                                rowspan="1"
                                colspan="1"
                              >
                                Content
                              </th>
                              <th
                                className="sorting_disabled"
                                rowspan="1"
                                colspan="1"
                              >
                                Time
                              </th>
                              <th
                                className="sorting_disabled"
                                rowspan="1"
                                colspan="1"
                              >
                                Detail
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="odd" role="row">
                              <td>System</td>
                              <td>User khlee authentication succeeded</td>
                              <td>2020-10-15 18:20:53</td>
                              <td width="6%">
                                <button
                                  type="button"
                                  className="btn btn-flat btn-primary history-info-button"
                                  value="{'username': 'khlee', 'authenticator': 'LOCAL', 'ip_address': '192.168.0.34', 'success': 1}"
                                >
                                  Info&nbsp;<i className="fa fa-info"></i>
                                </button>
                              </td>
                            </tr>
                            <tr className="even" role="row">
                              <td>System</td>
                              <td>User khlee authentication succeeded</td>
                              <td>2020-10-15 18:08:43</td>
                              <td width="6%">
                                <button
                                  type="button"
                                  className="btn btn-flat btn-primary history-info-button"
                                  value="{'username': 'khlee', 'authenticator': 'LOCAL', 'ip_address': '192.168.0.34', 'success': 1}"
                                >
                                  Info&nbsp;<i className="fa fa-info"></i>
                                </button>
                              </td>
                            </tr>
                            <tr className="odd" role="row">
                              <td>System</td>
                              <td>User khlee authentication succeeded</td>
                              <td>2020-10-15 16:36:23</td>
                              <td width="6%">
                                <button
                                  type="button"
                                  className="btn btn-flat btn-primary history-info-button"
                                  value="{'username': 'khlee', 'authenticator': 'LOCAL', 'ip_address': '192.168.0.34', 'success': 1}"
                                >
                                  Info&nbsp;<i className="fa fa-info"></i>
                                </button>
                              </td>
                            </tr>
                            <tr className="even" role="row">
                              <td>System</td>
                              <td>User khlee authentication succeeded</td>
                              <td>2020-10-15 15:18:41</td>
                              <td width="6%">
                                <button
                                  type="button"
                                  className="btn btn-flat btn-primary history-info-button"
                                  value="{'username': 'khlee', 'authenticator': 'LOCAL', 'ip_address': '192.168.0.34', 'success': 1}"
                                >
                                  Info&nbsp;<i className="fa fa-info"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-5"></div>
                      <div className="col-sm-7"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 텝매뉴 */}
          <div className="nav-tabs-custom">
            <ul className="nav nav-tabs">
              <li className="active">
                <a href="#tab_reverse" data-toggle="tab">
                  Hosted Domains <b> </b>
                </a>
              </li>

              <li>
                <a href="#tab_ip6arpa" data-toggle="tab">
                  Hosted Domains <b>ip6</b>
                </a>
              </li>

              <li>
                <a href="#tab_inaddrarpa" data-toggle="tab">
                  Hosted Domains <b>in-addr</b>
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="tab_reverse">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="box">
                      <div className="box-header">
                        <h3 className="box-title">
                          Hosted Domains <b> </b>
                        </h3>
                      </div>
                      <div className="box-body">
                        <div
                          id="tbl_domain_list_reverse_wrapper"
                          className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                        >
                          <div className="row">
                            <div className="col-sm-6">
                              <div
                                className="dataTables_length"
                                id="tbl_domain_list_reverse_length"
                              >
                                <label>
                                  Show{" "}
                                  <select
                                    name="tbl_domain_list_reverse_length"
                                    aria-controls="tbl_domain_list_reverse"
                                    className="form-control input-sm"
                                  >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="-1">All</option>
                                  </select>{" "}
                                  entries
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div
                                id="tbl_domain_list_reverse_filter"
                                className="dataTables_filter"
                              >
                                <label>
                                  Search:
                                  <input
                                    type="search"
                                    className="form-control input-sm"
                                    placeholder="Use ^ and $ for start and end"
                                    aria-controls="tbl_domain_list_reverse"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
                              <table
                                id="tbl_domain_list_reverse"
                                className="table table-bordered table-striped dataTable no-footer"
                                role="grid"
                              >
                                <thead>
                                  <tr role="row">
                                    <th
                                      className="sorting_asc"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_reverse"
                                      rowspan="1"
                                      colspan="1"
                                      aria-sort="ascending"
                                      aria-label="Name: activate to sort column descending"
                                    >
                                      Name
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_reverse"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="DNSSEC: activate to sort column ascending"
                                    >
                                      DNSSEC
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_reverse"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Type: activate to sort column ascending"
                                    >
                                      Type
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_reverse"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Serial: activate to sort column ascending"
                                    >
                                      Serial
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_reverse"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Master: activate to sort column ascending"
                                    >
                                      Master
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_reverse"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Account: activate to sort column ascending"
                                    >
                                      Account
                                    </th>
                                    <th
                                      width="25%"
                                      className="sorting_disabled"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Action"
                                    >
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="odd">
                                    <td
                                      valign="top"
                                      colspan="7"
                                      className="dataTables_empty"
                                    >
                                      No data available in table
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div
                                id="tbl_domain_list_reverse_processing"
                                className="dataTables_processing panel panel-default"
                              >
                                Processing...
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-5"></div>
                            <div className="col-sm-7">
                              <div
                                className="dataTables_paginate paging_simple_numbers"
                                id="tbl_domain_list_reverse_paginate"
                              >
                                <ul className="pagination">
                                  <li
                                    className="paginate_button previous disabled"
                                    id="tbl_domain_list_reverse_previous"
                                  >
                                    <a
                                      href="#"
                                      aria-controls="tbl_domain_list_reverse"
                                      data-dt-idx="0"
                                      tabindex="0"
                                    >
                                      Previous
                                    </a>
                                  </li>
                                  <li
                                    className="paginate_button next disabled"
                                    id="tbl_domain_list_reverse_next"
                                  >
                                    <a
                                      href="#"
                                      aria-controls="tbl_domain_list_reverse"
                                      data-dt-idx="1"
                                      tabindex="0"
                                    >
                                      Next
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane" id="tab_ip6arpa">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="box">
                      <div className="box-header">
                        <h3 className="box-title">
                          Hosted Domains <b>ip6</b>
                        </h3>
                      </div>
                      <div className="box-body">
                        <div
                          id="tbl_domain_list_ip6arpa_wrapper"
                          className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                        >
                          <div className="row">
                            <div className="col-sm-6">
                              <div
                                className="dataTables_length"
                                id="tbl_domain_list_ip6arpa_length"
                              >
                                <label>
                                  Show{" "}
                                  <select
                                    name="tbl_domain_list_ip6arpa_length"
                                    aria-controls="tbl_domain_list_ip6arpa"
                                    className="form-control input-sm"
                                  >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="-1">All</option>
                                  </select>{" "}
                                  entries
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div
                                id="tbl_domain_list_ip6arpa_filter"
                                className="dataTables_filter"
                              >
                                <label>
                                  Search:
                                  <input
                                    type="search"
                                    className="form-control input-sm"
                                    placeholder="Use ^ and $ for start and end"
                                    aria-controls="tbl_domain_list_ip6arpa"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
                              <table
                                id="tbl_domain_list_ip6arpa"
                                className="table table-bordered table-striped dataTable no-footer"
                                role="grid"
                              >
                                <thead>
                                  <tr role="row">
                                    <th
                                      className="sorting_asc"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_ip6arpa"
                                      rowspan="1"
                                      colspan="1"
                                      aria-sort="ascending"
                                      aria-label="Name: activate to sort column descending"
                                    >
                                      Name
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_ip6arpa"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="DNSSEC: activate to sort column ascending"
                                    >
                                      DNSSEC
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_ip6arpa"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Type: activate to sort column ascending"
                                    >
                                      Type
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_ip6arpa"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Serial: activate to sort column ascending"
                                    >
                                      Serial
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_ip6arpa"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Master: activate to sort column ascending"
                                    >
                                      Master
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_ip6arpa"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Account: activate to sort column ascending"
                                    >
                                      Account
                                    </th>
                                    <th
                                      width="25%"
                                      className="sorting_disabled"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Action"
                                    >
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="odd">
                                    <td
                                      valign="top"
                                      colspan="7"
                                      className="dataTables_empty"
                                    >
                                      No data available in table
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div
                                id="tbl_domain_list_ip6arpa_processing"
                                className="dataTables_processing panel panel-default"
                              >
                                Processing...
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-5"></div>
                            <div className="col-sm-7">
                              <div
                                className="dataTables_paginate paging_simple_numbers"
                                id="tbl_domain_list_ip6arpa_paginate"
                              >
                                <ul className="pagination">
                                  <li
                                    className="paginate_button previous disabled"
                                    id="tbl_domain_list_ip6arpa_previous"
                                  >
                                    <a
                                      href="#"
                                      aria-controls="tbl_domain_list_ip6arpa"
                                      data-dt-idx="0"
                                      tabindex="0"
                                    >
                                      Previous
                                    </a>
                                  </li>
                                  <li
                                    className="paginate_button next disabled"
                                    id="tbl_domain_list_ip6arpa_next"
                                  >
                                    <a
                                      href="#"
                                      aria-controls="tbl_domain_list_ip6arpa"
                                      data-dt-idx="1"
                                      tabindex="0"
                                    >
                                      Next
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane" id="tab_inaddrarpa">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="box">
                      <div className="box-header">
                        <h3 className="box-title">
                          Hosted Domains <b>in-addr</b>
                        </h3>
                      </div>
                      <div className="box-body">
                        <div
                          id="tbl_domain_list_inaddrarpa_wrapper"
                          className="dataTables_wrapper form-inline dt-bootstrap no-footer"
                        >
                          <div className="row">
                            <div className="col-sm-6">
                              <div
                                className="dataTables_length"
                                id="tbl_domain_list_inaddrarpa_length"
                              >
                                <label>
                                  Show{" "}
                                  <select
                                    name="tbl_domain_list_inaddrarpa_length"
                                    aria-controls="tbl_domain_list_inaddrarpa"
                                    className="form-control input-sm"
                                  >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="-1">All</option>
                                  </select>{" "}
                                  entries
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div
                                id="tbl_domain_list_inaddrarpa_filter"
                                className="dataTables_filter"
                              >
                                <label>
                                  Search:
                                  <input
                                    type="search"
                                    className="form-control input-sm"
                                    placeholder="Use ^ and $ for start and end"
                                    aria-controls="tbl_domain_list_inaddrarpa"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-12">
                              <table
                                id="tbl_domain_list_inaddrarpa"
                                className="table table-bordered table-striped dataTable no-footer"
                                role="grid"
                              >
                                <thead>
                                  <tr role="row">
                                    <th
                                      className="sorting_asc"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_inaddrarpa"
                                      rowspan="1"
                                      colspan="1"
                                      aria-sort="ascending"
                                      aria-label="Name: activate to sort column descending"
                                    >
                                      Name
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_inaddrarpa"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="DNSSEC: activate to sort column ascending"
                                    >
                                      DNSSEC
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_inaddrarpa"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Type: activate to sort column ascending"
                                    >
                                      Type
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_inaddrarpa"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Serial: activate to sort column ascending"
                                    >
                                      Serial
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_inaddrarpa"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Master: activate to sort column ascending"
                                    >
                                      Master
                                    </th>
                                    <th
                                      className="sorting"
                                      tabindex="0"
                                      aria-controls="tbl_domain_list_inaddrarpa"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Account: activate to sort column ascending"
                                    >
                                      Account
                                    </th>
                                    <th
                                      width="25%"
                                      className="sorting_disabled"
                                      rowspan="1"
                                      colspan="1"
                                      aria-label="Action"
                                    >
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="odd">
                                    <td
                                      valign="top"
                                      colspan="7"
                                      className="dataTables_empty"
                                    >
                                      No data available in table
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div
                                id="tbl_domain_list_inaddrarpa_processing"
                                className="dataTables_processing panel panel-default"
                              >
                                Processing...
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-5"></div>
                            <div className="col-sm-7">
                              <div
                                className="dataTables_paginate paging_simple_numbers"
                                id="tbl_domain_list_inaddrarpa_paginate"
                              >
                                <ul className="pagination">
                                  <li
                                    className="paginate_button previous disabled"
                                    id="tbl_domain_list_inaddrarpa_previous"
                                  >
                                    <a
                                      href="#"
                                      aria-controls="tbl_domain_list_inaddrarpa"
                                      data-dt-idx="0"
                                      tabindex="0"
                                    >
                                      Previous
                                    </a>
                                  </li>
                                  <li
                                    className="paginate_button next disabled"
                                    id="tbl_domain_list_inaddrarpa_next"
                                  >
                                    <a
                                      href="#"
                                      aria-controls="tbl_domain_list_inaddrarpa"
                                      data-dt-idx="1"
                                      tabindex="0"
                                    >
                                      Next
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;
