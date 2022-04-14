import React, { Component } from 'react';
import './App.css';
import data from './data';
import { Table } from './components/Table';

const App = () => {

  const formatValues = (property, value) => {
    // returns either airline name or airport name based on column
    if (property === 'airline') {
      return data.getAirlineById(value).name
    } else {
      return data.getAirportByCode(value).name
    }
  }

  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];
  
  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
    <Table className="routes-table" columns={ columns } rows={ data.routes } format={ formatValues } />
    </section>
  </div>
  )
}

export default App;
