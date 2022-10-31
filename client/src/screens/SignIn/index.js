import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'

// components
import { Spinner, MessageBox, Button, Google, Form, BackLink } from "../../components"


// css
import styles from "./signin.module.css"

// functions
import { signInUser } from "../../actions"
import { onSubmitError, onChangeError } from '../../utils/index'

// type
import { SIGN_USER_RESET } from '../../constants/userConstants'


const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // state
  const {currentUser, errorSignUser, successSignUser, loadingSignUser} =  useSelector(state => state.userStore)
  const initialFormState = {
    email: "",
    password: "",
  }
  const [form, setForm] = useState(initialFormState)
  const [error, setError] = useState(initialFormState)
  const [submitError, setSubmitError] = useState(false)

  useEffect(() => {
    if(successSignUser || currentUser.email){
      setForm({
        email: "",
        password: "",
      })
      dispatch({type: SIGN_USER_RESET})
      navigate(location.search ? location.search.split("=")[1] : `/profile/${currentUser._id}` )
    }
  }, [currentUser,successSignUser,dispatch,navigate, location])

  useEffect(() => {
    dispatch({type: SIGN_USER_RESET})
  }, [dispatch])

  

  const handleSubmit = e => {
    e.preventDefault()
    const trimmedForm = {
      password: form.password,
      email: form.email.trim(),
    }
    setSubmitError(false)
    if(!onSubmitError(form, error, setError)){
      dispatch(signInUser(trimmedForm))
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
    <div className={`grid ${styles.signin}`}>

      <div className={`${styles.form}`}>
        <div className={`${styles.form_container}`}>
          {/* <img className="logo__small spacing-md" src={logo} alt="logo" /> */}
          <h1 className="spacing-md">Sign In </h1>
          <div className={`${styles.google} spacing-md`}>
            <Google />
          </div>
          <form className="spacing-md" onSubmit={handleSubmit}>
            
            {loadingSignUser && <Spinner />}
            {errorSignUser && <MessageBox variant="danger">{errorSignUser} </MessageBox>}
            
            <Form.Input 
              label="Email"
              onChange={handleChange}
              value={form.email}
              type="text"
              name="email"
              error={error.email}
            />

            <Form.Input 
              label="Password"
              onChange={handleChange}
              value={form.password}
              type="password"
              name="password"
              error={error.password}
              trim={true}
            />

            <p className="spacing-md">
              <Link to="/forgotpassword">Forgot Password?</Link>
            </p>

            <Button variant="primary" error={submitError} className="spacing-sm" type="submit">Sign In</Button>
          </form>

          <p className="spacing-sm">
            Don’t have an account? 
            <Link 
              to={`/signup${location.search && `?redirect=${location.search.split("=")[1]}`}`}
            >Sign Up</Link>
          </p>

          <div className={styles.backlink}><BackLink /> </div> 
          </div>
        </div>

      <div className={styles.image_col}>
        <div className={styles.image_col_container}>
            <h1 className="spacing-sm"><span>Welcome </span>back </h1>
            <h2 className="spacing-sm">Let us make <span>impact</span> together</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, dignissimos doloremque ducimus a eaque impedit aut rem facere earum magnam nobis delectus? Saepe iusto ad, dolorum architecto minus dolorem nemo!</p>
        </div>
      </div>

      
       
    </div>
  )
}

export default SignIn