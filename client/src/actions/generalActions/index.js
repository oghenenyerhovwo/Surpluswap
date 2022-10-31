import { 
  CHANGE_LIGHT_MODE,
} from "../../constants/generalConstants.js";

export const changeLightMode = () => (dispatch, getState) =>  { 
  const lightMode= getState().generalStore.lightMode  
  dispatch({type: CHANGE_LIGHT_MODE})
  localStorage.setItem("impex_light_mode", JSON.stringify({lightMode: !lightMode}))
}