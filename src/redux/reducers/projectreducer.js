import {GET_PROJECT_BASIC_DETAILS ,
   ADD_NEW_PROJECT ,
   GET_PROJECT_CORE_DETAILS ,
   EDIT_PROJECT ,
   UPDATE_PROJECT_STATUS, 
   ASSIGN_PROJECTS , 
   ASSIGN_PROJECTS_TO_MEMBER,
    GET_TEAM_PROJECTS,
    REMOVE_MEMBER_FROM_PROJECT,
     GET_MEMBER_PROJECTS} from "../actions/ProjectActions";

const initialState = {
    projects : [],
    assign_project : {
      memberId : "",
      teamId : ""
    },
    teamProjects : [],
    memberProjects : [] 
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
    case GET_TEAM_PROJECTS : {
      return {
        ...state,
        teamProjects : action.payload
      }
    }
    case GET_MEMBER_PROJECTS : {
      return {
        ...state,
        memberProjects : action.payload
      }
    }
    case UPDATE_PROJECT_STATUS :{
      return{
        ...state,
        projects : state.projects.map((project)=>{
          if(project._id === action.payload.data._id){
              return{
                ...project,
                status : action.payload.data.status,
                coredetails :{
                  ...project.coredetails,
                  comments : [...action.payload.data.comments]
                }
              }
          }else{
            return{
              ...project,
            }
          }
        })
      }
    }case REMOVE_MEMBER_FROM_PROJECT :{
      return{
        ...state,
        projects : state.projects.map((project)=>{
          if(project._id === action.payload.id){
              return{
                ...project,
                coredetails :{
                  ...project.coredetails,
                  member_assigned : project.coredetails.member_assigned.filter((member)=>member._id !=action.payload.memberid )
                }
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