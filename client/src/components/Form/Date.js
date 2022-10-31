import React, { useState, useEffect } from 'react'
import { DatePicker } from 'react-rainbow-components';
import "./date.css"
// import moment from "moment"


const containerStyles = {
    width: "min(90% 20rem)"
};


const Date = props => {
    
    const {
        value,
        onChange,
        error,
        label,
    } = props

    const [inputError, setInputError] = useState()

    const initialState = {
        locale: { name: 'en-US', label: 'English (US)' },
    };

    useEffect(() => {
        setInputError(error)
    }, [error])

    return (
        <div
            className="app_input rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto spacing-md"
            style={containerStyles}
        >
            <label className="form__label">{label}</label>
            <DatePicker
                id="datePicker-1"
                value={value}
                onChange={onChange}
                formatStyle="large"
                locale={initialState.locale.name}
            />
            <p className="form__error-paragraph">{inputError} </p>
        </div>
    )
}

export default Date