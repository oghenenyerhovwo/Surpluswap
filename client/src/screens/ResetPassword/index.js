import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// components
import {AiOutlineLock} from "react-icons/ai"
import MessageBox from '../../components/MessageBox'
import LoadingBox from '../../components/LoadingBox'

// css
import "./resetpassword.css"

// functions
import { userActions } from "../../actions/userActions"

// type
import { RESET_PASSWORD_RESET, RESET_PASSWORD_FAIL } from '../../constants/userConstants'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // state
  const {currentUser, resetToken, errorResetPassword, successResetPassword, loadingResetPassword} =  useSelector(state => state.userStore)
  const initialFormState = {
    userPassword: "",
    confirmPassword: "",
  }
  const [form, setForm] = useState(initialFormState)

  useEffect(() => {
    if(successResetPassword){
      setForm({
        userPassword: "",
        confirmPassword: "",
      })
      setTimeout(() => {
        dispatch({type: RESET_PASSWORD_RESET})
        navigate("/signin")
      }, 5000);
    }
    // make sure no user without a reset token access this page
    if(!resetToken || currentUser.userEmail){
      navigate("/signin")
    }
  }, [currentUser, resetToken, successResetPassword,dispatch,navigate,])

  const handleSubmit = e => {
    e.preventDefault()
    if(form.userPassword === form.confirmPassword){
      dispatch(userActions.resetPassword({userPassword: form.userPassword}))
    } else {
      dispatch({type: RESET_PASSWORD_FAIL, payload: "Password do not match"})
    }
  }

  const handleChange = e => {
    const {name,value} = e.target
    setForm({...form, [name]: value})
  }

  return (
    <div className="app__resetpassword flex__center">

      <form className="flex__column flex__center" onSubmit={handleSubmit}>
        <p className="p__base">Reset Password</p>
        <br />

        {loadingResetPassword && <LoadingBox />}
        {errorResetPassword && <MessageBox variant="danger">{errorResetPassword} </MessageBox>}
        {successResetPassword && <MessageBox variant="success">Password reset was successful, you will be redirected to sign in </MessageBox>}
        <br />

        <div className="input__text__field">
          <div className="flex__center"><strong><AiOutlineLock fontSize={"20px"} /></strong></div>
          <input 
            onChange={handleChange}
            placeholder="password"
            value={form.userPassword}
            type="password"
            name="userPassword"
          />
        </div>

        <div className="input__text__field">
          <div className="flex__center"><strong><AiOutlineLock fontSize={"20px"} /></strong></div>
          <input 
            onChange={handleChange}
            placeholder="Confirm password"
            value={form.confirmPassword}
            type="password"
            name="confirmPassword"
          />
        </div>

        <button className="custom__button block" type="submit">Submit</button>
        
        <br /> <br />
        <div className="flex__column flex_center">
          <div>Go back to <Link className="link" to="/signin">Sign In</Link> Page</div>
        </div>

      </form>
       
    </div>
  )
}

export default ResetPassword