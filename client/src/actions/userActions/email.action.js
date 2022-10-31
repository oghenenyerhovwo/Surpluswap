import axios from "axios";
import {setError, backend_url,setHeader} from "../../utils"
import { 
  
    CONFIRM_EMAIL_REQUEST,
    CONFIRM_EMAIL_SUCCESS,
    CONFIRM_EMAIL_FAIL,

    SIGNOUT_USER,
    SIGNOUT_USER_RESET,
} from "../../constants/userConstants.js";

import { signUserIn } from "./sign.util"

export const signUpUser=(userData) => dispatch =>  {
    signUserIn(dispatch, "email/signup", userData)
}

export const signInUser=(userData) => dispatch =>  {
    signUserIn(dispatch, "email/signin", userData)
}

export const confirmEmail=(confirmationCode, confirmationType) => dispatch =>  { 
  dispatch({type: CONFIRM_EMAIL_REQUEST, payload:  confirmationCode})

    axios
      .post(
        `${backend_url}/user/email/confirmation`,
        {confirmationType},
        setHeader(confirmationCode)
      )
      .then(res => {
        dispatch({type: CONFIRM_EMAIL_SUCCESS, payload: res.data})
        confirmationType === "signin" && localStorage.setItem("lmcp_user_token", JSON.stringify(res.data.token))
      })
      .catch(err => dispatch({type: CONFIRM_EMAIL_FAIL, payload: setError(err)}));
  }

export const signOut = () => dispatch => {
    dispatch({type: SIGNOUT_USER})
    dispatch({type: SIGNOUT_USER_RESET})
    localStorage.removeItem("lmcp_user_token")
};