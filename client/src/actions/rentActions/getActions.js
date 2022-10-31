import axios from "axios";
import {setError,setHeader, backend_url} from "../../utils"
import { 
  GET_RENTS_REQUEST,
  GET_RENTS_SUCCESS,
  GET_RENTS_FAIL,

} from "../../constants/rentConstants.js";

export const getRents = () => (dispatch, getState) =>  { 
  dispatch({type: GET_RENTS_REQUEST})
  const token= getState().userStore.token

    axios
      .get(
        `${backend_url}/rents/route`,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: GET_RENTS_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: GET_RENTS_FAIL, payload: setError(err)}));
}