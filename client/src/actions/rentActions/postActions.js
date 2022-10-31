import axios from "axios";
import { setError, backend_url, setHeader } from "../../utils"
import { 
    CREATE_RENT_REQUEST,
    CREATE_RENT_SUCCESS,
    CREATE_RENT_FAIL,

    UPDATE_RENT_REQUEST,
    UPDATE_RENT_SUCCESS,
    UPDATE_RENT_FAIL,

} from "../../constants/rentConstants.js";

export const createRent = (ProductId) => (dispatch, getState) =>  { 
  dispatch({type: CREATE_RENT_REQUEST, payload:  ProductId})
  const token= getState().userStore.token  

    axios
      .post(
        `${backend_url}/rents/route/${ProductId}`,
        {},
        setHeader(token)
      )
      .then(res => {
        dispatch({type: CREATE_RENT_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: CREATE_RENT_FAIL, payload: setError(err)}));
  }

export const updateRent = (ProductId, rentId, data) => (dispatch, getState) =>  { 
  dispatch({type: UPDATE_RENT_REQUEST, payload:  {ProductId, rentId, data}})
  const token= getState().userStore.token  

    axios
      .put(
        `${backend_url}/rents/route/${ProductId}/${rentId}`,
        data,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: UPDATE_RENT_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: UPDATE_RENT_FAIL, payload: setError(err)}));
  }
