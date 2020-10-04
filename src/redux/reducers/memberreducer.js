import {GET_ALL_MEMBERS_BASIC_DETAILS , ADD_NEW_MEMBER , GET_MEMBER_CORE_DETAILS} from "../actionstrings"

const initialState = {
    members : []
};

export const memberReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_MEMBERS_BASIC_DETAILS:
        return { ...state, members: action.payload };
      case ADD_NEW_MEMBER:
        return { ...state, teams: [...state.teams,action.payload] };
    //   case GET_TEAM_CORE_DETAILS:
    //       return { 
    //             ...state, 
    //             teams: state.teams.map((team)=>{
    //               if(team._id == action.payload.id){
    //                 return{...team,coredetails:action.payload.data}
    //               }else{
    //                 return{...team}
    //               }
    //             }) 
    //           };
      default:
        return state;
    }
};