import React, { useState, useEffect } from 'react'

import "./dropdown.css"
// 
// BiShow
const Dropdown = props => {
    const {
        value,
        onChange,
        name,
        label,
        error,
        placeholder,
        disabled,
        options,
        required,
        restore,
        // setError,
    } = props

    const [inputError, setInputError] = useState()
    const [dropValue, setDropValue] = useState()

    useEffect(() => {
        setInputError(error)
    }, [error])

    // const clearError = () => {
    //     setError(prevError => {
    //         return {...prevError, [name]: ""}
    //     })
    // }


    useEffect(() => {
        setDropValue(value)
    }, [options, value])

    useEffect(() => {
        if(restore){
            document.getElementsByClassName(name)[0].value = ""
        }
    }, [options, restore, name])

    return (
        <div className={`app__dropdown spacing-md grid ${error && "form__error"}`}>
            <label className="form__label">{label} <span className="danger">{label && required && "*"} </span> </label>
            <select
                className={`form__field ${name}`} 
                onChange={onChange}
                value={dropValue}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
            >
                <option value="" disabled>Select option</option>
                {options && options.map((option) => (
                    <React.Fragment key={option._id}>
                        <option value={option.name}>{option.label}</option>
                    </React.Fragment>
                ))}
            </select>
            <p className="form__error-paragraph smalltext__avenir">{inputError} </p>
        </div>
    )
}

export default Dropdown