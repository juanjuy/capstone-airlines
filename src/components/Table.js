import React from 'react';

/*
columns is array of column headers
rows is array of routes displayed on current page
formatValue is a function that returns a string (airport or airline name)
*/

export const Table = ({ className, columns, rows, format }) => {
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
              {columns.map((column, ind) => {
                return <td key={ind}>{format(column.property, row[column.property])}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
