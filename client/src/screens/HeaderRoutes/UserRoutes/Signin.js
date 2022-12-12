import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { motion } from "framer-motion"

// components
import { ErrorBox, Form, Google } from "../../../components"

// css
import styles from "./signin.module.css"

// functions
import { signInUser } from "../../../actions"
import { onSubmitError, onChangeError, pageAnimations,objectToArrayWithKeys } from '../../../utils/index'

// type
import { SIGN_USER_RESET } from '../../../constants/userConstants'


const SignIn = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  // state
  const {
    currentUser, 
    errorSignUser, 
    successSignUser, 
    errorGoogleData,
  } =  useSelector(state => state.userStore)

  const { 
    lightMode,
  }=  useSelector(state => state.generalStore)

  const initialFormState = {
    emailOrUsernameOrPhoneNumber: "",
    password: "",
  }
  const [form, setForm] = useState(initialFormState)
  const [error, setError] = useState(initialFormState)
  const [activateRef, setActivateRef] = useState("")

  useEffect(() => {
    if(successSignUser || currentUser.email){
      dispatch({type: SIGN_USER_RESET})  
    }
  }, [currentUser,successSignUser,dispatch, location])

  useEffect(() => {
    dispatch({type: SIGN_USER_RESET})
  }, [dispatch])

  

  const handleSubmit = e => {
    e.preventDefault()
    if(!onSubmitError(form, error, setError)){
      setActivateRef("")
      dispatch(signInUser(form))
    }else {
      const {keys} = objectToArrayWithKeys(error)
      setActivateRef(keys[0])
    }
  }

  const handleChange = e => {
    const {name,value} = e.target
    setForm({...form, [name]: typeof(value) === "object" ? value : value.trim()})
    onChangeError(name, value, form, error, setError)
  }

  return (
    <motion.div 
      className={`${styles.signin} spacing-lg ${!lightMode && styles.signin_light}`}
      variants={pageAnimations.swipeRight}
      initial="hidden"
      animate="visible"
      exit="exit"
    >

      <div className={`${styles.form}`}>
        <h2 className="spacing-md">Sign In </h2>

        <div className={`${styles.form_container}`}>
          <form className="spacing-md" onSubmit={handleSubmit}>

            <div className="spacing-sm">
              <ErrorBox 
                    activateRef={"unique"} 
                    inputError={errorSignUser || errorGoogleData} 
                    errorMessage={errorSignUser || errorGoogleData}
                />
            </div>

            <Form.Input 
              label="Email, Username or Phone Number"
              onChange={handleChange}
              value={form.emailOrUsernameOrPhoneNumber}
              type="text"
              name="emailOrUsernameOrPhoneNumber"
              error={error.emailOrUsernameOrPhoneNumber}
              errorMessage="Provide an email, username or phone number"
              activateRef={activateRef}
              required={true}
            />

            <Form.Input 
              label="Password"
              onChange={handleChange}
              value={form.password}
              type="password"
              name="password"
              error={error.password}
              errorMessage="Password is required"
              autoComplete={"true"}
              activateRef={activateRef}
              required={true}
            />

            
          </form>

          <div className={`${styles.form_buttons}`}>
            <Link to="/user/signup">
              <button>
                  Sign Up
              </button>
            </Link>

            <Link to="#">
              <button 
                onClick={handleSubmit}
                type="submit">
                  Log In
              </button>
            </Link>
          </div>

          <div className={`${styles.google} spacing-sm`}>
            <Google />
          </div>

          <div className={`${styles.forgot_passowrd}`}>
              <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
          
        </div>
 
      </div>
       
    </motion.div>
  )
}

export default SignIn