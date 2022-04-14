import React from 'react';
import { getAirlineById, getAirportByCode } from '../data.js';
/*
columns is array of column headers
rows is array of all data.routes
formatValue is a function that returns a string (airport or airline)

*/

const Table = ({ columns, rows, formatValues }) => {
  console.log('columns', columns);
  console.log('rows', rows);
  console.log('formatValues', formatValues);

  return (
    <table>
      <thead>
      <tr>
        { columns.map(column =>
            <td>column.name</td>
        )}
        </tr>
      </thead>
      <tbody>
      { rows.map(row => {
        return (
      <tr>
        <td>{ formatValues(columns[0].property, row.columns[0].property) }</td>
        <td>{ formatValues(columns[1].property, row.columns[1].property) }</td>
        <td>{ formatValues(columns[2].property, row.columns[2].property) }</td>
      </tr>
    )
  })
}
      </tbody>
    </table>
  )
}
