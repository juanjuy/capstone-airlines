import React, { Component } from 'react';
import './App.css';
import data from './data';
import { TableRow } from './components/TableRow';

const App = () => (
  <div className="app">
  <header className="header">
    <h1 className="title">Airline Routes</h1>
  </header>
  <section>
    <table>
      <thead>
        <tr>
          <td>Airline</td>
          <td>Source Airport</td>
          <td>Destination Airport</td>
        </tr>
      </thead>
      <tbody>
        {data.routes.map((route, index) => {
          return (
            <TableRow data={route} key={index + 1}></TableRow>
          )
        })}
      </tbody>
    </table>
  </section>
</div>
)

export default App;