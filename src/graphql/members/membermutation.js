import { gql } from '@apollo/client';

const ADD_NEW_MEMBER_MUTATION =  gql`
mutation  createMember($name:String!,$email:String!,$address:String!,$gender:String!,$dob:String!,$password:String!,$mobile:String!,$team:ID!){
    createMember(name:$name,email:$email,address:$address,gender:$gender,dob:$dob,mobile:$mobile,password:$password,team:$team){
        _id,
        name,
        mobile,
        email,
        address,
        gender,
        dob,
        project_count
        team{
          name
        }
    }
}`;

const DELETE_MEMBER_MUTATION =  gql`
mutation  deleteMember($id:ID!){
  deleteMember(id:$id)
}`;

const EDIT_MEMBER_MUTATION =  gql`
mutation  editMember($id:ID!,$name:String!,$mobile:String!,$address:String!){
  editMember(name:$name,mobile:$mobile,address:$address,id:$id){
    name,
    mobile,
    address,
  }
}`;

const RESET_MEMBER_PASSWORD =  gql`
mutation  resetPassword($id:ID!,$currentpassword:String!,$newpassword:String!){
  resetPassword(id:$id,currentpassword:$currentpassword,newpassword:$newpassword){
    name,
    password
  }  
}`;

const LOGIN_MEMBER =  gql`
mutation  login($email:String!,$password:String!){
  login(email:$email,password:$password){
    name,
    email,
    _id,
    role,
    token
  } 
}`;

export { ADD_NEW_MEMBER_MUTATION , DELETE_MEMBER_MUTATION , EDIT_MEMBER_MUTATION , RESET_MEMBER_PASSWORD , LOGIN_MEMBER}
