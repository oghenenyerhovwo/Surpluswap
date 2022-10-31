import axios from "axios";
import { setError, backend_url, setHeader } from "../../utils"
import { 
    CREATE_STORY_REQUEST,
    CREATE_STORY_SUCCESS,
    CREATE_STORY_FAIL,

    UPDATE_STORY_REQUEST,
    UPDATE_STORY_SUCCESS,
    UPDATE_STORY_FAIL,

    DELETE_STORY_REQUEST,
    DELETE_STORY_SUCCESS,
    DELETE_STORY_FAIL,
} from "../../constants/storyConstants.js";

export const createStory = (form) => (dispatch, getState) =>  { 
  dispatch({type: CREATE_STORY_REQUEST, payload:  form})
  const token= getState().userStore.token  

    axios
      .post(
        `${backend_url}/stories/route/`,
        form,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: CREATE_STORY_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: CREATE_STORY_FAIL, payload: setError(err)}));
  }


export const updateStory = (form, id) => (dispatch, getState) =>  { 
  dispatch({type: UPDATE_STORY_REQUEST, payload:  {form, id}})
  const token= getState().userStore.token  

    axios
      .put(
        `${backend_url}/stories/route/${id}`,
        form,
        setHeader(token)
      )
      .then(res => {
        dispatch({type: UPDATE_STORY_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: UPDATE_STORY_FAIL, payload: setError(err)}));
  }

export const addViewToStory = (id) => (dispatch, getState) =>  { 
  dispatch({type: UPDATE_STORY_REQUEST, payload:  id})
  const token= getState().userStore.token  

    axios
      .put(
        `${backend_url}/stories/route/view/${id}`,
        {},
        setHeader(token)
      )
      .then(res => {
        dispatch({type: UPDATE_STORY_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: UPDATE_STORY_FAIL, payload: setError(err)}));
  }

export const deleteStory = (id) => (dispatch, getState) =>  { 
    dispatch({type: DELETE_STORY_REQUEST, payload:  id})
    const token= getState().userStore.token  
  
      axios
        .delete(
          `${backend_url}/stories/route/${id}`,
          setHeader(token)
        )
        .then(res => {
          dispatch({type: DELETE_STORY_SUCCESS, payload: res.data})
        })
        .catch(err => dispatch({type: DELETE_STORY_FAIL, payload: setError(err)}));
}