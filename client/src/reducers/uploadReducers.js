import { 
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    UPLOAD_IMAGE_RESET,


    
} from "../constants/uploadConstants";

const initialState = {

    // upload image
    errorUploadImage: "",
    successUploadImage: false,
    loadingUploadImage: false,
    fileName: "",
    url: "",
    idUploadImage: "",

}

const uploadReducers =  (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
        return {
            ...state,
            loadingUploadImage:  true,
            errorUploadImage: "",
            idUploadImage: action.payload.imageId,
        }
    case UPLOAD_IMAGE_SUCCESS:
        return {
            ...state,
            loadingUploadImage:  false,
            successUploadImage: true,
            fileName: action.payload.fileName,
            url: action.payload.url,
        }
    case UPLOAD_IMAGE_FAIL:
        return {
            ...state,
            loadingUploadImage:  false,
            errorUploadImage: action.payload,
        }
    case UPLOAD_IMAGE_RESET:
        return {
            ...state,
            errorUploadImage: "",
            successUploadImage: false,
            loadingUploadImage: false,
            fileName: "",
            url: "",
            idUploadImage: "",
        }
     
    default:
      return state;
  }
}

export default uploadReducers