import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, } from 'react-router-dom'
import { motion } from "framer-motion"

// components
import { ErrorBox, Form } from '../../../components'

// css
import styles from "./forgotpassword.module.css"

// functions
import { sendResetPasswordEmail } from "../../../actions"

// type
import { FORGOT_PASSWORD_RESET } from '../../../constants/userConstants'

// objects and functions
import { pageAnimations, onSubmitError, onChangeError } from '../../../utils/index'

const ForgotPassword = () => {
  const dispatch = useDispatch()

  // state
  const { 
    darkMode,
  }=  useSelector(state => state.generalStore)
  const {errorForgotPassword, successForgotPassword } =  useSelector(state => state.userStore)
  const initialFormState = {
    email: "",
  }
  const errorKeysInOrder = [
    "email",
  ]
  const [form, setForm] = useState(initialFormState)
  const [error, setError] = useState(initialFormState)
  const [activateRef, setActivateRef] = useState("")

  useEffect(() => {
    if(successForgotPassword){
      setForm({
        email: "",
      })
      setTimeout(() => {
        dispatch({type: FORGOT_PASSWORD_RESET})
      }, 10000);
    }
  }, [successForgotPassword,dispatch])

  const handleSubmit = e => {
    e.preventDefault()
    const {isError, errorObject} = onSubmitError(form, error, errorKeysInOrder, setActivateRef)
    setError(errorObject)
    if(!isError){
      setActivateRef("")
      dispatch(sendResetPasswordEmail(form))
    }
  }

  const handleChange = e => {
    const {name,value} = e.target
    setForm({...form, [name]: value})
    setError(onChangeError(name, value, form, error))
  }

  return (
    <motion.div 
        className={`${styles.forgotpassword} spacing-lg ${darkMode && styles.forgotpassword_light}`}
        variants={pageAnimations.swipeLeft}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
        <div className={`${styles.form}`}>
            <h2 className="spacing-md">Forgot Password?</h2>
            <div className={`${styles.form_container}`}>

                <form className="flex__column flex__center" onSubmit={handleSubmit}>
                    <div className="spacing-sm">
                        <ErrorBox 
                            activateRef={"unique"} 
                            inputError={errorForgotPassword} 
                            errorMessage={errorForgotPassword}
                        />
                    </div>

                    <Form.Input 
                        label="Email"
                        onChange={handleChange}
                        value={form.email}
                        type="text"
                        name="email"
                        error={error.email}
                        errorMessage="Enter email of the account that needs reset"
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
                            Submit Email
                        </button>
                    </Link>
                    <Link to="/user/signin">
                        <button>
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>

        </div>
       
    </motion.div>
  )
}

export default ForgotPassword