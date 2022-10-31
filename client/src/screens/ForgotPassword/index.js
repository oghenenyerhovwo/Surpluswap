import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, } from 'react-router-dom'

// components
import {AiOutlineUserAdd} from "react-icons/ai"
import MessageBox from '../../components/MessageBox'
import LoadingBox from '../../components/LoadingBox'

// css
import "./forgotpassword.css"

// functions
import { userActions } from "../../actions/userActions"

// type
import { FORGOT_PASSWORD_RESET } from '../../constants/userConstants'

const ForgotPassword = () => {
  const dispatch = useDispatch()

  // state
  const {errorForgotPassword, successForgotPassword, loadingForgotPassword} =  useSelector(state => state.userStore)
  const initialFormState = {
    userEmail: "",
  }
  const [form, setForm] = useState(initialFormState)

  useEffect(() => {
    if(successForgotPassword){
      setForm({
        userEmail: "",
      })
      setTimeout(() => {
        dispatch({type: FORGOT_PASSWORD_RESET})
      }, 10000);
    }
  }, [successForgotPassword,dispatch])

  useEffect(() => {
    dispatch({type: FORGOT_PASSWORD_RESET})
  }, [dispatch])

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(userActions.getResetPasswordEmail(form))
  }

  const handleChange = e => {
    const {name,value} = e.target
    setForm({...form, [name]: value})
  }

  return (
    <div className="app__forgotpassword flex__center">

      <form className="flex__column flex__center" onSubmit={handleSubmit}>
        <p className="p__base">Recover Password</p>
        <br />

        {loadingForgotPassword && <LoadingBox />}
        {errorForgotPassword && <MessageBox variant="danger">{errorForgotPassword} </MessageBox>}
        {successForgotPassword && <MessageBox>Check your email to proceed with password reset</MessageBox>}

        <br />

        <div className="input__text__field">
          <div className="flex__center"><strong><AiOutlineUserAdd fontSize={"20px"} /></strong></div>
          <input 
            onChange={handleChange}
            placeholder="Enter email"
            value={form.userEmail}
            type="email"
            name="userEmail"
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

export default ForgotPassword