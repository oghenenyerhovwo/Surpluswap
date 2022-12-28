import axios from "axios"
import {setError, backend_url} from "../../utils"
import { 
    SIGNOUT_USER,
    SIGNOUT_USER_RESET,

    RESEND_EMAIL_REQUEST,
    RESEND_EMAIL_SUCCESS,
    RESEND_EMAIL_FAIL,
} from "../../constants/userConstants.js";

import { signUserIn } from "./sign.util"

import { loadData } from "../generalActions"

export const signUpUser=(userData, redirectLink) => dispatch =>  {
    signUserIn(dispatch, "email/signup", userData, redirectLink)
}

export const signInUser=(userData, redirectLink) => dispatch =>  {
    signUserIn(dispatch, "email/signin", userData, redirectLink)
}


export const signOut = () => dispatch => {
    dispatch({type: SIGNOUT_USER})
    dispatch({type: SIGNOUT_USER_RESET})
    localStorage.removeItem("surpluswap_user_token")
};

export const resendEmail =  (detail ) => (dispatch) => {
    dispatch({type: RESEND_EMAIL_REQUEST, payload: detail })
    loadData(dispatch, {
        title: "Re-sending email...",
        state: "loading"
      })
  
     axios
        .post(`${backend_url}/users/email/resend`, detail)
        .then(res => {
          dispatch({type: RESEND_EMAIL_SUCCESS, payload: res.data})
          loadData(dispatch, {
            title: "Sent successfully",
            state: "success",
          })
        })
        .catch(err => {
            dispatch({type: RESEND_EMAIL_FAIL, payload: setError(err)})
            loadData(dispatch, {
                title: setError(err),
                state: "error"
              })
        });
};