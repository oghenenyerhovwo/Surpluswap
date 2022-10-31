import { 
    REMOVE_APP_HISTORY,
    SET_APP_HISTORY,
} from "../constants/appHistoryConstants";

const initialState = {
    appHistory: []
}

const appHistoryReducers =  (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_HISTORY:
        return {
            ...initialState,
            appHistory: [...state.appHistory, action.payload]
        }

    case REMOVE_APP_HISTORY:
        return {
            ...initialState,
            appHistory: state.appHistory.filter(history => history !== action.payload)
        }
    
    default:
      return state;
  }
}

export default appHistoryReducers