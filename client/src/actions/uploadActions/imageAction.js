import axios from "axios";
import { setError,setHeader, backend_url } from "../../utils"
import { 

  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,

} from "../../constants/uploadConstants.js";

export const uploadImage = ({image, imageId}) => (dispatch, getState) =>  { 
  
  const bodyFormData = new FormData()
  bodyFormData.append("image", image)
  dispatch({type: UPLOAD_IMAGE_REQUEST, payload: {bodyFormData, imageId}})
  const token= getState().userStore.token 

    axios
      .post(
        `${backend_url}/upload/image/`,
        bodyFormData,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: UPLOAD_IMAGE_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: UPLOAD_IMAGE_FAIL, payload: setError(err)}));
}
