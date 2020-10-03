import { gql } from '@apollo/client';

const ADD_NEW_TEAM_MUTATION =  gql`
mutation  createTeam($name: String!, $description: String!, $speciality: String!){
    createTeam(name:$name,description:$description,speciality:$speciality){
        _id,
        name,
        speciality,
        description,
        created_at,
        team_strength,
        project_count
      }
}`;

export { ADD_NEW_TEAM_MUTATION }
