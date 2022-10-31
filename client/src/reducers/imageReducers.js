import { 
    POST_IMAGE_REQUEST,
    POST_IMAGE_SUCCESS,
    POST_IMAGE_FAIL,
    POST_IMAGE_RESET,

} from "../constants/imageConstants";

const initialState = {

    // post image
    errorPostImage: "",
    successPostImage: false,
    loadingPostImage: false,
    image: {},

}

const imageReducers =  (state = initialState, action) => {
  switch (action.type) {
    case POST_IMAGE_REQUEST:
        return {
            ...state,
            loadingPostImage:  true,
            errorPostImage: "",
        }
    case POST_IMAGE_SUCCESS:
        return {
            ...state,
            loadingPostImage:  false,
            successPostImage: true,
            image: action.payload.image,
        }
    case POST_IMAGE_FAIL:
        return {
            ...state,
            loadingPostImage:  false,
            errorPostImage: action.payload,
        }
    case POST_IMAGE_RESET:
        return {
            ...state,
            errorPostImage: "",
            successPostImage: false,
            loadingPostImage: false,
            image: {},
        }
     
    default:
      return state;
  }
}

export default imageReducers