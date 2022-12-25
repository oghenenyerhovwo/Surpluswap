import axios from "axios";
import { setError, backend_url, setHeader } from "../../utils"
import { 
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
} from  "../../constants/userConstants.js";

import { loadData } from "../generalActions"


export const sendResetPasswordEmail =  (userData) => (dispatch) => {
    dispatch({type: FORGOT_PASSWORD_REQUEST, payload:  userData})
    loadData(dispatch, {
      title: "Sending email...",
      state: "loading"
    })
      
      axios
        .post(`${backend_url}/users/password/recovery`, userData)
        .then(res => {
          dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: res.data})
          loadData(dispatch, {
            title: "Sent successfully",
            state: "success",
          })
        })
        .catch(err => {
          dispatch({type: FORGOT_PASSWORD_FAIL, payload: setError(err)})
          loadData(dispatch, {
            title: setError(err),
            state: "error"
          })
        });
  }
  
  export const resetPassword =  (userData) => (dispatch,getState) => {
    dispatch({type: RESET_PASSWORD_REQUEST, payload:  userData})
    const resetPasswordToken= getState().userStore.resetPasswordToken  
    loadData(dispatch, {
      title: "Resetting Password",
      state: "loading"
    })

      axios
        .post(
          `${backend_url}/users/password/reset`, 
          userData,
          setHeader(resetPasswordToken)
          )
        .then(res => {
          dispatch({type: RESET_PASSWORD_SUCCESS, payload: res.data})
          loadData(dispatch, {
            title: "Password reset successfully",
            state: "success",
            redirectText: "Redirecting to signin",
            redirectLink: "/user/signin",
          })
        })
        .catch(err => {
          dispatch({type: RESET_PASSWORD_FAIL, payload: setError(err)})
          loadData(dispatch, {
            title: setError(err),
            state: "error"
          })
        });
  }