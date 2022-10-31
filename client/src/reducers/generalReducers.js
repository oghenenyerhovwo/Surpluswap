import { 
    CHANGE_LIGHT_MODE,
} from "../constants/generalConstants";

const initialState = {
    lightMode: localStorage.getItem("impex_light_mode") ? 
        (JSON.parse(localStorage.getItem("impex_light_mode")) &&  JSON.parse(localStorage.getItem("impex_light_mode")).lightMode) 
        : true,
}

const generalReducers =  (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LIGHT_MODE:
        return {
            ...initialState,
            lightMode: !state.lightMode
        }
    
    default:
      return state;
  }
}

export default generalReducers