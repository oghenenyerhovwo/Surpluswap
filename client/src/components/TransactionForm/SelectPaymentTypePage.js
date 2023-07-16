import React from 'react'

import RadioOptions from "../RadioOptions"
import Form from "../Form"

import { onChangeError, capitalizeFirstLetter } from '../../utils'

const SelectPaymentTypePage = props => {

    const {
        form,
        error,
        setError,
        setForm,
        darkMode,
        activateRef,
    } = props

    const options = [
        { value: 'paypal', label: 'Paypal' },
        { value: 'payoneer', label: 'Payoneer' },
    ]; 

    const handleOptionChange = event => {
        const { value } = event.target
        setForm({
            ...form,
            paymentMethod: value,
        });
    }

    const handleChange = event => {
        const { value, name } = event.target
        setForm({...form, [name]: typeof(value) === "object" ? value : value.trim()})
        setError(onChangeError(name, value, form, error))
    }

    return (
        <div>
            <p className="spacing-md">Select Payment Method</p>
            <div className="spacing-md">
                <RadioOptions 
                    label="How would you like to receive payment"
                    orientation="horizontal" 
                    onChange={handleOptionChange} 
                    value={form.paymentMethod} 
                    options={options}
                    darkMode={darkMode}
                />
            </div>
            <div>
                <Form.Input 
                    label={`${capitalizeFirstLetter(String(form.paymentMethod))} Number`}
                    onChange={handleChange}
                    value={form.paymentAccountNumber}
                    type="number"
                    name="paymentAccountNumber"
                    error={error.paymentAccountNumber}
                    errorMessage="Please enter account number"
                    activateRef={activateRef}
                    required={true}
                    setError={setError}
                />
                <Form.Input 
                    label={`${capitalizeFirstLetter(String(form.paymentMethod))} Account Name`}
                    onChange={handleChange}
                    value={form.paymentAccountName}
                    type="string"
                    name="paymentAccountName"
                    error={error.paymentAccountName}
                    errorMessage="Please enter account name"
                    activateRef={activateRef}
                    required={true}
                    setError={setError}
                />
            </div>
        </div>
    )
}

export default SelectPaymentTypePage