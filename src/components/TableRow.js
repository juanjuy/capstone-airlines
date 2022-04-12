import React from 'react';
import { getAirlineById, getAirportByCode } from '../data.js';

const TableRow = ({ data }) => {
  return (
    <tr>
      <td>{getAirlineById(data.airline)}</td>
      <td>{getAirportByCode(data.src)}</td>
      <td>{getAirportByCode(data.dest)}</td>
    </tr>
  )
}

export {TableRow}