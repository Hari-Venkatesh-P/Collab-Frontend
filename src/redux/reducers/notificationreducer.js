import {CREATE_NOTICATION} from "../actions/notificationActions"

const initialState = {
    notifications : [],
};

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_NOTICATION:{
          console.log("Creating")
        return { ...state, notifications: [action.payload,...state.notifications] };
      }
      default:
        return state;
    }
};