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

    GET_GOOGLE_DATA_REQUEST,
    GET_GOOGLE_DATA_SUCCESS,
    GET_GOOGLE_DATA_FAIL,
    GET_GOOGLE_DATA_RESET,

    CONFIRM_TOKEN_REQUEST,
    CONFIRM_TOKEN_SUCCESS,
    CONFIRM_TOKEN_FAIL,
    CONFIRM_TOKEN_RESET,

    SIGNIN_TOKEN_REQUEST,
    SIGNIN_TOKEN_SUCCESS,
    SIGNIN_TOKEN_FAIL,
    SIGNIN_TOKEN_RESET,

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

    RESEND_EMAIL_REQUEST,
    RESEND_EMAIL_SUCCESS,
    RESEND_EMAIL_FAIL,
    RESEND_EMAIL_RESET,
    
} from "../constants/userConstants";



const initialState = {
    currentUser: "",
    token: localStorage.getItem("surpluswap_user_token") ? JSON.parse(localStorage.getItem("surpluswap_user_token")) : "",
    completeTokenSignIn: false,

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

    // Get google Data
    errorGoogleData: "",
    successGoogleData: false,
    loadingGoogleData: false,
    googleData: {},


    // Confirm Email
    errorConfirmToken: "",
    successConfirmToken: false,
    loadingConfirmToken: false,

    // Sign in with token
    errorSignInToken: "",
    successSignInToken: false,
    loadingSignInToken: false,

    // Forgot password
    errorForgotPassword: "",
    successForgotPassword: false,
    loadingForgotPassword: false,

    // Reset password
    errorResetPassword: "",
    successResetPassword: false,
    loadingResetPassword: false,
    resetPasswordEmail: "",
    resetPasswordToken: "",

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

    // Resend email verification
    errorResendEmail: "",
    successResendEmail: false,
    loadingResendEmail: false,

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

    case CONFIRM_TOKEN_REQUEST:
        return {
            ...state,
            loadingConfirmToken:  true,
            errorConfirmToken: "",
        }
    case CONFIRM_TOKEN_SUCCESS:
        return {
            ...state,
            loadingConfirmToken:  false,
            successConfirmToken: true,
            resetPasswordEmail: action.payload.resetPasswordEmail || "",
            resetPasswordToken: action.payload.resetPasswordToken || "",
        }
    case CONFIRM_TOKEN_FAIL:
        return {
            ...state,
            loadingConfirmToken:  false,
            errorConfirmToken: action.payload,
        }
    case CONFIRM_TOKEN_RESET:
        return {
            ...state,
            errorConfirmToken: "",
            successConfirmToken: false,
            loadingConfirmToken: false,
        }

    case SIGNIN_TOKEN_REQUEST:
        return {
            ...state,
            loadingSignInToken:  true,
            errorSignInToken: "",
        }
    case SIGNIN_TOKEN_SUCCESS:
        return {
            ...state,
            loadingSignInToken:  false,
            successSignInToken: true,
            currentUser: action.payload.user,
            completeTokenSignIn: true,
        }
    case SIGNIN_TOKEN_FAIL:
        return {
            ...state,
            loadingSignInToken:  false,
            errorSignInToken: action.payload,
            token: "",
            currentUser: {},
            completeTokenSignIn:true,
        }
    case SIGNIN_TOKEN_RESET:
        return {
            ...state,
            errorSignInToken: "",
            successSignInToken: false,
            loadingSignInToken: false,
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

    case GET_GOOGLE_DATA_REQUEST:
        return {
            ...state,
            loadingGoogleData:  true,
            errorGoogleData: "",
        }
    case GET_GOOGLE_DATA_SUCCESS:
        return {
            ...state,
            loadingGoogleData:  false,
            successGoogleData: true,
            googleData: action.payload,
        }
    case GET_GOOGLE_DATA_FAIL:
        return {
            ...state,
            loadingGoogleData:  false,
            errorGoogleData: action.payload,
        }
    case GET_GOOGLE_DATA_RESET:
        return {
            ...state,
            errorGoogleData: "",
            successGoogleData: false,
            loadingGoogleData: false,
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
            resetPasswordEmail: "",
            resetPasswordToken: "",
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

    case RESEND_EMAIL_REQUEST:
        return {
            ...state,
            loadingResendEmail:  true,
            errorResendEmail: "",
        }

    case RESEND_EMAIL_SUCCESS:
        return {
            ...state,
            loadingResendEmail:  false,
            successResendEmail: action.payload,
        }

    case RESEND_EMAIL_FAIL:
        return {
            ...state,
            loadingResendEmail:  false,
            errorResendEmail: action.payload.isMessageSent,
        }

     case RESEND_EMAIL_RESET:
        return {
            ...state,
            errorResendEmail: "",
            successResendEmail: false,
            loadingResendEmail: false,
        }
     
    default:
      return state;
  }
}

export default userReducers