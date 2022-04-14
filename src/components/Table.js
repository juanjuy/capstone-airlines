import React from 'react';
// import { getAirlineById, getAirportByCode } from '../data.js';
/*
columns is array of column headers
rows is array of all data.routes
formatValue is a function that returns a string (airport or airline)

*/

export const Table = ({ className, columns, rows, format }) => {
  // console.log('columns', columns);
  // console.log('rows', rows);
  // console.log('formatValues', format);

  return (
    <table className={className}>
      <thead>
        <tr>
          { columns.map((column, index) =>
              <th key={index + 1}>{column.name}</th>
          )}
        </tr>
      </thead>
      <tbody>
      { rows.map((row, index) => {
        return (
      <tr key={index + 1}>
        {console.log("current row, ", row)}
        <td>{ format(columns[0].property, row[columns[0].property]) }</td>
        <td>{ format(columns[1].property, row[columns[1].property]) }</td>
        <td>{ format(columns[2].property, row[columns[2].property]) }</td>
      </tr>
    )
  })
}
      </tbody>
    </table>
  )
}
