import {GET_PROJECT_BASIC_DETAILS , ADD_NEW_PROJECT , GET_PROJECT_CORE_DETAILS , EDIT_PROJECT , ASSIGN_PROJECTS , ASSIGN_PROJECTS_TO_MEMBER} from "../actions/ProjectActions";

const initialState = {
    projects : [],
    assign_project : {
      memberId : "",
      teamId : ""
    }
};

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PROJECT_BASIC_DETAILS:
        return { ...state, projects: action.payload };
      case ADD_NEW_PROJECT:
        return { ...state, projects: [action.payload,...state.projects] };
      case GET_PROJECT_CORE_DETAILS:
          return { 
            ...state, 
            projects: state.projects.map((project)=>{
              if(project._id === action.payload.id){
                  return{
                    ...project,
                    coredetails : action.payload.data
                  }
              }else{
                return{
                  ...project
                }
              }
            })
       }
       case  EDIT_PROJECT : {
         return {
           ...state,
           projects: state.projects.map((project)=>{
            if(project._id === action.payload.id){
                return{
                  ...project,
                  start_date : action.payload.start_date,
                  end_date : action.payload.end_date,
                  description : action.payload.description,
                }
            }else{
              return{
                ...project
              }
            }
          })
         }
      }
      case ASSIGN_PROJECTS : {
          return{
            ...state,
            assign_project : {
              memberId : action.payload.memberId,
              teamId : action.payload.teamId
            }
          }
      }
      case ASSIGN_PROJECTS_TO_MEMBER : {
        return{
          ...state,
          projects : state.projects.map((project)=>{
            if(project._id === action.payload.id){
                return{
                  ...project,
                  status : "ASSIGNED",
                  coredetails : action.payload.data,
                }
            }else{
              return{
                ...project
              }
            }
          })
        }
    }
      default:
        return state;
    }
};