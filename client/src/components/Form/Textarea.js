import React, { useState,  useEffect} from 'react'
import ErrorBox from "../ErrorBox"
import "./textarea.css"


const Textarea = props => {
    const {
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

    const [inputError, setInputError] = useState()

    useEffect(() => {
        setInputError(error)
    }, [error])
    
    const clearError = () => {
        setError(prevError => {
            return {...prevError, [name]: ""}
        })
    }

  return (
    <div className={`app__textarea grid  spacing-sm ${inputError && "form__error"}`}>
        <label className="form__label">{label} <span className="icon_required">{label && required && "*"} </span> </label>
        <textarea    
            className="form__field app__textarea-field" 
            onChange={onChange}
            value={trim ? value.trim() : value}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete ={autoComplete}
        ></textarea>
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

export default Textarea