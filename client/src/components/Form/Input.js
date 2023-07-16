import React, { useState, useEffect } from 'react'
import "./input.css"

import {BiHide} from "react-icons/bi"
import {BiShow} from "react-icons/bi"
import ErrorBox from "../ErrorBox"

// 
// BiShow
const Input = props => {
    const {
        type,
        value,
        onChange,
        name,
        label,
        trim,
        error,
        placeholder,
        disabled,
        required,
        autoComplete,
        errorMessage,
        // hideNumberArrow,
        activateRef,
        setError,
    } = props

    const [showIcon, setShowIcon] = useState(false)
    const [inputType, setInputType] = useState("")
    const [inputError, setInputError] = useState("")

    useEffect(() => {
        setInputType(type)
    }, [type])

    useEffect(() => {
        setInputError(error)
    }, [error])

    const handleIcon = () => {
        if(!showIcon){
            setInputType("text")
        } else{
            setInputType("password")
        }
        setShowIcon(prevState => !prevState )
    }

    const clearError = () => {
        setError(prevError => {
            return {...prevError, [name]: ""}
        })
    }

  return (
    <div className={`app_input grid spacing-sm ${inputError && "form__error"} app_input-number`}>
        <label className="form__label">{label}  <span className="icon_required">{label && required && "*"} </span> </label>
        <input
            className="form__field" 
            onChange={onChange}
            value={trim ? value.trim() : value}
            type={inputType}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete ={autoComplete}
        />
        {
            type === "password" && (
                <span className="app_input-password">
                    { !showIcon ? <BiShow onClick={handleIcon} /> : <BiHide onClick={handleIcon} />}
                </span>
            )
        }
        <div className="form__error_box">
            <ErrorBox 
                activateRef={activateRef} 
                inputError={error} 
                errorMessage={errorMessage || inputError} 
                name={name}
                clearError={clearError}
            />
        </div>
    </div>
  )
}

export default Input