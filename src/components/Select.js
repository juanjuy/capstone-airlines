import React from 'react';

/*
  Create select component that takes in the list of unique airline names
  update the selected airline based on the value (using onSelect passed function)

*/
export const Select = ({options, onSelect, valueKey, titleKey, allTitle}) => {
  return (
    <select onChange={onSelect}>
      <option value="all">{allTitle}</option>
      {options.map((option, index) => {
        // replace the disabled flag when you implement that property in the option objects array
        return <option disabled={false} key={index} value={option[valueKey]}>{option[titleKey]}</option>
      })}
    </select>
  )
}