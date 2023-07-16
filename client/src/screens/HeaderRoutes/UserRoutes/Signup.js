import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"

// component
import { ErrorBox, Form, Google } from "../../../components"

// css
import styles from "./signup.module.css"

// functions
import { signUpUser } from "../../../actions"
import { onSubmitError, onChangeError, pageAnimations } from '../../../utils/index'

// types
import { SIGN_USER_RESET } from '../../../constants/userConstants'


const SignUp = () => {
  const dispatch = useDispatch()

  // state
  const {
    currentUser, 
    errorSignUser, 
    successSignUser, 
    errorGoogleData,
  } =  useSelector(state => state.userStore)

  const { 
    darkMode,
  }=  useSelector(state => state.generalStore)

  const initialFormState = {
    userName: "",
    firstName: "",
    email: "",
    phoneNumber: { isoCode:"ng" },
    password: "",
    confirmPassword: "",
  }

  const errorKeysInOrder = [
    "userName",
    "firstName",
    "email",
    "phoneNumber",
    "password",
    "confirmPassword",
  ]

  const [form, setForm] = useState({
    ...initialFormState,
    phoneNumberText: "",
    lastName: "",
    phoneNumberTextWithCode: "",
  })
  const [error, setError] = useState({
    ...initialFormState,
    phoneNumber: "",
  })
  

  const [activateRef, setActivateRef] = useState("")

  const signInLink = "/user/signin/"

  useEffect(() => {
    // redirect user to signUser if user sign User is successful
    // reset form state and sign User state

    if(successSignUser || currentUser.email){
      dispatch({type: SIGN_USER_RESET})
    }
  }, [currentUser,successSignUser,dispatch])

  useEffect(() => {
    dispatch({type: SIGN_USER_RESET})
  }, [dispatch])

  // function

  const handleSubmit = e => {
    e.preventDefault()
    const {isError, errorObject} = onSubmitError(form, error, errorKeysInOrder, setActivateRef)
    setError(errorObject)
    if(!isError){
      setActivateRef("")
      dispatch(signUpUser(form))
    }
  }

  const handleChange = e => {
    const {name,value} = e.target
    setForm({...form, [name]: typeof(value) === "object" ? value : value.trim()})
    setError(onChangeError(name, value, form, error))
  }

  const handlePhone = phone => {
    const digitNumber = `${phone.phone}`
    const digitNumberPlusCode = `${phone.countryCode}${Number(phone.phone)}`
    setForm({
      ...form, 
      phoneNumber: phone,
      phoneNumberText: digitNumber,
      phoneNumberTextWithCode: digitNumberPlusCode
    })
    onChangeError("phoneNumber", phone.phone, form, error, setError)
  }

  return (
    <motion.div 
      className={`${styles.signup} spacing-lg ${darkMode && styles.signup_dark}`}
      variants={pageAnimations.swipeLeft}
      initial="hidden"
      animate="visible"
      exit="exit"
    >

      <div className={`${styles.form}`}>
        <h2 className="spacing-md">Create Account </h2>

        <div className={`${styles.form_container}`}>
            {/* <img className="logo__small spacing-md" src={logo} alt="logo" /> */}

          <form className="spacing-md" onSubmit={handleSubmit}>
            
            <div className="spacing-sm">
              <ErrorBox 
                  activateRef={"unique"} 
                  inputError={errorSignUser || errorGoogleData} 
                  errorMessage={errorSignUser || errorGoogleData}
                />
            </div>

            <Form.Input 
              label="Username"
              onChange={handleChange}
              value={form.userName}
              type="text"
              name="userName"
              error={error.userName}
              errorMessage="Username is required"
              activateRef={activateRef}
              required={true}
              setError={setError}
            />

            <Form.Input 
              label="First Name"
              onChange={handleChange}
              value={form.firstName}
              type="text"
              name="firstName"
              error={error.firstName}
              errorMessage="First Name is required"
              activateRef={activateRef}
              required={true}
              setError={setError}
            />

            <Form.Input 
              label="Last Name"
              onChange={handleChange}
              value={form.lastName}
              type="text"
              name="lastName"
            />

            <Form.Input 
              label="Email Address"
              onChange={handleChange}
              value={form.email}
              type="email"
              name="email"
              error={error.email}
              errorMessage="Provide an email"
              activateRef={activateRef}
              required={true}
              setError={setError}
            />

            <Form.PhoneNumber 
              label="Phone Number"
              onChange={handlePhone}
              value={form.phoneNumber}
              error={error.phoneNumber}
              name="phoneNumber"
              errorMessage="Provide a mobile telephone number"
              activateRef={activateRef}
              required={true}
              setError={setError}
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
                  Sign Up
              </button>
            </Link>

            <Link to={signInLink}>
              <button>
                  Log In
              </button>
            </Link>
          </div>
          <div className={`${styles.google}`}>
            <Google/>
          </div>

        </div>       

      </div>
      
    </motion.div>
  )
}

export default SignUp