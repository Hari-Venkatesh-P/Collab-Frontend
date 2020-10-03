import {GET_ALL_TEAMS_BASIC_DETAILS , ADD_NEW_TEAM , GET_TEAM_CORE_DETAILS} from "../actionstrings"

const initialState = {
    teams : []
};

export const teamReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_TEAMS_BASIC_DETAILS:
        return { ...state, teams: action.payload };
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
      default:
        return state;
    }
};