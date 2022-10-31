import { 

    GET_RENTS_REQUEST,
    GET_RENTS_SUCCESS,
    GET_RENTS_FAIL,
    GET_RENTS_RESET,

    CREATE_RENT_REQUEST,
    CREATE_RENT_SUCCESS,
    CREATE_RENT_FAIL,
    CREATE_RENT_RESET,

    UPDATE_RENT_REQUEST,
    UPDATE_RENT_SUCCESS,
    UPDATE_RENT_FAIL,
    UPDATE_RENT_RESET,
    
} from "../constants/rentConstants";

const initialState = {
    rents: [],

    // GET rent
    errorGetRents: "",
    successGetRents: false,
    loadingGetRents: false,

    // Create rent
    errorCreateRent: "",
    successCreateRent: false,
    loadingCreateRent: false,
    idCreateRent: "",
    ProductId: "",

    // update rent
    errorUpdateRent: "",
    successUpdateRent: false,
    loadingUpdateRent: false,
    idUpdateRent: "",

}

const rentReducers =  (state = initialState, action) => {
  switch (action.type) {

    case GET_RENTS_REQUEST:
        return {
            ...state,
            loadingGetRents:  true,
            errorGetRents: "",
        }
    case GET_RENTS_SUCCESS:
        return {
            ...state,
            loadingGetRents:  false,
            successGetRents: true,
            rents: action.payload.rents,    
        }
    case GET_RENTS_FAIL:
        return {
            ...state,
            loadingGetRents:  false,
            errorGetRents: action.payload,
        }
    case GET_RENTS_RESET:
        return {
            ...state,
            errorGetRents: "",
            successGetRents: false,
            loadingGetRents: false,
        }
    
    case CREATE_RENT_REQUEST:
        return {
            ...state,
            loadingCreateRent:  true,
            errorCreateRent: "",
        }
    case CREATE_RENT_SUCCESS:
        return {
            ...state,
            loadingCreateRent:  false,
            successCreateRent: true,
            idCreateRent: action.payload.id,
            ProductId: action.payload.ProductId,    
        }
    case CREATE_RENT_FAIL:
        return {
            ...state,
            loadingCreateRent:  false,
            errorCreateRent: action.payload,
        }
    case CREATE_RENT_RESET:
        return {
            ...state,
            errorCreateRent: "",
            successCreateRent: false,
            loadingCreateRent: false,
            idCreateRent: "",
            ProductId: "",
        }

    case UPDATE_RENT_REQUEST:
        return {
            ...state,
            loadingUpdateRent:  true,
            errorUpdateRent: "",
        }
    case UPDATE_RENT_SUCCESS:
        return {
            ...state,
            loadingUpdateRent:  false,
            successUpdateRent: true,
            idUpdateRent: action.payload.id,    
        }
    case UPDATE_RENT_FAIL:
        return {
            ...state,
            loadingUpdateRent:  false,
            errorUpdateRent: action.payload,
        }
    case UPDATE_RENT_RESET:
        return {
            ...state,
            errorUpdateRent: "",
            successUpdateRent: false,
            loadingUpdateRent: false,
            idUpdateRent: "",
        }
   
     
    default:
      return state;
  }
}

export default rentReducers