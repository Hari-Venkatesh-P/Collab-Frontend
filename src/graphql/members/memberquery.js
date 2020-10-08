import { gql} from '@apollo/client';

const GET_MEMBERS_QUERY =  gql`
query getMembers($id:ID){
    getMembers(id:$id){
      _id,
      name,
      mobile,
      email,
      dob,
      address,
      gender,
      project_count,
      created_at,
    team{
      name
    }
    }
}`;


const GET_MEMBER_CORE_DETAILS_QUERY =  gql`
query  getMemberById($id:ID!){
  getMemberById(id:$id){
assigned_projects{
  title,
  start_date,
  end_date,
  description,
  status
}
  team{
    name,
    speciality,
    project_count,
    team_strength
  }
  }
}`;


const GET_LOGGED_IN_MEMBER__DETAILS_MUTATION =  gql`
query  getMemberById($id:ID!){
getMemberById(id:$id){
    _id,
      name,
      mobile,
      email,
      dob,
      address,
      gender,
      project_count,
      created_at,
    team{
    name,
    speciality,
    project_count,
    team_strength
    },
    assigned_projects{
  title,
  start_date,
  end_date,
  description,
  status
}
  }
}`;

export { GET_MEMBERS_QUERY , GET_MEMBER_CORE_DETAILS_QUERY ,GET_LOGGED_IN_MEMBER__DETAILS_MUTATION}
