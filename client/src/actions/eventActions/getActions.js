import axios from "axios";
import {setError, setHeader, backend_url} from "../../utils"
import { 
    GET_EVENTS_REQUEST,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FAIL,

    GET_EVENTS_WITH_LIMIT_REQUEST,
    GET_EVENTS_WITH_LIMIT_SUCCESS,
    GET_EVENTS_WITH_LIMIT_FAIL,

    GET_EVENTS_MINE_REQUEST,
    GET_EVENTS_MINE_SUCCESS,
    GET_EVENTS_MINE_FAIL,

    GET_EVENT_REQUEST,
    GET_EVENT_SUCCESS,
    GET_EVENT_FAIL,
} from "../../constants/eventConstants.js";

export const getEvents = () => (dispatch) =>  { 
  dispatch({type: GET_EVENTS_REQUEST})

    axios
      .get(
        `${backend_url}/events/route/`,
      )
      .then(res => {
        dispatch({type: GET_EVENTS_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: GET_EVENTS_FAIL, payload: setError(err)}));
}

export const getEventsWithLimit = (limit) => (dispatch) =>  { 
  dispatch({type: GET_EVENTS_WITH_LIMIT_REQUEST, payload: limit})

    axios
      .get(
        `${backend_url}/events/route/limit/${limit}`,
      )
      .then(res => {
        dispatch({type: GET_EVENTS_WITH_LIMIT_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: GET_EVENTS_WITH_LIMIT_FAIL, payload: setError(err)}));
}

export const getEventsMine = () => (dispatch, getState) =>  { 
  dispatch({type: GET_EVENTS_MINE_REQUEST})
  const token= getState().userStore.token  

    axios
      .get(
        `${backend_url}/events/route/mine`,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: GET_EVENTS_MINE_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: GET_EVENTS_MINE_FAIL, payload: setError(err)}));
}


export const getEvent = (id) => (dispatch) =>  { 
    dispatch({type: GET_EVENT_REQUEST, payload:  id})
  
      axios
        .get(
          `${backend_url}/events/route/${id}/`,
        )
        .then(res => {
          dispatch({type: GET_EVENT_SUCCESS, payload: res.data})
        })
        .catch(err => dispatch({type: GET_EVENT_FAIL, payload: setError(err)}));
}