import { 
    CHANGE_DARK_MODE,
    LOADING_DATA,
    LOADING_RESET,
    LIST_BOX__REACT_RAINBOW_SWITCH,
} from "../constants/generalConstants";

const initialState = {
    darkMode: localStorage.getItem("surplusswap_dark_mode") ? 
        (JSON.parse(localStorage.getItem("surplusswap_dark_mode")) &&  JSON.parse(localStorage.getItem("surplusswap_dark_mode")).darkMode) 
        : false,
    loadingData: {},
    sellRate: 300,
    buyRate: 350,
    accountDetailsNaira: {
        bankName: "UBA",
        accountName: "Surplus Swap",
        accountNumber: "208093993939",
        accountType: "Current account"
    },
    listBoxDisplayReactRainbow: true,
}

const generalReducers =  (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DARK_MODE:
        return {
            ...state,
            darkMode: !state.darkMode
        }

    case LOADING_DATA:
        return {
            ...state,
            loadingData: action.payload,
        }

    case LOADING_RESET:
        return {
            ...state,
            loadingData: {},
        }

    case LIST_BOX__REACT_RAINBOW_SWITCH: 
        return {
            ...state,
            listBoxDisplayReactRainbow: action.payload,
        }
    
    default:
      return state;
  }
}

export default generalReducers