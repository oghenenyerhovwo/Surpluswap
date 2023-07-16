import { combineReducers } from "redux";
import userReducers from "./userReducers";
// import storyReducers from "./storyReducers";
import transactionReducers from "./transactionReducers";
// import commentReducers from "./commentReducers";
// import rentReducers from "./rentReducers";
// import uploadReducers from "./uploadReducers";
// import appHistoryReducers from "./appHistoryReducers";
import generalReducers from "./generalReducers";


export default combineReducers({
    userStore: userReducers,
    // storyStore: storyReducers,
    transactionStore: transactionReducers,
    // commentStore: commentReducers,
    // appHistoryStore: appHistoryReducers,
    generalStore: generalReducers,
});
