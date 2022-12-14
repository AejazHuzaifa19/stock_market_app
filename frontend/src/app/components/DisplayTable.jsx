
import React from 'react'

function DisplayTable(props) {
  if (props.jsonData.length === 0) return <></>;
  var data = JSON.parse(props.jsonData);

  // Extract the information you want to display
  var columnNames = Object.keys(data[0]);
  var rows = data.map(function (item) {
    return Object.values(item);
  });

  // Create the header row
  var headerRow = columnNames.map(function (columnName) {
    return <th key={columnName}>{columnName}</th>;
  });

  // Create the data rows
  var dataRows = rows.map(function (row) {
    var cells = row.map(function (cell, index) {
      return <td key={index}>{cell}</td>;
    });
    return <tr key={row.id}>{cells}</tr>;
  });
  return (
    <table id="my_table">
      <thead>
        <tr id="headrow">{headerRow}</tr>
      </thead>
      <tbody>
        {dataRows}
      </tbody>
    </table>
  )
}

export default DisplayTable;
