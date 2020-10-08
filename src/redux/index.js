import { combineReducers , createStore} from "redux";
import {teamReducer} from "./reducers/teamreducer";
import {memberReducer} from "./reducers/memberreducer";
import {projectReducer} from "./reducers/projectreducer";
import {notificationReducer} from "./reducers/notificationreducer"

const rootReducer = combineReducers({
  teamReducer: teamReducer,
  memberReducer : memberReducer,
  projectReducer : projectReducer,
  notificationReducer:notificationReducer
});

const store = createStore(rootReducer);

export default store;