import { 
  CHANGE_DARK_MODE,
  LOADING_DATA,
  LIST_BOX__REACT_RAINBOW_SWITCH,
} from "../../constants/generalConstants.js";

export const changeDarkMode = () => (dispatch, getState) =>  { 
  const darkMode= getState().generalStore.darkMode
  dispatch({type: CHANGE_DARK_MODE})
  localStorage.setItem("surplusswap_dark_mode", JSON.stringify({darkMode: !darkMode}))
}

export const loadData = (dispatch, data) => {
  dispatch({type: LOADING_DATA, payload: data})
}

export const switchListBoxReactRainbow = (display) => (dispatch) =>  { 
  dispatch({type: LIST_BOX__REACT_RAINBOW_SWITCH, payload: display})
}

