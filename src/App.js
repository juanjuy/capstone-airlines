import React, { Component } from 'react';
import { useState } from 'react';
import './App.css';
import data from './data';
import { getAirlineById, getAirportByCode } from './data.js';
import { Table } from './components/Table';

const App = () => {
  const [ currentPage, updateCurrentPage ] = useState(2);
  const [ currentRoutes, updateCurrentRoutes ] = useState(data.routes)
  var rowsPerPage = 25
  const [ pages, updatePages ] = useState(buildPages(rowsPerPage)) // updatePages(buildPages())

  const filterRoutes = () => {
    // stand-in value, WIP
  }

  const displayedRoutes = () => {
    const pagesIndex = currentPage - 1
    return pages[pagesIndex]
  }

  function buildPages(perPage) {
    const data = currentRoutes;
    const numberOfPages = Math.ceil(data.length / perPage)
    const lastEntryIndex = data.length - 1
    let pagesArr = [];
    for (let n = 1; n <= numberOfPages; n++) {
      let page = [];
      for (let rowNum = 1; rowNum <= perPage; rowNum++) {
        let dataEntryIndex = rowNum + (perPage * n) - 1
        if (dataEntryIndex > lastEntryIndex) break
        page = page.concat(data[dataEntryIndex])
      }
      pagesArr.push(page)
    }
    console.log(pagesArr);
    return pagesArr
  }

  const validateButton = (buttonType) => { 
    if (buttonType === 'previous' && currentPage === 1) return true
    if (buttonType === 'next' && currentPage === pages.length) return true
    return false
  }

  const formatValues = (property, value) => {
    // returns either airline name or airport name based on column
    if (property === 'airline') {
      return getAirlineById(value).name
    } else {
      return getAirportByCode(value).name
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
        <Table className="routes-table" columns={ columns } rows={ displayedRoutes() } format={ formatValues } />
        <NavigationMessage currentPage={currentPage} totalEntries={currentRoutes.length} perPage={rowsPerPage}/>
        <div>
          <button disabled={ validateButton('previous') } onClick={() => updateCurrentPage(currentPage - 1)}>Previous Page</button>
          <button disabled={ validateButton('next') } onClick={() => updateCurrentPage(currentPage + 1)}>Next Page</button>
        </div>
      </section>
    </div>
  )
}

function NavigationMessage({currentPage, totalEntries, perPage}) {
  let firstEntry = ( currentPage - 1 ) * perPage + 1
  let lastEntry
  if (currentPage * perPage > totalEntries) {
    lastEntry = totalEntries
  } else lastEntry = firstEntry + perPage - 1

  return <div>Showing {firstEntry}-{lastEntry} of {totalEntries} routes.</div>
}


export default App;
