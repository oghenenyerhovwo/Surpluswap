import { 
    GET_STORIES_REQUEST,
    GET_STORIES_SUCCESS,
    GET_STORIES_FAIL,
    GET_STORIES_RESET,

    GET_STORIES_WITH_LIMIT_REQUEST,
    GET_STORIES_WITH_LIMIT_SUCCESS,
    GET_STORIES_WITH_LIMIT_FAIL,
    GET_STORIES_WITH_LIMIT_RESET,

    GET_STORIES_MINE_REQUEST,
    GET_STORIES_MINE_SUCCESS,
    GET_STORIES_MINE_FAIL,
    GET_STORIES_MINE_RESET,

    CREATE_STORY_REQUEST,
    CREATE_STORY_SUCCESS,
    CREATE_STORY_FAIL,
    CREATE_STORY_RESET,

    GET_STORY_REQUEST,
    GET_STORY_SUCCESS,
    GET_STORY_FAIL,
    GET_STORY_RESET,

    UPDATE_STORY_REQUEST,
    UPDATE_STORY_SUCCESS,
    UPDATE_STORY_FAIL,
    UPDATE_STORY_RESET,

    DELETE_STORY_REQUEST,
    DELETE_STORY_SUCCESS,
    DELETE_STORY_FAIL,
    DELETE_STORY_RESET,
    
} from "../constants/storyConstants";

const initialState = {

    // get Stories
    errorGetStories: "",
    successGetStories: false,
    loadingGetStories: false,
    stories: [],

     // get Stories
     errorGetStoriesWithLimit: "",
     successGetStoriesWithLimit: false,
     loadingGetStoriesWithLimit: false,
     storiesWithLimit: [],

    // get Stories
    errorGetStoriesMine: "",
    successGetStoriesMine: false,
    loadingGetStoriesMine: false,
    storiesMine: [],

    // Create Story
    errorCreateStory: "",
    successCreateStory: false,
    loadingCreateStory: false,
    idCreateStory: "",

    // get Story
    errorGetStory: "",
    successGetStory: false,
    loadingGetStory: false,
    story: {},

    // update Story
    errorUpdateStory: "",
    successUpdateStory: false,
    loadingUpdateStory: false,
    idUpdateStory: "",

     // delete Story
     errorDeleteStory: "",
     successDeleteStory: false,
     loadingDeleteStory: false,
     idDeleteStory: "",

}

const storyReducers =  (state = initialState, action) => {
  switch (action.type) {
    case GET_STORIES_REQUEST:
        return {
            ...state,
            loadingGetStories:  true,
            errorGetStories: "",
        }
    case GET_STORIES_SUCCESS:
        return {
            ...state,
            loadingGetStories:  false,
            successGetStories: true,
            stories: action.payload.stories,
        }
    case GET_STORIES_FAIL:
        return {
            ...state,
            loadingGetStories:  false,
            errorGetStories: action.payload,
        }
    case GET_STORIES_RESET:
        return {
            ...state,
            errorGetStories: "",
            successGetStories: false,
            loadingGetStories: false,
        }

    case GET_STORIES_WITH_LIMIT_REQUEST:
        return {
            ...state,
            loadingGetStoriesWithLimit:  true,
            errorGetStoriesWithLimit: "",
        }
    case GET_STORIES_WITH_LIMIT_SUCCESS:
        return {
            ...state,
            loadingGetStoriesWithLimit:  false,
            successGetStoriesWithLimit: true,
            storiesWithLimit: action.payload.stories,
        }
    case GET_STORIES_WITH_LIMIT_FAIL:
        return {
            ...state,
            loadingGetStoriesWithLimit:  false,
            errorGetStoriesWithLimit: action.payload,
        }
    case GET_STORIES_WITH_LIMIT_RESET:
        return {
            ...state,
            errorGetStoriesWithLimit: "",
            successGetStoriesWithLimit: false,
            loadingGetStoriesWithLimit: false,
        }

    case GET_STORIES_MINE_REQUEST:
        return {
            ...state,
            loadingGetStoriesMine:  true,
            errorGetStoriesMine: "",
        }
    case GET_STORIES_MINE_SUCCESS:
        return {
            ...state,
            loadingGetStoriesMine:  false,
            successGetStoriesMine: true,
            storiesMine: action.payload.stories,
        }
    case GET_STORIES_MINE_FAIL:
        return {
            ...state,
            loadingGetStoriesMine:  false,
            errorGetStoriesMine: action.payload,
        }
    case GET_STORIES_MINE_RESET:
        return {
            ...state,
            errorGetStoriesMine: "",
            successGetStoriesMine: false,
            loadingGetStoriesMine: false,
        }

    case CREATE_STORY_REQUEST:
        return {
            ...state,
            loadingCreateStory:  true,
            errorCreateStory: "",
        }
    case CREATE_STORY_SUCCESS:
        return {
            ...state,
            loadingCreateStory:  false,
            successCreateStory: true,
            idCreateStory: action.payload.id,
        }
    case CREATE_STORY_FAIL:
        return {
            ...state,
            loadingCreateStory:  false,
            errorCreateStory: action.payload,
        }
    case CREATE_STORY_RESET:
        return {
            ...state,
            errorCreateStory: "",
            successCreateStory: false,
            loadingCreateStory: false,
            idCreateStory: "",
        }

    case GET_STORY_REQUEST:
        return {
            ...state,
            loadingGetStory:  true,
            errorGetStory: "",
        }
    case GET_STORY_SUCCESS:
        return {
            ...state,
            loadingGetStory:  false,
            successGetStory: true,
            story: action.payload.story,
        }
    case GET_STORY_FAIL:
        return {
            ...state,
            loadingGetStory:  false,
            errorGetStory: action.payload,
        }
    case GET_STORY_RESET:
        return {
            ...state,
            errorGetStory: "",
            successGetStory: false,
            loadingGetStory: false,
        }

    case UPDATE_STORY_REQUEST:
        return {
            ...state,
            loadingUpdateStory:  true,
            errorUpdateStory: "",
        }
    case UPDATE_STORY_SUCCESS:
        return {
            ...state,
            loadingUpdateStory:  false,
            successUpdateStory: true,
            idUpdateStory: action.payload.id,
        }
    case UPDATE_STORY_FAIL:
        return {
            ...state,
            loadingUpdateStory:  false,
            errorUpdateStory: action.payload,
        }
    case UPDATE_STORY_RESET:
        return {
            ...state,
            errorUpdateStory: "",
            successUpdateStory: false,
            loadingUpdateStory: false,
            idUpdateStory: "",
        }

    case DELETE_STORY_REQUEST:
        return {
            ...state,
            loadingDeleteStory:  true,
            errorDeleteStory: "",
        }
    case DELETE_STORY_SUCCESS:
        return {
            ...state,
            loadingDeleteStory:  false,
            successDeleteStory: true,
            idDeleteStory: action.payload.id,
        }
    case DELETE_STORY_FAIL:
        return {
            ...state,
            loadingDeleteStory:  false,
            errorDeleteStory: action.payload,
        }
    case DELETE_STORY_RESET:
        return {
            ...state,
            errorDeleteStory: "",
            successDeleteStory: false,
            loadingDeleteStory: false,
            idDeleteStory: "",
        }
     
    default:
      return state;
  }
}

export default storyReducers