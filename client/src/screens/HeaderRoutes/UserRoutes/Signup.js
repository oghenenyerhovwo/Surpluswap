import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// component
import { Spinner, MessageBox, Form } from "../../../components"

// css
import styles from "./signup.module.css"

// functions
import { signUpUser } from "../../../actions"
import { onSubmitError, onChangeError } from '../../../utils/index'

// types
import { SIGN_USER_RESET } from '../../../constants/userConstants'


const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // state
  const {currentUser, errorSignUser, successSignUser, loadingSignUser} =  useSelector(state => state.userStore)

  const initialFormState = {
    email: "",
    password: "",
    userName: "",
    firstName: "",
    phoneNumber: { isoCode:"ng" },
    confirmPassword: "",
  }
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

  useEffect(() => {
    // redirect user to signUser if user sign User is successful
    // reset form state and sign User state

    if(successSignUser || currentUser.email){
      dispatch({type: SIGN_USER_RESET})
      navigate("/dashboard")
    }
  }, [currentUser,successSignUser,dispatch,navigate])

  useEffect(() => {
    dispatch({type: SIGN_USER_RESET})
  }, [dispatch])

  // function

  const handleSubmit = e => {
    e.preventDefault()
    if(!onSubmitError(form, error, setError)){
      dispatch(signUpUser(form))
    } 
  }

  const handleChange = e => {
    const {name,value} = e.target
    setForm({...form, [name]: typeof(value) === "object" ? value : value.trim()})
    onChangeError(name, value, form, error, setError)
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
    <div className={`${styles.signup} spacing-lg`}>

      <div className={`${styles.form}`}>
        <h2 className="spacing-md">Create Account </h2>

        <div className={`${styles.form_container}`}>
            {/* <img className="logo__small spacing-md" src={logo} alt="logo" /> */}

          <div className={`${styles.google} spacing-md`}>
            {/* <Google /> */}
          </div>

          <form className="spacing-md" onSubmit={handleSubmit}>
            
            {loadingSignUser && <Spinner />}
            {errorSignUser && <MessageBox variant="danger">{errorSignUser} </MessageBox>}

            <Form.Input 
              label="Username"
              onChange={handleChange}
              value={form.userName}
              type="text"
              name="userName"
              error={error.userName}
              errorMessage="Username is required"
            />

            <Form.Input 
              label="First Name"
              onChange={handleChange}
              value={form.firstName}
              type="text"
              name="firstName"
              error={error.firstName}
              errorMessage="First Name is required"
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
            />

            <Form.PhoneNumber 
                label="Phone Number"
                onChange={handlePhone}
                value={form.phoneNumber}
                error={error.phoneNumber}
                name="phoneNumber"
                errorMessage="Provide a mobile telephone number"
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
            />
          
          </form>

          <div className={`${styles.form_buttons}`}>
            <Link to="#">
              <button 
                onClick={handleSubmit} 
                disabled={error.password && true} 
                type="submit"
                >
                  Sign Up
              </button>
            </Link>

            <Link to="/user/signin">
              <button>
                  Log In
              </button>
            </Link>
          </div>

        </div>        

      </div>
      {/* <div className={styles.image_col}>
        <div className={styles.image_col_container}>
            <h1 className="spacing-sm"><span>Become</span> a Member </h1>
            <h2 className="spacing-sm">Be the hope of a <span>dying</span> generation</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, dignissimos doloremque ducimus a eaque impedit aut rem facere earum magnam nobis delectus? Saepe iusto ad, dolorum architecto minus dolorem nemo!</p>
        </div>
      </div> */}
      
    </div>
  )
}

export default SignUp