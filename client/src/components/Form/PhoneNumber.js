import React, { useState, useEffect } from 'react'

import { PhoneInput } from 'react-rainbow-components';
import ErrorBox from "../ErrorBox"
import "./phonenumber.css"

const PhoneNumber = props => {
    const {
        onChange,
        label,
        required,
        error,
        value,
        errorMessage,
        activateRef,
        name,
    }= props

    const [inputError, setInputError] = useState()

    useEffect(() => {
        setInputError(error)
    }, [error])

    return (
        <div  className={` grid spacing-sm ${inputError && "form__error"}`}>
            <label className="form__label">{label}  <span className="icon_required">{label && required && "*"} </span> </label>
            <div className="phonenumber_form__field">
                <PhoneInput
                    // placeholder="Enter your phone number"
                    onChange={onChange}
                    value={value}
                />
            </div>
            {
                inputError && (
                    <div className="form__error_box">
                        <ErrorBox 
                            activateRef={activateRef} 
                            inputError={error} 
                            errorMessage={errorMessage || inputError} 
                            name={name}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default PhoneNumber