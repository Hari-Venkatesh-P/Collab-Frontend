import * as redux from "redux";
import { combineReducers } from "redux";
import {teamReducer} from "./reducers/teamreducer";

const rootReducer = combineReducers({
  teamReducer: teamReducer,
});


const store = redux.createStore(rootReducer);

export default store;