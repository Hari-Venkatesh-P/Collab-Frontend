import { gql } from '@apollo/client';


const TEAM_ADDED_SUBSCRIPTION =  gql`
subscription{
    teamAdded
  }`;

export {TEAM_ADDED_SUBSCRIPTION}