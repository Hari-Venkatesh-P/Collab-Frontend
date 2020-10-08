import {GET_ALL_MEMBERS_BASIC_DETAILS , ADD_NEW_MEMBER , GET_MEMBER_CORE_DETAILS , DELETE_MEMBER , EDIT_MEMBER } from "../actionstrings"
import {GET_LOGGED_IN_MEMBER_DETAILS , EDIT_LOGGED_IN_MEMBER} from "../actions/memberActions"

const initialState = {
    members : [],
    loggedInMember : {}
};

export const memberReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_MEMBERS_BASIC_DETAILS:
        return { ...state, members: action.payload };
      case GET_LOGGED_IN_MEMBER_DETAILS : {
        return {...state, loggedInMember : action.payload}
      }
      case EDIT_LOGGED_IN_MEMBER : {
        return {
          ...state,
          loggedInMember : {
            ...state.loggedInMember,
            name : action.payload.name,
            address : action.payload.address,
            mobile : action.payload.mobile,
          }
        }
      }
      case ADD_NEW_MEMBER:
        return { ...state, members: [...state.members,action.payload] };
      case DELETE_MEMBER:{
        return { 
          ...state, 
          members: state.members.filter((member)=>member._id != action.payload.id)
        }
      }
      case GET_MEMBER_CORE_DETAILS : {
        return {
          ...state,
          members : state.members.map((member)=>{
            if(member._id == action.payload.id){
              return{
                ...member,
                coredetails: action.payload.data
              }
            }else{
                return{
                  ...member
                }
            }
          })
        }
      }
      case EDIT_MEMBER : {
        return {
          ...state,
          members : state.members.map((member=>{
            if(member._id == action.payload.id){
                return{
                  ...member,
                  name : action.payload.name,
                  address : action.payload.address,
                  mobile : action.payload.mobile
                }
            }else{
              return {
                ...member
              }
            }
          }))
        }
      }
      default:
        return state;
    }
};