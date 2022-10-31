import { 
  CHANGE_LIGHT_MODE,
} from "../../constants/generalConstants.js";

export const changeLightMode = () => (dispatch) =>  { 
  dispatch({type: CHANGE_LIGHT_MODE})
}