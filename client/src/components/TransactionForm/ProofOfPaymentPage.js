import React from 'react'

import { AiFillPicture } from 'react-icons/ai'
import Form from "../Form"


const ProofOfPaymentPage = props => {

    const {
      setForm,
      setError,
      form,
      error,
      activateRef,
      name,
    } = props

    return (
      <div>
          <p className="spacing-md">Upload proof of payment (POP)</p>
          <div>
              <Form.File 
                  icon={<AiFillPicture />}  
                  errorMessage={error[name] && error[name].text && "Provide proof of payment, at least one"}
                  accept="image/*"
                  name={name}
                  multiple={true}
                  setForm={setForm}
                  setError={setError}
                  form={form}
                  error={error}
                  activateRef={activateRef}
                  required={true}
              />
        </div>
      </div>
    )
}

export default ProofOfPaymentPage