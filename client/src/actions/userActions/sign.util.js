
import axios from "axios";
import {setError, backend_url} from "../../utils"
import { 
    SIGN_USER_REQUEST,
    SIGN_USER_SUCCESS,
    SIGN_USER_FAIL,
} from "../../constants/userConstants.js";

export const signUserIn = (dispatch, api,userData) => {
    dispatch({type: SIGN_USER_REQUEST, payload:  userData})
    
      axios
        .post(`${backend_url}/users/${api}`, userData)
        .then(res => {
          dispatch({type: SIGN_USER_SUCCESS, payload: res.data})
          localStorage.setItem("lmcp_user_token", JSON.stringify(res.data.token))
        })
        .catch(err => dispatch({type: SIGN_USER_FAIL, payload: setError(err)}));
  }