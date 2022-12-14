import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

// ***********************For development***********************
// const developmentStore = createStore(

//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// ***********************For production***********************
const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const productionStore = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
    )
);

const store = productionStore

export default store;