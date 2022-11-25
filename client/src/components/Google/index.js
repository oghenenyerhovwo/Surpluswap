import { GoogleOAuthProvider, GoogleLogin  } from '@react-oauth/google';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FcGoogle} from "react-icons/fc"

import {
  GET_GOOGLE_DATA_REQUEST,
  GET_GOOGLE_DATA_SUCCESS,
  GET_GOOGLE_DATA_FAIL,
  GET_GOOGLE_DATA_RESET,
} from '../../constants/userConstants'

import { googleSignIn } from '../../actions/'

// css
import "./index.css"

const GoogleAuth = () => {
  const dispatch = useDispatch()

  const {
    loadingGoogleData,
  } =  useSelector(state => state.userStore)

  useEffect(() => {
    if(loadingGoogleData){
      setTimeout(() => {
        dispatch({type: GET_GOOGLE_DATA_FAIL, payload: "Timeout"})
      }, 60000);
    } else {
      clearTimeout()
    }

    return () => {
      clearTimeout()
    };
  }, [loadingGoogleData, dispatch])

  const handleRequest = () => {
    dispatch({type: GET_GOOGLE_DATA_REQUEST})
  }

  const handleSuccess = credentialResponse => {
    dispatch({type: GET_GOOGLE_DATA_SUCCESS})
    dispatch({type: GET_GOOGLE_DATA_RESET})
    dispatch(googleSignIn(credentialResponse.credential))
  }

  const handleFailure = error => {
    console.log(error);
    dispatch({type: GET_GOOGLE_DATA_FAIL, payload: error.details || "An error occurred when logging in via google"})
  }

  return (
    <div onClick={handleRequest} className="app_google_container grid">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleFailure}
        />
      </GoogleOAuthProvider>
      <div className="app_google">
          <FcGoogle />
          <span>Sign in with google</span>
      </div>
    </div>
  )
}

export default GoogleAuth




















// import { useEffect, useRef, useCallback } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// // functions
// import { googleSignIn } from '../../actions/'

// // constants
// import {
//   GET_GOOGLE_DATA_REQUEST,
//   GET_GOOGLE_DATA_SUCCESS,
//   GET_GOOGLE_DATA_FAIL,
//   GET_GOOGLE_DATA_RESET,
// } from '../../constants/userConstants'

// // css
// import "./index.css"

// const loadScript = (src) =>
//   new Promise((resolve, reject) => {
//     if (document.querySelector(`script[src="${src}"]`)) return resolve()
//     const script = document.createElement('script')
//     script.src = src
//     script.onload = () => resolve()
//     script.onerror = (err) => reject(err)
//     document.body.appendChild(script)
//   })

// const GoogleAuth = () => {

//   const googleButton = useRef(null);
//   const dispatch = useDispatch()

//   const handleCredentialResponse = useCallback((response) => {
//     dispatch({type: GET_GOOGLE_DATA_SUCCESS})
//     dispatch({type: GET_GOOGLE_DATA_RESET})
//     dispatch(googleSignIn(response.credential))
//   }, [dispatch])

//    // state
//    const {
//     loadingGoogleData,
//   } =  useSelector(state => state.userStore)

//   useEffect(() => {
//     if(loadingGoogleData){
//       setTimeout(() => {
//         dispatch({type: GET_GOOGLE_DATA_FAIL, payload: "Timeout"})
//       }, 60000);
//     } else {
//       clearTimeout()
//     }

//     return () => {
//       clearTimeout()
//     };
//   }, [loadingGoogleData, dispatch])

//   useEffect(() => {
//     const src = 'https://accounts.google.com/gsi/client'
//     const id = process.env.REACT_APP_GOOGLE_CLIENT_ID

//     loadScript(src)
//       .then(() => {
//         /*global google*/
//         google.accounts.id.initialize({
//           client_id: id,
//           callback: handleCredentialResponse,
//         })
//         google.accounts.id.renderButton(
//           googleButton.current, 
//           { theme: 'outline', size: 'large' } 
//         )
//       })
//       .catch(error => {
//         dispatch({type: GET_GOOGLE_DATA_FAIL, payload: error.details || "An error occurred when logging in via google"})
//       })

//     return () => {
//       const scriptTag = document.querySelector(`script[src="${src}"]`)
//       if (scriptTag) document.body.removeChild(scriptTag)
//     }
//   }, [dispatch, handleCredentialResponse])

//   const handleRequest = () => {
//     dispatch({type: GET_GOOGLE_DATA_REQUEST})
//   }

//   return (
//     <div onClick={handleRequest}>
//       <div className="app__google" ref={googleButton}></div>
//     </div>
//   )
// }
// export default GoogleAuth