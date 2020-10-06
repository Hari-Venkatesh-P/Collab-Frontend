import { gql} from '@apollo/client';

const GET_TEAMS_QUERY =  gql`
query{
    getTeams{
      _id,
      name,
    created_at,
    speciality,
    description,
    team_strength,
    project_count,
    }
}`;


const GET_TEAM_COREDETAILS_QUERY =  gql`
query getTeamById($id: ID!){
  getTeamById(id:$id){
    team_members{
      name,
      mobile
    	email
    },
    assigned_projects{
      title,
      description,
      status,
      start_date,
      end_date
    }
  }
}`;

const GET_TEAMS_NAMES_QUERY =  gql`
query{
  getTeamsAndMembers{
      name,
       _id,
       team_members{
         _id,
         name
       }
     }
}`;

export { GET_TEAMS_QUERY ,GET_TEAMS_NAMES_QUERY, GET_TEAM_COREDETAILS_QUERY}
