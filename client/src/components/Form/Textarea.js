import React, { useState,  useEffect} from 'react'
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
        required,
    } = props

    const [inputError, setInputError] = useState()

    useEffect(() => {
        setInputError(error)
    }, [error])

  return (
    <div className={`app__textarea spacing-md grid ${error && "form__error"}`}>
        <label className="form__label smalltext__avenir">{label} <span className="danger">{required && "*"} </span> </label>
        <textarea
            className="app__textarea-field"
            onChange={onChange}
            value={trim ? value.trim() : value}
            name={name}
            placeholder={placeholder}    
        ></textarea>
        <p className="form__error-paragraph smalltext__avenir">{inputError} </p>
    </div>
  )
}

export default Textarea