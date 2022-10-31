import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'

// component
import { Spinner, MessageBox, Google, Form, Button, BackLink } from "../../components"

// css
import styles from "./signup.module.css"

// functions
import { signUpUser } from "../../actions"
import { onSubmitError, onChangeError } from '../../utils/index'

// types
import { SIGN_USER_RESET } from '../../constants/userConstants'


const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // state
  const {currentUser, errorSignUser, successSignUser, loadingSignUser} =  useSelector(state => state.userStore)

  const initialFormState = {
    email: "",
    password: "",
    fullName: "",
  }
  const [form, setForm] = useState(initialFormState)
  const [error, setError] = useState(initialFormState)
  const [submitError, setSubmitError] = useState(false)

  useEffect(() => {
    // redirect user to signUser if user sign User is successful
    // reset form state and sign User state

    if(successSignUser || currentUser.email){
      setForm({
        email: "",
        password: "",
        fullName: "",
      })
      dispatch({type: SIGN_USER_RESET})
      const redirect = (location.search && location.search.split("=")[1])
      // const location = useLocation()
      navigate(`/profile/${currentUser._id}/edit/?redirect=${redirect}` )
    }
  }, [currentUser,successSignUser,dispatch,navigate, location])

  useEffect(() => {
    dispatch({type: SIGN_USER_RESET})
  }, [dispatch])

  // function

  const handleSubmit = e => {
    e.preventDefault()
    const trimmedForm = {
      password: form.password,
      email: form.email.trim(),
      fullName: form.fullName.trim(),
    }
    setSubmitError(false)
    if(!onSubmitError(form, error, setError)){
      dispatch(signUpUser(trimmedForm))
    } else{
      setSubmitError(true)
    }
  }



  const handleChange = e => {
    const {name,value} = e.target
    setForm({...form, [name]: value})
    onChangeError(name, value, form, error, setError)
  }

  return (
    <div className={`grid ${styles.signup}`}>

      <div className={`${styles.form}`}>
        <div className={`${styles.form_container}`}>
            {/* <img className="logo__small spacing-md" src={logo} alt="logo" /> */}
          <h2 className="spacing-md">Create Account </h2>

          <div className={`${styles.google} spacing-md`}>
            <Google />
          </div>

          <form className="spacing-md" onSubmit={handleSubmit}>
            
            {loadingSignUser && <Spinner />}
            {errorSignUser && <MessageBox variant="danger">{errorSignUser} </MessageBox>}


            <Form.Input 
              label="Full Name"
              onChange={handleChange}
              value={form.fullName}
              type="text"
              name="fullName"
              error={error.fullName}
            />

            <Form.Input 
              label="Email Address"
              onChange={handleChange}
              value={form.email}
              type="email"
              name="email"
              error={error.email}
            />

            <Form.Input 
              label="Password"
              onChange={handleChange}
              value={form.password}
              type="password"
              name="password"
              trim={true}
              error={error.password}
            />

            {/* <Form.Input 
              label="Confirm Password"
              onChange={handleChange}
              value={form.confirmPassword}
              type="password"
              name="confirmPassword"
              trim={true}
              error={error.confirmPassword}
            /> */}


            <Button variant="primary" error={submitError}  disabled={error.password && true} className="btn btn-primary btn-signin spacing-md" type="submit">
              Sign Up
            </Button>

          
          </form>

          <p className="spacing-md">
            Already have an account? 
            <Link 
              to={`/signin${location.search && `?redirect=${location.search.split("=")[1]}`}`}
            >Log In</Link></p>

              <div className={styles.backlink}><BackLink /> </div> 

          </div>        

      </div>
      <div className={styles.image_col}>
        <div className={styles.image_col_container}>
            <h1 className="spacing-sm"><span>Become</span> a Member </h1>
            <h2 className="spacing-sm">Be the hope of a <span>dying</span> generation</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, dignissimos doloremque ducimus a eaque impedit aut rem facere earum magnam nobis delectus? Saepe iusto ad, dolorum architecto minus dolorem nemo!</p>
        </div>
      </div>
      
    </div>
  )
}

export default SignUp