import { gql} from '@apollo/client';

const GET_PROJECTS_QUERY =  gql`
query{
    getProjects{
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
        }
}`;

export { GET_PROJECTS_QUERY , GET_PROJECT_CORE_DETAILS_QUERY }
