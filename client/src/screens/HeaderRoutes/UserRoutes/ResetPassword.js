import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, } from 'react-router-dom'
import { motion } from "framer-motion"

// components
import { ErrorBox, Form } from '../../../components'

// css
import styles from "./resetpassword.module.css"

// functions
import { resetPassword } from "../../../actions"

// type
import { RESET_PASSWORD_RESET } from '../../../constants/userConstants'

// objects and functions
import { pageAnimations, onSubmitError, onChangeError } from '../../../utils/index'

const ResetPassword = () => {
  const dispatch = useDispatch()

  // state
  const {
    darkMode,
  }=  useSelector(state => state.generalStore)
  const { errorResetPassword, successResetPassword, resetPasswordEmail } =  useSelector(state => state.userStore)
  const initialFormState = {
    password: "",
    confirmPassword: "",
  }
  const errorKeysInOrder = [
    "password",
    "confirmPassword",
  ]
  const [form, setForm] = useState(initialFormState)
  const [error, setError] = useState(initialFormState)
  const [activateRef, setActivateRef] = useState("")


  useEffect(() => {
    if(successResetPassword){
      setForm({
        email: "",
        password: "",
        confirmPassword: "",
      })
      dispatch({type: RESET_PASSWORD_RESET})
    }
  }, [successResetPassword,dispatch])

  const handleSubmit = e => {
    e.preventDefault()
    const {isError, errorObject} =  onSubmitError(form, error, errorKeysInOrder, setActivateRef)
    setError(errorObject)
    if(!isError){
      setActivateRef("")
      dispatch(resetPassword(form))
    }
  }

  const handleChange = e => {
    const {name,value} = e.target
    setForm({...form, [name]: value})
    setError(onChangeError(name, value, form, error))
  }

  return (
    <motion.div 
        className={`${styles.resetpassword} spacing-lg ${darkMode && styles.resetpassword_light}`}
        variants={pageAnimations.swipeLeft}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
        <div className={`${styles.form}`}>
            <h2 className="spacing-md">Reset Password?</h2>
            <div className={`${styles.form_container}`}>

                <form className="flex__column flex__center" onSubmit={handleSubmit}>
                    <div className="spacing-sm">
                        <ErrorBox 
                            activateRef={"unique"} 
                            inputError={errorResetPassword} 
                            errorMessage={errorResetPassword}
                        />
                    </div>

                    <Form.Input 
                        label="Email"
                        type="text"
                        name="email"
                        placeholder={resetPasswordEmail}
                        disabled={true}
                    />

                    <Form.Input 
                        label="Password"
                        onChange={handleChange}
                        value={form.password}
                        type="password"
                        name="password"
                        error={error.password}
                        autoComplete={"true"}
                        errorMessage="Password is required"
                        activateRef={activateRef}
                        required={true}
                        setError={setError}
                      />

                      <Form.Input 
                        label="Reenter Password"
                        onChange={handleChange}
                        value={form.confirmPassword}
                        type="password"
                        name="confirmPassword"
                        error={error.confirmPassword}
                        autoComplete={"true"}
                        errorMessage="Password does not match"
                        activateRef={activateRef}
                        required={true}
                        setError={setError}
                      />

                </form>
            
                <div className={`${styles.form_buttons}`}>
                    <Link to="#">
                        <button 
                            onClick={handleSubmit}
                            type="submit"
                          >
                            Reset Password
                        </button>
                    </Link>
                </div>
            </div>

        </div>
       
    </motion.div>
  )
}

export default ResetPassword