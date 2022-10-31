import axios from "axios";
import { setError,setHeader, backend_url } from "../../utils"
import { 
  POST_IMAGE_REQUEST,
  POST_IMAGE_SUCCESS,
  POST_IMAGE_FAIL,

} from "../../constants/imageConstants.js";

export const postImage = (image) => (dispatch, getState) =>  { 
  dispatch({type: POST_IMAGE_REQUEST, payload: image})
  const token= getState().userStore.token 

    axios
      .post(
        `${backend_url}/image/route/`,
        image,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: POST_IMAGE_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: POST_IMAGE_FAIL, payload: setError(err)}));
}