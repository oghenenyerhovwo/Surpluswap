
import axios from "axios";
import {setError, backend_url} from "../../utils"
import { 
    SIGN_USER_REQUEST,
    SIGN_USER_SUCCESS,
    SIGN_USER_FAIL,
} from "../../constants/userConstants.js";
import { loadData } from "../generalActions"


export const signUserIn = (dispatch,getState, api,userData) => {
    dispatch({type: SIGN_USER_REQUEST, payload:  userData})
    loadData(dispatch, {
      title: "Logging in. please wait",
      state: "loading"
    })
    
      axios
        .post(`${backend_url}/users/${api}`, userData)
        .then(res => {
          dispatch({type: SIGN_USER_SUCCESS, payload: res.data})
          const redirectLink = res.data.user.role === "admin" ?  `/admin/dashboard/` : `/dashboard/`
          loadData(dispatch, {
            title: "Login successful",
            body: !res.data.user.isVerified && "Account is yet to be verified, please check your email for verification link or got to profile to resend link",
            state: "success",
            redirectText: "Redirecting to dashboard",
            redirectLink: redirectLink,
          })
          localStorage.setItem("surpluswap_user_token", JSON.stringify(res.data.token))
        })
        .catch(err => {
          dispatch({type: SIGN_USER_FAIL, payload: setError(err)})
          loadData(dispatch, {
            title: "Login failed",
            state: "error"
          })
        });
  }