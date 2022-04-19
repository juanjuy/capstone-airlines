import React from 'react';

/*
  Create select component that takes in the list of unique airline names
  update the selected airline based on the value (using onSelect passed function)

*/
export const Select = ({options, onSelect, valueKey, titleKey, allTitle, val}) => {

  // console.log('options:', options)
  // console.log('val', val)
  return (
    <select onChange={onSelect}>
      <option value="all">{allTitle}</option>
      {options.map(({ option, disabled}, index) => {
        // replace the disabled flag when you implement that property in the option objects array
        // console.log('option', option)
        return <option disabled={ disabled } key={index} value={option[valueKey]}>{option[titleKey]}</option>
      })}
    </select>
  )
}