import { aboutSectionArray } from "./javascriptObjects"
import { onChangeError, onSubmitError } from "./formHandling"
import { 
  backend_url,
  frontend_url,
  setError,
  setHeader,
} from "./apiActions"
// import {
//   stateApi,
// } from "./apis"
import firebaseStorage from "./firebase"
import {
  setTagArray,
  truncate,
  objectToArray,
  reverseObject,
  objectToArrayWithKeys,
  capitalizeFirstLetter,
} from "./javascriptFunctions"
import {
  isAdmin,
  isSuperAdmin,
  isAuthor,
} from "./auth"
import { 
  scrollAnimations,
  pageAnimations,
  slideAnimations,
  rotateAnimations,
  pathAnimations,
} from "./animations"

export {
    onChangeError,
    onSubmitError,
    // Category,
    frontend_url,
    backend_url,
    setError,
    setHeader,
    // stateApi,
    firebaseStorage,
    truncate,
    setTagArray,
    objectToArray,
    isAdmin,
    isSuperAdmin,
    isAuthor,
    aboutSectionArray,
    reverseObject,
    objectToArrayWithKeys,
    capitalizeFirstLetter,

    scrollAnimations,
    pageAnimations,
    slideAnimations,
    rotateAnimations,
    pathAnimations,
}