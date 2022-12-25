import axios from "axios";
import { setError,  backend_url } from "../../utils"
import { 
    SIGN_USER_SUCCESS,

    GOOGLE_SIGN_IN_REQUEST,
    GOOGLE_SIGN_IN_SUCCESS,
    GOOGLE_SIGN_IN_FAIL,

} from "../../constants/userConstants.js";
  
export const googleSignIn =  (googleData ) => (dispatch) => {
    dispatch({type: GOOGLE_SIGN_IN_REQUEST, payload: googleData })
  
     axios
        .post(`${backend_url}/users/thirdparty/google/signin`, {token: googleData})
        .then(res => {
          dispatch({type: GOOGLE_SIGN_IN_SUCCESS})
          dispatch({type: SIGN_USER_SUCCESS, payload: res.data})
          localStorage.setItem("surpluswap_user_token", JSON.stringify(res.data.token))
        })
        .catch(err => dispatch({type: GOOGLE_SIGN_IN_FAIL, payload: setError(err)}));
};