import axios from "axios";
import {setError, backend_url,setHeader} from "../../utils"
import { 
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
} from  "../../constants/userConstants.js";

export const getResetPasswordEmail =  (userData) => (dispatch) => {
    dispatch({type: FORGOT_PASSWORD_REQUEST, payload:  userData})
      
      axios
        .post(`${backend_url}/users/password/resetrequest`, userData)
        .then(res => {
          dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: res.data})
        })
        .catch(err => dispatch({type: FORGOT_PASSWORD_FAIL, payload: setError(err)}));
  }
  
  export const resetPassword =  (userData) => (dispatch,getState) => {
    dispatch({type: RESET_PASSWORD_REQUEST, payload:  userData})
    const resetToken= getState().userStore.resetToken  
      axios
        .post(
          `${backend_url}/users/password/reset`, 
          userData,
          setHeader(resetToken)
          )
        .then(res => {
          dispatch({type: RESET_PASSWORD_SUCCESS, payload: res.data})
        })
        .catch(err => dispatch({type: RESET_PASSWORD_FAIL, payload: setError(err)}));
  }