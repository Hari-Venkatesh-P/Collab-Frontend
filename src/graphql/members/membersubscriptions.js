import { gql } from '@apollo/client';


const MEMBER_ADDED_SUBSCRIPTION =  gql`
subscription{
    memberAdded
  }`;

export {MEMBER_ADDED_SUBSCRIPTION}