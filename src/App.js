import React, { useEffect, useCallback } from 'react';
import { useState } from 'react';
import './App.css';
import data from './data';
import { getAirlineById, getAirportByCode } from './data.js';
import { Table } from './components/Table';
import { Select } from './components/Select';

const App = () => {
  const [ currentPage, updateCurrentPage ] = useState(1); // 1-indexed; used in displayedRoutes and validateButton
  const [ currentRoutes, updateCurrentRoutes ] = useState(data.routes)
  const rowsPerPage = 25 // spec 5.6 ... not seemingly used in completed app
  const [ selectedAirline, updateSelectedAirline ] = useState("all")

  // We removed these pieces of state to simplify the code  and instead just use a regular function (filterAirlines and filterAirports) to pass the Select component the filtered list. 
  // const [ filteredAirlines ] = useState(initialAirlines())
  // const [ filteredAirports ] = useState(initialAirports())

  const [ selectedAirport, updateSelectedAirport ] = useState("all")

  const filterRoutes = useCallback(
    () => {
    // selectedAirports and selectedAirlines
    const filtered = data.routes.filter(route => {
      // if route contains selectedAirport (or all) AND selectedAirline (or all), show it
      return ((route.airline === selectedAirline || selectedAirline === "all") &&
          (route.src === selectedAirport || route.dest === selectedAirport || selectedAirport === "all"))
    })
    updateCurrentRoutes(filtered)
  }, [selectedAirport, selectedAirline])

  const buildPages = useCallback(
    (perPage) => {
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
  }, [currentRoutes])

  const [ pages, updatePages ] = useState(buildPages(rowsPerPage))

  useEffect(() => {
    // any time we select a new airline or airport, refilter the routes
    filterRoutes()

  }, [selectedAirline, selectedAirport, filterRoutes])

  useEffect(() => {
    // when currentRoutes is updated, rebuild the pages and set current page to 1
    updateCurrentPage(1)
    updatePages(buildPages(rowsPerPage))
  }, [currentRoutes, buildPages])


  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];

  function filterAirlines() {
    // filters airlines based on selectedAirport and adding in 'disabled' property that controls whether the object will be grayed out in the Select component
    let airlinesFiltered = data.airlines.map(airline => {
      let airlineFound = data.routes.some(route =>
        (route.airline === airline.id)
        && (selectedAirport === "all" || route.src === selectedAirport || route.dest === selectedAirport)
        )

      return {
        ...airline,
        disabled: !airlineFound
      }
    })
    return airlinesFiltered
  }

  function filterAirports() {
    // filter airports based on selectedAirline and add 'disabled' property
    let airportsFiltered = data.airports.map(airport => {
      let airportFound = data.routes.some(route => (route.src === airport.code || route.dest === airport.code) &&
        (route.airline === selectedAirline || selectedAirline === "all")
      )

      return {
        ...airport,
        disabled: !airportFound
      }
    })
    return airportsFiltered
  }

  const displayedRoutes = () => {
    const pagesIndex = currentPage - 1
    return pages[pagesIndex]
  }

  // ayh: extract this and Button components out?
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

  const chooseAirline = (event) => {
    // our event handlers are behaving strangely due to react so we have to use
    // the nativeEvent property instead of access the value directly from the event.target
    // The course solution doesn't use this, but we're not able to get it work like they did it
    
    // Update from Rob & Audry: Event handler seems to work on our end using regular Event object?
    const value = event.target.value

    updateSelectedAirline(Number(value) ? Number(value) : value)
    filterRoutes()
    filterAirports()

  }

  const chooseAirport = (event) => {
    updateSelectedAirport(event.target.value)
    filterRoutes()
    filterAirlines()
  }

  function clearFilters() {
    updateSelectedAirline("all")
    updateSelectedAirport("all")
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        Show routes on
      
        <Select options={ filterAirlines() } valueKey='id' titleKey='name'
          allTitle="All Airlines" value={ selectedAirline } onSelect={ chooseAirline } />
        flying in or out of
        <Select options={ filterAirports() } valueKey='code' titleKey='name'
          allTitle="All Airports" value={ selectedAirport } onSelect={ chooseAirport } />
        <button onClick={ clearFilters }>Clear Filters</button>
      
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