import { 
  REMOVE_APP_HISTORY,
  SET_APP_HISTORY,
} from "../../constants/appHistoryConstants.js";

export const setHistory = (history) => (dispatch, getState) =>  { 
  const appHistory= getState().appHistoryStore.appHistory  

  if(history !== appHistory[appHistory.length - 1] ){
    dispatch({type: SET_APP_HISTORY, payload: history})
  }
}

export const removeHistory = (history) => (dispatch) =>  { 
  dispatch({type: REMOVE_APP_HISTORY, payload: history})
}

export const navigateHistory = (history, navigateFunc = () => {}) => dispatch => { 
  if (history !== "#" && history !== " ") {
    dispatch(setHistory(history))
  }
  navigateFunc()
}