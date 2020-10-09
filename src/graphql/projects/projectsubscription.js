import { gql } from '@apollo/client';


const PROJECT_ADDED_SUBSCRIPTION =  gql`
subscription{
    projectAdded
  }`;

export {PROJECT_ADDED_SUBSCRIPTION}