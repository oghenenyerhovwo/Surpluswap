import React, { useState, useEffect } from 'react'

import { PhoneInput } from 'react-rainbow-components';

import "./phonenumber.css"

const PhoneNumber = props => {
    const {
        onChange,
        label,
        required,
        error,
        value,
    }= props

    const [inputError, setInputError] = useState()

    useEffect(() => {
        setInputError(error)
    }, [error])

    return (
        <div  className={`app__phone spacing-md ${inputError && "form__error"}`}>
            <label className="form__label">{label}  <span className="danger">{label && required && "*"} </span> </label>
            <PhoneInput
                placeholder="Enter your phone number"
                onChange={onChange}
                value={value}
                error={error}
            />
            <p className="form__error-paragraph smalltext__avenir">{inputError} </p>
        </div>
    )
}

export default PhoneNumber