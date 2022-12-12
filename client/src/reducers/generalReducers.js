import { 
    CHANGE_LIGHT_MODE,
    LOADING_DATA,
    LOADING_RESET,
} from "../constants/generalConstants";

const initialState = {
    lightMode: localStorage.getItem("impex_light_mode") ? 
        (JSON.parse(localStorage.getItem("impex_light_mode")) &&  JSON.parse(localStorage.getItem("impex_light_mode")).lightMode) 
        : true,
    loadingData: {},
}

const generalReducers =  (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LIGHT_MODE:
        return {
            ...initialState,
            lightMode: !state.lightMode
        }

    case LOADING_DATA:
        return {
            ...initialState,
            loadingData: action.payload,
        }

    case LOADING_RESET:
        return {
            ...initialState,
            loadingData: {},
        }
    
    default:
      return state;
  }
}

export default generalReducers