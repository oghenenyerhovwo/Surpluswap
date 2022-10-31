import { 
    SIGN_USER_REQUEST,
    SIGN_USER_SUCCESS,
    SIGN_USER_FAIL,
    SIGN_USER_RESET,

    SIGNOUT_USER,
    SIGNOUT_USER_RESET,

    GOOGLE_SIGN_IN_REQUEST,
    GOOGLE_SIGN_IN_SUCCESS,
    GOOGLE_SIGN_IN_FAIL,
    GOOGLE_SIGN_IN_RESET,

    CONFIRM_EMAIL_REQUEST,
    CONFIRM_EMAIL_SUCCESS,
    CONFIRM_EMAIL_FAIL,
    CONFIRM_EMAIL_RESET,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_RESET,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_RESET,

    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,

    GET_USER_BY_ID_REQUEST,
    GET_USER_BY_ID_SUCCESS,
    GET_USER_BY_ID_FAIL,
    GET_USER_BY_ID_RESET,

    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAIL,
    GET_USERS_RESET,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    
} from "../constants/userConstants";

const initialState = {
    currentUser: "",
    token: localStorage.getItem("lmcp_user_token") ? JSON.parse(localStorage.getItem("lmcp_user_token")) : "",
    
    // sign out user
    successSignOut: false,

    // SignUser user
    errorSignUser: "",
    successSignUser: false,
    loadingSignUser: false,

    // Google sign in
    errorGoogleSignIn: "",
    successGoogleSignIn: false,
    loadingGoogleSignIn: false,


    // Confirm Email
    errorConfirmEmail: "",
    successConfirmEmail: false,
    loadingConfirmEmail: false,

    // Forgot password
    errorForgotPassword: "",
    successForgotPassword: false,
    loadingForgotPassword: false,

    // Reset password
    errorResetPassword: "",
    successResetPassword: false,
    loadingResetPassword: false,
    resetToken: "",

    // Get user with token
    errorGetUser: "",
    successGetUser: false,
    loadingGetUser: false,

    // Get user with id
    errorGetUserById: "",
    successGetUserById: false,
    loadingGetUserById: false,
    userByID: {},

    // Get users
    errorGetUsers: "",
    successGetUsers: false,
    loadingGetUsers: false,
    users: [],

    // UPDATE user
    errorUpdateUser: "",
    successUpdateUser: false,
    loadingUpdateUser: false,
    idUpdateUser: "",

    // delete user
    errorDeleteUser: "",
    successDeleteUser: false,
    loadingDeleteUser: false,

}

const userReducers =  (state = initialState, action) => {
  switch (action.type) {
    case SIGN_USER_REQUEST:
        return {
            ...state,
            loadingSignUser:  true,
            errorSignUser: "",
        }
    case SIGN_USER_SUCCESS:
        return {
            ...state,
            loadingSignUser:  false,
            successSignUser: true,
            currentUser: action.payload.user,
            token: action.payload.token,
        }
    case SIGN_USER_FAIL:
        return {
            ...state,
            loadingSignUser:  false,
            errorSignUser: action.payload,
        }
    case SIGN_USER_RESET:
        return {
            ...state,
            errorSignUser: "",
            successSignUser: false,
            loadingSignUser: false,
        }

    case CONFIRM_EMAIL_REQUEST:
        return {
            ...state,
            loadingConfirmEmail:  true,
            errorConfirmEmail: "",
        }
    case CONFIRM_EMAIL_SUCCESS:
        return {
            ...state,
            loadingConfirmEmail:  false,
            successConfirmEmail: true,
            currentUser: action.payload.user,
            token: action.payload.token,
            resetToken: action.payload.resetToken,
        }
    case CONFIRM_EMAIL_FAIL:
        return {
            ...state,
            loadingConfirmEmail:  false,
            errorConfirmEmail: action.payload,
        }
    case CONFIRM_EMAIL_RESET:
        return {
            ...state,
            errorConfirmEmail: "",
            successConfirmEmail: false,
            loadingConfirmEmail: false,
        }
    case SIGNOUT_USER:
            return {
            ...initialState, 
            successSignOut: true, 
            currentUser: {}, 
            token: "",
            userByID: state.userByID,
        };

    case SIGNOUT_USER_RESET:
            return {...initialState, successSignOut: false, currentUser: {}, token: "", userByID: state.userByID,} ;
            

    case GOOGLE_SIGN_IN_REQUEST:
        return {
            ...state,
            loadingGoogleSignIn:  true,
            errorGoogleSignIn: "",
        }
    case GOOGLE_SIGN_IN_SUCCESS:
        return {
            ...state,
            loadingGoogleSignIn:  false,
            successGoogleSignIn: true,
        }
    case GOOGLE_SIGN_IN_FAIL:
        return {
            ...state,
            loadingGoogleSignIn:  false,
            errorGoogleSignIn: action.payload,
        }
    case GOOGLE_SIGN_IN_RESET:
        return {
            ...state,
            errorGoogleSignIn: "",
            successGoogleSignIn: false,
            loadingGoogleSignIn: false,
        }


    case FORGOT_PASSWORD_REQUEST:
        return {
            ...state,
            loadingForgotPassword:  true,
            errorForgotPassword: "",
        }
    case FORGOT_PASSWORD_SUCCESS:
        return {
            ...state,
            loadingForgotPassword:  false,
            successForgotPassword: true,
        }
    case FORGOT_PASSWORD_FAIL:
        return {
            ...state,
            loadingForgotPassword:  false,
            errorForgotPassword: action.payload,
        }
    case FORGOT_PASSWORD_RESET:
        return {
            ...state,
            errorForgotPassword: "",
            successForgotPassword: false,
            loadingForgotPassword: false,
        }

    case RESET_PASSWORD_REQUEST:
        return {
            ...state,
            loadingResetPassword:  true,
            errorResetPassword: "",
        }
    case RESET_PASSWORD_SUCCESS:
        return {
            ...state,
            loadingResetPassword:  false,
            successResetPassword: true,
        }
    case RESET_PASSWORD_FAIL:
        return {
            ...state,
            loadingResetPassword:  false,
            errorResetPassword: action.payload,
        }
    case RESET_PASSWORD_RESET:
        return {
            ...state,
            errorResetPassword: "",
            successResetPassword: false,
            loadingResetPassword: false,
            resetToken: "",
        }

    case GET_USER_REQUEST:
        return {
            ...state,
            loadingGetUser:  true,
            errorGetUser: "",
        }
    case GET_USER_SUCCESS:
        return {
            ...state,
            loadingGetUser:  false,
            successGetUser: true,
            currentUser: action.payload.user,
        }
    case GET_USER_FAIL:
        return {
            ...state,
            loadingGetUser:  false,
            errorGetUser: action.payload,
            token: "",
            currentUser: {},
        }

    case GET_USER_BY_ID_REQUEST:
        return {
            ...state,
            loadingGetUserById:  true,
            errorGetUserById: "",
        }
    case GET_USER_BY_ID_SUCCESS:
        return {
            ...state,
            loadingGetUserById:  false,
            successGetUserById: true,
            userByID: action.payload.user,
        }
    case GET_USER_BY_ID_FAIL:
        return {
            ...state,
            loadingGetUserById:  false,
            errorGetUserById: action.payload,
        }

     case GET_USER_BY_ID_RESET:
        return {
            ...state,
            errorGetUserById: "",
            successGetUserById: false,
            loadingGetUserById: false,
        }

    case GET_USERS_REQUEST:
        return {
            ...state,
            loadingGetUsers:  true,
            errorGetUsers: "",
        }
    case GET_USERS_SUCCESS:
        return {
            ...state,
            loadingGetUsers:  false,
            successGetUsers: true,
            users: action.payload.users,
        }
    case GET_USERS_FAIL:
        return {
            ...state,
            loadingGetUsers:  false,
            errorGetUsers: action.payload,
        }

     case GET_USERS_RESET:
        return {
            ...state,
            errorGetUsers: "",
            successGetUsers: false,
            loadingGetUsers: false,
        }

    case UPDATE_USER_REQUEST:
        return {
            ...state,
            loadingUpdateUser:  true,
            errorUpdateUser: "",
        }
    case UPDATE_USER_SUCCESS:
        return {
            ...state,
            loadingUpdateUser:  false,
            successUpdateUser: true,
            idUpdateUser: action.payload.id,
        }
    case UPDATE_USER_FAIL:
        return {
            ...state,
            loadingUpdateUser:  false,
            errorUpdateUser: action.payload,
        }

     case UPDATE_USER_RESET:
        return {
            ...state,
            errorUpdateUser: "",
            successUpdateUser: false,
            loadingUpdateUser: false,
            idUpdateUser: "",
        }

     case DELETE_USER_REQUEST:
        return {
            ...state,
            loadingDeleteUser:  true,
            errorDeleteUser: "",
        }
    case DELETE_USER_SUCCESS:
        return {
            ...state,
            loadingDeleteUser:  false,
            successDeleteUser: true,
        }
    case DELETE_USER_FAIL:
        return {
            ...state,
            loadingDeleteUser:  false,
            errorDeleteUser: action.payload,
        }

     case DELETE_USER_RESET:
        return {
            ...state,
            errorDeleteUser: "",
            successDeleteUser: false,
            loadingDeleteUser: false,
        }
     
    default:
      return state;
  }
}

export default userReducers