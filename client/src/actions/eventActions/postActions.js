import axios from "axios";
import { setError, backend_url, setHeader } from "../../utils"
import { 
    CREATE_EVENT_REQUEST,
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_FAIL,

    UPDATE_EVENT_REQUEST,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAIL,

    DELETE_EVENT_REQUEST,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAIL,
} from "../../constants/eventConstants.js";

export const createEvent = (form) => (dispatch, getState) =>  { 
  dispatch({type: CREATE_EVENT_REQUEST, payload:  form})
  const token= getState().userStore.token  

    axios
      .post(
        `${backend_url}/events/route/`,
        form,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: CREATE_EVENT_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: CREATE_EVENT_FAIL, payload: setError(err)}));
  }


export const updateEvent = (form, id) => (dispatch, getState) =>  { 
  dispatch({type: UPDATE_EVENT_REQUEST, payload:  {form, id}})
  const token= getState().userStore.token  

    axios
      .put(
        `${backend_url}/events/route/${id}`,
        form,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: UPDATE_EVENT_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: UPDATE_EVENT_FAIL, payload: setError(err)}));
  }

export const deleteEvent = (id) => (dispatch, getState) =>  { 
    dispatch({type: DELETE_EVENT_REQUEST, payload:  id})
    const token= getState().userStore.token  
  
      axios
        .delete(
          `${backend_url}/events/route/${id}`,
          setHeader(token)
        )
        .then(res => {
          dispatch({type: DELETE_EVENT_SUCCESS, payload: res.data})
        })
        .catch(err => dispatch({type: DELETE_EVENT_FAIL, payload: setError(err)}));
}