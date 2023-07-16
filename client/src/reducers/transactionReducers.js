import { 
    GET_TRANSACTIONS_REQUEST,
    GET_TRANSACTIONS_SUCCESS,
    GET_TRANSACTIONS_FAIL,
    GET_TRANSACTIONS_RESET,

    GET_TRANSACTIONS_MINE_REQUEST,
    GET_TRANSACTIONS_MINE_SUCCESS,
    GET_TRANSACTIONS_MINE_FAIL,
    GET_TRANSACTIONS_MINE_RESET,

    CREATE_TRANSACTION_REQUEST,
    CREATE_TRANSACTION_SUCCESS,
    CREATE_TRANSACTION_FAIL,
    CREATE_TRANSACTION_RESET,

    GET_TRANSACTION_REQUEST,
    GET_TRANSACTION_SUCCESS,
    GET_TRANSACTION_FAIL,
    GET_TRANSACTION_RESET,

    UPDATE_TRANSACTION_REQUEST,
    UPDATE_TRANSACTION_SUCCESS,
    UPDATE_TRANSACTION_FAIL,
    UPDATE_TRANSACTION_RESET,

    DELETE_TRANSACTION_REQUEST,
    DELETE_TRANSACTION_SUCCESS,
    DELETE_TRANSACTION_FAIL,
    DELETE_TRANSACTION_RESET,
    
} from "../constants/transactionConstants";


const initialState = {

    // get Transactions
    errorGetTransactions: "",
    successGetTransactions: false,
    loadingGetTransactions: false,
    transactions: [],

     // get Transactions
     errorGetTransactionsMine: "",
     successGetTransactionsMine: false,
     loadingGetTransactionsMine: false,
     transactionsMine: [],

    // Create Transaction
    errorCreateTransaction: "",
    successCreateTransaction: false,
    loadingCreateTransaction: false,
    idCreateTransaction: "",

    // get Transaction
    errorGetTransaction: "",
    successGetTransaction: false,
    loadingGetTransaction: false,
    transaction: {},

    // update Transaction
    errorUpdateTransaction: "",
    successUpdateTransaction: false,
    loadingUpdateTransaction: false,
    idUpdateTransaction: "",

     // delete Transaction
     errorDeleteTransaction: "",
     successDeleteTransaction: false,
     loadingDeleteTransaction: false,
     idDeleteTransaction: "",

}

const transactionReducers =  (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS_REQUEST:
        return {
            ...state,
            loadingGetTransactions:  true,
            errorGetTransactions: "",
        }
    case GET_TRANSACTIONS_SUCCESS:
        return {
            ...state,
            loadingGetTransactions:  false,
            successGetTransactions: true,
            transactions: action.payload.transactions,
        }
    case GET_TRANSACTIONS_FAIL:
        return {
            ...state,
            loadingGetTransactions:  false,
            errorGetTransactions: action.payload,
        }
    case GET_TRANSACTIONS_RESET:
        return {
            ...state,
            errorGetTransactions: "",
            successGetTransactions: false,
            loadingGetTransactions: false,
        }

    case GET_TRANSACTIONS_MINE_REQUEST:
        return {
            ...state,
            loadingGetTransactionsMine:  true,
            errorGetTransactionsMine: "",
        }
    case GET_TRANSACTIONS_MINE_SUCCESS:
        return {
            ...state,
            loadingGetTransactionsMine:  false,
            successGetTransactionsMine: true,
            transactionsMine: action.payload.transactions,
        }
    case GET_TRANSACTIONS_MINE_FAIL:
        return {
            ...state,
            loadingGetTransactionsMine:  false,
            errorGetTransactionsMine: action.payload,
        }
    case GET_TRANSACTIONS_MINE_RESET:
        return {
            ...state,
            errorGetTransactionsMine: "",
            successGetTransactionsMine: false,
            loadingGetTransactionsMine: false,
        }

    case CREATE_TRANSACTION_REQUEST:
        return {
            ...state,
            loadingCreateTransaction:  true,
            errorCreateTransaction: "",
        }
    case CREATE_TRANSACTION_SUCCESS:
        return {
            ...state,
            loadingCreateTransaction:  false,
            successCreateTransaction: true,
            idCreateTransaction: action.payload.id,
        }
    case CREATE_TRANSACTION_FAIL:
        return {
            ...state,
            loadingCreateTransaction:  false,
            errorCreateTransaction: action.payload,
        }
    case CREATE_TRANSACTION_RESET:
        return {
            ...state,
            errorCreateTransaction: "",
            successCreateTransaction: false,
            loadingCreateTransaction: false,
            idCreateTransaction: "",
        }

    case GET_TRANSACTION_REQUEST:
        return {
            ...state,
            loadingGetTransaction:  true,
            errorGetTransaction: "",
        }
    case GET_TRANSACTION_SUCCESS:
        return {
            ...state,
            loadingGetTransaction:  false,
            successGetTransaction: true,
            transaction: action.payload.transaction,
        }
    case GET_TRANSACTION_FAIL:
        return {
            ...state,
            loadingGetTransaction:  false,
            errorGetTransaction: action.payload,
        }
    case GET_TRANSACTION_RESET:
        return {
            ...state,
            errorGetTransaction: "",
            successGetTransaction: false,
            loadingGetTransaction: false,
        }

    case UPDATE_TRANSACTION_REQUEST:
        return {
            ...state,
            loadingUpdateTransaction:  true,
            errorUpdateTransaction: "",
        }
    case UPDATE_TRANSACTION_SUCCESS:
        return {
            ...state,
            loadingUpdateTransaction:  false,
            successUpdateTransaction: true,
            idUpdateTransaction: action.payload.id,
        }
    case UPDATE_TRANSACTION_FAIL:
        return {
            ...state,
            loadingUpdateTransaction:  false,
            errorUpdateTransaction: action.payload,
        }
    case UPDATE_TRANSACTION_RESET:
        return {
            ...state,
            errorUpdateTransaction: "",
            successUpdateTransaction: false,
            loadingUpdateTransaction: false,
            idUpdateTransaction: "",
        }

    case DELETE_TRANSACTION_REQUEST:
        return {
            ...state,
            loadingDeleteTransaction:  true,
            errorDeleteTransaction: "",
        }
    case DELETE_TRANSACTION_SUCCESS:
        return {
            ...state,
            loadingDeleteTransaction:  false,
            successDeleteTransaction: true,
            idDeleteTransaction: action.payload.id,
        }
    case DELETE_TRANSACTION_FAIL:
        return {
            ...state,
            loadingDeleteTransaction:  false,
            errorDeleteTransaction: action.payload,
        }
    case DELETE_TRANSACTION_RESET:
        return {
            ...state,
            errorDeleteTransaction: "",
            successDeleteTransaction: false,
            loadingDeleteTransaction: false,
            idDeleteTransaction: "",
        }
     
    default:
      return state;
  }
}

export default transactionReducers