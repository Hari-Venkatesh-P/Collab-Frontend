import { combineReducers , createStore} from "redux";
import {teamReducer} from "./reducers/teamreducer";
import {memberReducer} from "./reducers/memberreducer";


const rootReducer = combineReducers({
  teamReducer: teamReducer,
  memberReducer : memberReducer
});

const store = createStore(rootReducer);

export default store;