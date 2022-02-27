// import React from "react";
// import { Plugin, Getter, Template } from "@devexpress/dx-react-core";
// import { Table } from "@devexpress/dx-react-grid-material-ui";

// const INDEX_COLUMN_TYPE = Symbol("IndexColumn");

// const tableColumnsWithIndexColumn = ({ tableColumns }) => {
//   return [
//     {
//       type: INDEX_COLUMN_TYPE,
//       key: INDEX_COLUMN_TYPE.toString(),
//       width: 50
//     },
//     ...tableColumns
//   ];
// };

// const tableBodyRowsWithIndex = ({ tableBodyRows }) => {
//   return tableBodyRows.map((row, index) => ({ ...row, rowIndex: index }));
// };

// export const TableIndexColumn = () => (
//   <Plugin
//     dependencies={[
//       {
//         name: "Table"
//       }
//     ]}
//   >
//     <Getter name="tableColumns" computed={tableColumnsWithIndexColumn} />
//     <Getter name="tableBodyRows" computed={tableBodyRowsWithIndex} />

//     <Template
//       name="tableCell"
//       predicate={({ tableRow, tableColumn }) =>
//         tableColumn.type === INDEX_COLUMN_TYPE &&
//         tableRow.type === Table.ROW_TYPE
//       }
//     >
//       {(params) => <Table.Cell {...params} value={params.tableRow.rowIndex} />}
//     </Template>
//   </Plugin>
// );
