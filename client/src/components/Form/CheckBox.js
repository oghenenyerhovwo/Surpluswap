import React from 'react'

import { BsFillCheckSquareFill } from "react-icons/bs"

import "./checkbox.css"

const CheckBox = props => {
    
  const {
        label,
        checked,
        onChange,
        name,
    } = props
  
  return (
    <label className="checkbox-container grid spacing-md">
        <h4>{label}</h4>
        <div className="checkbox">
          <input
              checked={checked}
              type="checkbox"
              onChange={onChange}
              name={name}
              className="checkbox__input"
          />
          <div className="checkmark__before"></div>
          <div className="checkmark__after"><BsFillCheckSquareFill /> </div>
        </div>
    </label>
  )
}

export default CheckBox