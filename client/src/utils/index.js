import { homeArticles, activitiesTab,activitiesContent, homeFaq, aims } from "./javascriptObjects"
import { onChangeError, onSubmitError } from "./formHandling"
import Category from "./productCategory"
import { 
  backend_url,
  frontend_url,
  setError,
  setHeader,
} from "./apiActions"
import {
  stateApi,
} from "./apis"
import firebaseStorage from "./firebase"
import {
  setTagArray,
  truncate,
  objectToArray,
} from "./javascriptFunctions"
import {
  isAdmin,
  isSuperAdmin,
  isAuthor,
} from "./auth"



export {
    onChangeError,
    onSubmitError,
    Category,
    frontend_url,
    backend_url,
    setError,
    setHeader,
    stateApi,
    firebaseStorage,
    homeArticles,
    activitiesTab,
    homeFaq,
    activitiesContent,
    truncate,
    setTagArray,
    aims,
    objectToArray,
    isAdmin,
    isSuperAdmin,
    isAuthor,
}