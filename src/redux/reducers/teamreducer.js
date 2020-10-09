import {GET_ALL_TEAMS_BASIC_DETAILS ,
      ADD_NEW_TEAM , 
      GET_TEAM_CORE_DETAILS  ,
      TEAM_NAMES_FOR_NEW_MEMBER , 
      RESET_TEAM_STORE_DETAILS,
    } from "../actions/teamActions"

const initialState = {
    teams : [],
    existingTeams : []
};

export const teamReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_TEAMS_BASIC_DETAILS:
        return { ...state, teams: action.payload };
      case RESET_TEAM_STORE_DETAILS:
          return { ...state,teams : [],existingTeams : [] };
      case ADD_NEW_TEAM:
        return { ...state, teams: [...state.teams,action.payload] };
      case GET_TEAM_CORE_DETAILS:
          return { 
                ...state, 
                teams: state.teams.map((team)=>{
                  if(team._id == action.payload.id){
                    return{...team,coredetails:action.payload.data}
                  }else{
                    return{...team}
                  }
                }) 
              };
      case TEAM_NAMES_FOR_NEW_MEMBER:
          return { 
            ...state, 
            teams: state.teams,
            existingTeams : action.payload
           };        
      default:
        return state;
    }
};