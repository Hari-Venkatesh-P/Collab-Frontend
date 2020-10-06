import { gql } from '@apollo/client';

const ADD_NEW_PROJECT_MUTATION =  gql`
mutation  createProject($title:String!,$description:String!,$start_date:String!,$end_date:String!){
    createProject(title:$title,description:$description,start_date:$start_date,end_date:$end_date){
       _id,
       title,
       description,
       start_date,
       end_date,
       created_at,
       status
    }
}`;

const EDIT_PROJECT_MUTATION =  gql`
mutation  editProject($id:ID!,$description:String!,$start_date:String!,$end_date:String!){
    editProject(id:$id,description:$description,start_date:$start_date,end_date:$end_date){
       _id,
       description,
       start_date,
       end_date,
    }
}`;

const DELETE_PROJECT_MUTATION =  gql`
mutation  deleteProject($id:ID!){
    deleteProject(id:$id)
}`;

const ASSIGN_PROJECT_TO_MEMBER_MUTATION =  gql`
mutation  deleteProject($projectId:ID!,$teamId:ID!,$memberId:ID!){
    assignProjectToMember(projectId:$projectId,memberId:$memberId,teamId:$teamId){
        team_assigned{
          _id
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


const UPDATE_PROJECT_STATUS_MUTATION =  gql`
mutation  updateProjectStatus($id:ID!,$status:String!,$created_by:ID!,$content:String){
  updateProjectStatus(id:$id,status:$status,created_by:$created_by,content:$content){
    title,
   _id,
   status,
    comments{
      content,
      created_at,
      created_by{
        name
        team{
          name
        }
      }
    }
  }
}`;

const DELETE_MEMBER_FROM_PROJECT_MUTATION =  gql`
  mutation deleteMemberFromProject($id:ID!,$memberId:ID!){
  deleteMemberFromProject(id:$id,memberId:$memberId)
}`;
export {ADD_NEW_PROJECT_MUTATION , EDIT_PROJECT_MUTATION , DELETE_PROJECT_MUTATION ,DELETE_MEMBER_FROM_PROJECT_MUTATION,ASSIGN_PROJECT_TO_MEMBER_MUTATION,UPDATE_PROJECT_STATUS_MUTATION}
