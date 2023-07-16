import axios from "axios";
import {setError, setHeader, backend_url} from "../../utils"
import { 
    GET_TRANSACTIONS_REQUEST,
    GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_FAIL,

    GET_TRANSACTIONS_MINE_REQUEST,
    GET_TRANSACTIONS_MINE_SUCCESS,
    GET_TRANSACTIONS_MINE_FAIL,

    GET_TRANSACTION_REQUEST,
    GET_TRANSACTION_SUCCESS,
    GET_TRANSACTION_FAIL,
} from "../../constants/transactionConstants.js";

export const getTransactions = () => (dispatch, getState) =>  { 
  dispatch({type: GET_TRANSACTIONS_REQUEST})
  const token= getState().userStore.token 

    axios
      .get(
        `${backend_url}/transactions/route/`,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: GET_TRANSACTIONS_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: GET_TRANSACTIONS_FAIL, payload: setError(err)}));
}

export const getTransactionsMine = () => (dispatch, getState) =>  { 
  dispatch({type: GET_TRANSACTIONS_MINE_REQUEST})
  const token= getState().userStore.token  

    axios
      .get(
        `${backend_url}/transactions/route/mine`,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: GET_TRANSACTIONS_MINE_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: GET_TRANSACTIONS_MINE_FAIL, payload: setError(err)}));
}


export const getTransaction = (id) => (dispatch, getState) =>  { 
    dispatch({type: GET_TRANSACTION_REQUEST, payload:  id})
    const token= getState().userStore.token 
  
      axios
        .get(
          `${backend_url}/transactions/route/${id}/`,
          setHeader(token)
        )
        .then(res => {
          dispatch({type: GET_TRANSACTION_SUCCESS, payload: res.data})
        })
        .catch(err => dispatch({type: GET_TRANSACTION_FAIL, payload: setError(err)}));
}

export const getTransactionAdmin = (id) => (dispatch, getState) =>  { 
  dispatch({type: GET_TRANSACTION_REQUEST, payload:  id})
  const token= getState().userStore.token 

    axios
      .get(
        `${backend_url}/transactions/route/${id}/admin`,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: GET_TRANSACTION_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: GET_TRANSACTION_FAIL, payload: setError(err)}));
}