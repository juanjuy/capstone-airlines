import React from 'react';
import { useState } from 'react';
import './App.css';
import data from './data';
import { getAirlineById, getAirportByCode } from './data.js';
import { Table } from './components/Table';

const App = () => {
  const [ currentPage, updateCurrentPage ] = useState(1); // 1-indexed; used in displayedRoutes and validateButton
  const [ currentRoutes, updateCurrentRoutes ] = useState(data.routes)
  var rowsPerPage = 25 // spec 5.6 ... not seemingly used in completed app
  const [ pages, updatePages ] = useState(buildPages(rowsPerPage))
  
  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];
  
  const filterRoutes = () => {
    // stand-in value, WIP
    // left this because it might be called to update currentRoutes
    // like buildPages is called to update pages
    // just an artifact of brainstorming -- feel free to delete
  }

  const displayedRoutes = () => {
    const pagesIndex = currentPage - 1
    return pages[pagesIndex]
  }

  function buildPages(perPage) {
    const routes = currentRoutes;
    const numberOfPages = Math.ceil(routes.length / perPage)
    const lastEntryIndex = routes.length - 1
    let pagesArr = [];
    for (let n = 0; n < numberOfPages; n++) {
      let page = [];
      (() => {
        for (let rowNum = 0; rowNum < perPage; rowNum++) {
          let routesEntryIndex = rowNum + (perPage * n)
          if (routesEntryIndex > lastEntryIndex) return
          page = page.concat(routes[routesEntryIndex])
        }
      })() // IIFE to break only inner nested loop with `return`
      pagesArr.push(page)
    }
    return pagesArr
  }

  const validateButton = (buttonType) => { 
    if (buttonType === 'previous' && currentPage === 1) return true
    if (buttonType === 'next' && currentPage === pages.length) return true
    return false
  }

  const navButtonHandler = (increment) => {
    return () => updateCurrentPage(currentPage + increment)
  }

  const formatValues = (property, value) => {
    // returns either airline name or airport name based on column
    if (property === 'airline') {
      return getAirlineById(value).name
    } else {
      return getAirportByCode(value).name
    }
  }

  
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Table className="routes-table" columns={ columns } rows={ displayedRoutes() } format={ formatValues } />
        <NavigationMessage currentPage={currentPage} totalEntries={currentRoutes.length} perPage={rowsPerPage}/>
        <div>
          <NavigationButton
            disable={validateButton('previous')}
            buttonType='previous'
            handlerFunc={navButtonHandler}
          />
          <NavigationButton
            disable={validateButton('next')}
            buttonType='next'
            handlerFunc={navButtonHandler}
          />
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

function NavigationButton({disable, buttonType, handlerFunc}) {
  let increment = (buttonType === 'next' ? 1 : - 1)
  let label = buttonType[0].toUpperCase() + buttonType.slice(1) + ' Button';
  return <button disabled={disable} onClick={handlerFunc(increment)}>{label}</button>
}


export default App;
