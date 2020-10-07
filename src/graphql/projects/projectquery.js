import { gql} from '@apollo/client';

const GET_PROJECTS_QUERY =  gql`
query getProjects($id:ID){
    getProjects(id:$id){
        _id,
        title
        description,
        start_date,
        end_date,
        status,
        created_at,
    }
}`;


const GET_PROJECT_CORE_DETAILS_QUERY =  gql`
query getProjectById($id:ID!){
    getProjectById(id:$id){
        team_assigned{
          _id,
          name,
          speciality,
          description
        }
          member_assigned{
            _id,
            name,
            email,
            mobile
          }
          comments{
            content,
            created_by{
              name
              team{
                name
              }
            }
            created_at
          }
        }
}`;

const  GET_PROJECTS_BY_MEMBERS=  gql`
query {
  getMembers{
    _id,
    name,
    mobile,
assigned_projects{
  status
  _id,
  title,
  start_date,
  end_date,
}
  
  }
}`;

const  GET_PROJECTS_BY_TEAMS=  gql`
query {
  getTeams{
    name,
    _id,
    assigned_projects{
      _id,
      title,
      description,
      status,
      start_date,
      end_date
    }
  }
}`;





export { GET_PROJECTS_QUERY , GET_PROJECT_CORE_DETAILS_QUERY ,GET_PROJECTS_BY_TEAMS,GET_PROJECTS_BY_MEMBERS}
