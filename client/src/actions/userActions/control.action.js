import axios from "axios";
import {setError, backend_url,setHeader} from "../../utils"
import { 
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,

    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
} from "../../constants/userConstants.js";

import { loadData } from "../generalActions"

export const getUser=(id) => (dispatch, getState) =>  { 
  dispatch({type: GET_USER_REQUEST, payload: id})

  const token= getState().userStore.token

    axios
      .get(
        `${backend_url}/users/control/${id}`,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: GET_USER_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: GET_USER_FAIL, payload: setError(err)}));
  }


export const getUsers=() => (dispatch, getState) =>  { 
  dispatch({type: GET_USERS_REQUEST})

  const token= getState().userStore.token

    axios
      .get(
        `${backend_url}/users/control/`,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: GET_USERS_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: GET_USERS_FAIL, payload: setError(err)}));
}

export const deleteUser =(id) => (dispatch, getState) =>  { 
    dispatch({type: DELETE_USER_REQUEST, payload:  id})
    loadData(dispatch, {
      title: "Deleting account",
      state: "loading"
    })
    const token= getState().userStore.token
  
      axios
        .delete(
          `${backend_url}/users/control/${id}`,
          setHeader(token)
        )
        .then(res => {
          dispatch({type: DELETE_USER_SUCCESS, payload: res.data})
          loadData(dispatch, {
            title: "Account has been deleted deleted",
            state: "success",
          })
        })
        .catch(err => {
          dispatch({type: DELETE_USER_FAIL, payload: setError(err)})
          loadData(dispatch, {
            title: setError(err),
            state: "error"
          })
        });
  }

export const updateUser =(form, id,) => (dispatch, getState) =>  { 
    dispatch({type: UPDATE_USER_REQUEST, payload:  {form, id,}})

    const token= getState().userStore.token
  
      axios
        .put(
          `${backend_url}/users/control/${id}`,
          form,
          setHeader(token)
        )
        .then(res => {
          dispatch({type: UPDATE_USER_SUCCESS, payload: res.data})
        })
        .catch(err => dispatch({type: UPDATE_USER_FAIL, payload: setError(err)}));
  }