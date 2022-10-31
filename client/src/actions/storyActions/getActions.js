import axios from "axios";
import { setError, backend_url } from "../../utils"
import { 
    GET_STORIES_REQUEST,
    GET_STORIES_SUCCESS,
    GET_STORIES_FAIL,

    GET_STORIES_WITH_LIMIT_REQUEST,
    GET_STORIES_WITH_LIMIT_SUCCESS,
    GET_STORIES_WITH_LIMIT_FAIL,

    GET_STORIES_MINE_REQUEST,
    GET_STORIES_MINE_SUCCESS,
    GET_STORIES_MINE_FAIL,

    GET_STORY_REQUEST,
    GET_STORY_SUCCESS,
    GET_STORY_FAIL,
} from "../../constants/storyConstants.js";

export const getStories = () => (dispatch) =>  { 
  dispatch({type: GET_STORIES_REQUEST})

    axios
      .get(
        `${backend_url}/stories/route/`,
      )
      .then(res => {
        dispatch({type: GET_STORIES_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: GET_STORIES_FAIL, payload: setError(err)}));
}

export const getStoriesWithLimit = (limit) => (dispatch) =>  { 
  dispatch({type: GET_STORIES_WITH_LIMIT_REQUEST, payload: limit})

    axios
      .get(
        `${backend_url}/stories/route/limit/${limit}`,
      )
      .then(res => {
        dispatch({type: GET_STORIES_WITH_LIMIT_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: GET_STORIES_WITH_LIMIT_FAIL, payload: setError(err)}));
}

export const getStoriesMine = (id) => (dispatch) =>  { 
  dispatch({type: GET_STORIES_MINE_REQUEST, payload: id})

    axios
      .get(
        `${backend_url}/stories/route/mine/${id}`
      )
      .then(res => {
        dispatch({type: GET_STORIES_MINE_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({type: GET_STORIES_MINE_FAIL, payload: setError(err)}));
}


export const getStory = (id) => (dispatch) =>  { 
    dispatch({type: GET_STORY_REQUEST, payload:  id})
  
      axios
        .get(
          `${backend_url}/stories/route/${id}/`,
        )
        .then(res => {
          dispatch({type: GET_STORY_SUCCESS, payload: res.data})
        })
        .catch(err => dispatch({type: GET_STORY_FAIL, payload: setError(err)}));
}