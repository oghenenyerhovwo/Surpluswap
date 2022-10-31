import React from 'react'
import { useDispatch } from 'react-redux'

// components
import GoogleLogin from "react-google-login"

// functions
import { googleSignIn } from '../../actions/'

// css
import "./index.css"

const Google = () => {
  const dispatch = useDispatch()
  const handleLogin = async googleData => {
    dispatch(googleSignIn(googleData))
  }

  return (
    <div className="app__google spacing-sm ">
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText=  "Login with Google"
            onSuccess={handleLogin}
            // onFailure={handleLogin}
            autoLoad={false}
            cookiePolicy={'single_host_origin'}
        />
    </div>
  )
}

export default Google