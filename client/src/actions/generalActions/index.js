import { 
  CHANGE_LIGHT_MODE,
  LOADING_DATA,
} from "../../constants/generalConstants.js";

export const changeLightMode = () => (dispatch, getState) =>  { 
  const lightMode= getState().generalStore.lightMode  
  dispatch({type: CHANGE_LIGHT_MODE})
  localStorage.setItem("impex_light_mode", JSON.stringify({lightMode: !lightMode}))
}

export const loadData = (dispatch, data) => {
  dispatch({type: LOADING_DATA, payload: data})
}
