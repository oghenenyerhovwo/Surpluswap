import axios from "axios";
import {setError, backend_url,setHeader} from "../../utils"
import { 
  
    CONFIRM_TOKEN_REQUEST,
    CONFIRM_TOKEN_SUCCESS,
    CONFIRM_TOKEN_FAIL,

    SIGNIN_TOKEN_REQUEST,
    SIGNIN_TOKEN_SUCCESS,
    SIGNIN_TOKEN_FAIL,
    
} from "../../constants/userConstants.js";
import { loadData } from "../generalActions"

export const confirmToken=(confirmationCode, confirmationType) => dispatch =>  { 
    dispatch({type: CONFIRM_TOKEN_REQUEST, payload:  confirmationCode})

    loadData(dispatch, {
      title: "Verifying email...",
      state: "loading"
    })
    
    axios
      .get(
        `${backend_url}/users/token/confirmation`,
        setHeader(confirmationCode)
      )
      .then(res => {
        dispatch({type: CONFIRM_TOKEN_SUCCESS, payload: res.data})
        confirmationType === "email_verify" && loadData(dispatch, {
          title: "Email Verified",
          state: "success",
          redirectText: "Redirecting to dashboard",
          redirectLink: "/dashboard",
        })
        confirmationType === "password_reset" && loadData(dispatch, {
          title: "Email Verified",
          state: "success",
          redirectText: "Redirecting to reset password page",
          redirectLink: "/user/password/reset",
        })
        confirmationType === "email_verify" && localStorage.setItem("lmcp_user_token", JSON.stringify(res.data.token))
      })
      .catch(err => {
        dispatch({type: CONFIRM_TOKEN_FAIL, payload: setError(err)})
        loadData(dispatch, {
          title: "Verification failed",
          state: "error"
        })
      });
  }

export const signInToken=() => (dispatch, getState) =>  { 
    dispatch({type: SIGNIN_TOKEN_REQUEST})
    const token= getState().userStore.token

    axios
      .get(
        `${backend_url}/users/token/signin`,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: SIGNIN_TOKEN_SUCCESS, payload: res.data})
      })
      .catch(err => {
        dispatch({type: SIGNIN_TOKEN_FAIL, payload: setError(err)})
      });
  }