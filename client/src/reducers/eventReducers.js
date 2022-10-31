import { 
    GET_EVENTS_REQUEST,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FAIL,
    GET_EVENTS_RESET,

    GET_EVENTS_WITH_LIMIT_REQUEST,
    GET_EVENTS_WITH_LIMIT_SUCCESS,
    GET_EVENTS_WITH_LIMIT_FAIL,
    GET_EVENTS_WITH_LIMIT_RESET,

    CREATE_EVENT_REQUEST,
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_FAIL,
    CREATE_EVENT_RESET,

    GET_EVENT_REQUEST,
    GET_EVENT_SUCCESS,
    GET_EVENT_FAIL,
    GET_EVENT_RESET,

    UPDATE_EVENT_REQUEST,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAIL,
    UPDATE_EVENT_RESET,

    DELETE_EVENT_REQUEST,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAIL,
    DELETE_EVENT_RESET,
    
} from "../constants/eventConstants";


const initialState = {

    // get events
    errorGetEvents: "",
    successGetEvents: false,
    loadingGetEvents: false,
    events: [],

     // get events
     errorGetEventsWithLimit: "",
     successGetEventsWithLimit: false,
     loadingGetEventsWithLimit: false,
     eventsWithLimit: [],

    // Create Event
    errorCreateEvent: "",
    successCreateEvent: false,
    loadingCreateEvent: false,
    idCreateEvent: "",

    // get Event
    errorGetEvent: "",
    successGetEvent: false,
    loadingGetEvent: false,
    event: {},

    // update Event
    errorUpdateEvent: "",
    successUpdateEvent: false,
    loadingUpdateEvent: false,
    idUpdateEvent: "",

     // delete Event
     errorDeleteEvent: "",
     successDeleteEvent: false,
     loadingDeleteEvent: false,
     idDeleteEvent: "",

}

const EventReducers =  (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
        return {
            ...state,
            loadingGetEvents:  true,
            errorGetEvents: "",
        }
    case GET_EVENTS_SUCCESS:
        return {
            ...state,
            loadingGetEvents:  false,
            successGetEvents: true,
            events: action.payload.events,
        }
    case GET_EVENTS_FAIL:
        return {
            ...state,
            loadingGetEvents:  false,
            errorGetEvents: action.payload,
        }
    case GET_EVENTS_RESET:
        return {
            ...state,
            errorGetEvents: "",
            successGetEvents: false,
            loadingGetEvents: false,
        }

    case GET_EVENTS_WITH_LIMIT_REQUEST:
        return {
            ...state,
            loadingGetEventsWithLimit:  true,
            errorGetEventsWithLimit: "",
        }
    case GET_EVENTS_WITH_LIMIT_SUCCESS:
        return {
            ...state,
            loadingGetEventsWithLimit:  false,
            successGetEventsWithLimit: true,
            eventsWithLimit: action.payload.events,
        }
    case GET_EVENTS_WITH_LIMIT_FAIL:
        return {
            ...state,
            loadingGetEventsWithLimit:  false,
            errorGetEventsWithLimit: action.payload,
        }
    case GET_EVENTS_WITH_LIMIT_RESET:
        return {
            ...state,
            errorGetEventsWithLimit: "",
            successGetEventsWithLimit: false,
            loadingGetEventsWithLimit: false,
        }

    case CREATE_EVENT_REQUEST:
        return {
            ...state,
            loadingCreateEvent:  true,
            errorCreateEvent: "",
        }
    case CREATE_EVENT_SUCCESS:
        return {
            ...state,
            loadingCreateEvent:  false,
            successCreateEvent: true,
            idCreateEvent: action.payload.id,
        }
    case CREATE_EVENT_FAIL:
        return {
            ...state,
            loadingCreateEvent:  false,
            errorCreateEvent: action.payload,
        }
    case CREATE_EVENT_RESET:
        return {
            ...state,
            errorCreateEvent: "",
            successCreateEvent: false,
            loadingCreateEvent: false,
            idCreateEvent: "",
        }

    case GET_EVENT_REQUEST:
        return {
            ...state,
            loadingGetEvent:  true,
            errorGetEvent: "",
        }
    case GET_EVENT_SUCCESS:
        return {
            ...state,
            loadingGetEvent:  false,
            successGetEvent: true,
            event: action.payload.event,
        }
    case GET_EVENT_FAIL:
        return {
            ...state,
            loadingGetEvent:  false,
            errorGetEvent: action.payload,
        }
    case GET_EVENT_RESET:
        return {
            ...state,
            errorGetEvent: "",
            successGetEvent: false,
            loadingGetEvent: false,
        }

    case UPDATE_EVENT_REQUEST:
        return {
            ...state,
            loadingUpdateEvent:  true,
            errorUpdateEvent: "",
        }
    case UPDATE_EVENT_SUCCESS:
        return {
            ...state,
            loadingUpdateEvent:  false,
            successUpdateEvent: true,
            idUpdateEvent: action.payload.id,
        }
    case UPDATE_EVENT_FAIL:
        return {
            ...state,
            loadingUpdateEvent:  false,
            errorUpdateEvent: action.payload,
        }
    case UPDATE_EVENT_RESET:
        return {
            ...state,
            errorUpdateEvent: "",
            successUpdateEvent: false,
            loadingUpdateEvent: false,
            idUpdateEvent: "",
        }

    case DELETE_EVENT_REQUEST:
        return {
            ...state,
            loadingDeleteEvent:  true,
            errorDeleteEvent: "",
        }
    case DELETE_EVENT_SUCCESS:
        return {
            ...state,
            loadingDeleteEvent:  false,
            successDeleteEvent: true,
            idDeleteEvent: action.payload.id,
        }
    case DELETE_EVENT_FAIL:
        return {
            ...state,
            loadingDeleteEvent:  false,
            errorDeleteEvent: action.payload,
        }
    case DELETE_EVENT_RESET:
        return {
            ...state,
            errorDeleteEvent: "",
            successDeleteEvent: false,
            loadingDeleteEvent: false,
            idDeleteEvent: "",
        }
     
    default:
      return state;
  }
}

export default EventReducers