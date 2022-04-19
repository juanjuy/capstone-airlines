import React from 'react';

/*
  Create select component that takes in the list of unique airline names
  update the selected airline based on the value (using onSelect passed function)

*/
export const Select = ({
  options=[],
  onSelect,
   valueKey="",
   titleKey="",
   allTitle="all",
   value
  }) => {


  return (
    <select onChange={onSelect}
    value={ value }
    >
      <option value="all">{allTitle}</option>
      {options.map((option, index) => {
        let disabled = option['disabled'] === undefined ? false : option['disabled']

        return <option disabled={ disabled } key={index} value={option[valueKey]}>{option[titleKey]}</option>
      })}
    </select>
  )
}