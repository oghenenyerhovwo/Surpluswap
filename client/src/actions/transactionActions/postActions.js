import axios from "axios";
import { setError, backend_url, setHeader } from "../../utils"
import { 
    CREATE_TRANSACTION_REQUEST,
    CREATE_TRANSACTION_SUCCESS,
    CREATE_TRANSACTION_FAIL,

    UPDATE_TRANSACTION_REQUEST,
    UPDATE_TRANSACTION_SUCCESS,
    UPDATE_TRANSACTION_FAIL,

    DELETE_TRANSACTION_REQUEST,
    DELETE_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_FAIL,
} from "../../constants/transactionConstants.js";
import { loadData } from "../generalActions"

export const createTransaction = (form) => (dispatch, getState) =>  { 
  dispatch({type: CREATE_TRANSACTION_REQUEST, payload:  form})
  const token= getState().userStore.token  

  loadData(dispatch, {
    title: "Setting up transaction....",
    state: "loading"
  })

    axios
      .post(
        `${backend_url}/transactions/route/`,
        form,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: CREATE_TRANSACTION_SUCCESS, payload: res.data})
        const redirectLink =`/dashboard/transaction/${res.data.id}/update`
        
        loadData(dispatch, {
          title: "Created successfully",
          state: "success",
          redirectText: "Redirecting to transaction page",
          redirectLink: redirectLink,
        })
      })
      .catch(err => {
        dispatch({type: CREATE_TRANSACTION_FAIL, payload: setError(err)})
        loadData(dispatch, {
          title: setError(err),
          state: "error"
        })
      });
  }


export const updateTransaction = (form, id) => (dispatch, getState) =>  { 
    dispatch({type: UPDATE_TRANSACTION_REQUEST, payload:  {form, id}})
    const token= getState().userStore.token  

    loadData(dispatch, {
      title: "Sending transaction details to admin",
      state: "loading"
    })

    axios
      .put(
        `${backend_url}/transactions/route/${id}`,
        form,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: UPDATE_TRANSACTION_SUCCESS, payload: res.data})
        const redirectLink =`/dashboard`
        loadData(dispatch, {
          title: "Sent successfully",
          state: "success",
          redirectText: "Redirecting to transaction page",
          redirectLink: redirectLink,
        })
        localStorage.removeItem(`surpluswap_non_active_transactions_${ res.data.id}`)
      })
      .catch(err => {
        dispatch({type: UPDATE_TRANSACTION_FAIL, payload: setError(err)})
        loadData(dispatch, {
          title: setError(err),
          state: "error"
        })
      });
  }

export const updateTransactionAdmin = (form, id) => (dispatch, getState) =>  { 
    dispatch({type: UPDATE_TRANSACTION_REQUEST, payload:  {form, id}})
    const token= getState().userStore.token  
    loadData(dispatch, {
      title: "Updating transaction status",
      state: "loading"
    })

    axios
      .put(
        `${backend_url}/transactions/route/${id}/admin`,
        form,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: UPDATE_TRANSACTION_SUCCESS, payload: res.data})
        const redirectLink =`/admin/dashboard`
        loadData(dispatch, {
          title: "Updated successfully",
          state: "success",
          redirectText: "Redirecting to dashboard",
          redirectLink: redirectLink,
        })
      })
      .catch(err => {
        dispatch({type: UPDATE_TRANSACTION_FAIL, payload: setError(err)})
        loadData(dispatch, {
          title: setError(err),
          state: "error"
        })
      });
  }

export const deleteTransaction = (id) => (dispatch, getState) =>  { 
    dispatch({type: DELETE_TRANSACTION_REQUEST, payload:  id})
    const token= getState().userStore.token  
  
      axios
        .delete(
          `${backend_url}/transactions/route/${id}`,
          setHeader(token)
        )
        .then(res => {
          dispatch({type: DELETE_TRANSACTION_SUCCESS, payload: res.data})
        })
        .catch(err => dispatch({type: DELETE_TRANSACTION_FAIL, payload: setError(err)}));
}