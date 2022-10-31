import axios from "axios";
import { setError, backend_url, setHeader } from "../../utils"

import {
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAIL,
    // LIST_COMMENT_REQUEST,
    // LIST_COMMENT_SUCCESS,
    // LIST_COMMENT_FAIL,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
} from "../../constants/commentConstants.js";

export const createComment=(form, storyId,) => (dispatch, getState) =>  {
    dispatch({type: CREATE_COMMENT_REQUEST, payload:  {storyId, form}})
    const token= getState().userStore.token  

    axios
      .post(
        `${backend_url}/comments/route/${storyId}`,
        form,
        setHeader(token)
      )
      .then(res => dispatch({type: CREATE_COMMENT_SUCCESS, payload: res.data}))
      .catch(err => dispatch({type: CREATE_COMMENT_FAIL, payload: setError(err)}));
}

// export const listComment=(storyId) => dispatch =>  {
//     dispatch({type: LIST_COMMENT_REQUEST, payload:  storyId})
//     axios
//       .get(`/api/campgrounds/${storyId}/comments`,)
//       .then(res => dispatch({type: LIST_COMMENT_SUCCESS, payload: res.data}))
//       .catch(err => dispatch({type: LIST_COMMENT_FAIL, payload: setError(err)}));
// }

export const deleteComment=(storyId, commentId) => (dispatch, getState) =>  {
  dispatch({type: DELETE_COMMENT_REQUEST, payload:  {storyId, commentId}})
  const token= getState().userStore.token  

  axios
    .delete(
      `${backend_url}/comments/route/${storyId}/${commentId}`,
      setHeader(token)
    )
    .then(res => dispatch({type: DELETE_COMMENT_SUCCESS, payload: commentId}))
    .catch(err => dispatch({type: DELETE_COMMENT_FAIL, payload: setError(err)}));
}