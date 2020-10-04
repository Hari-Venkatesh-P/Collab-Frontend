import { gql} from '@apollo/client';

const GET_MEMBERS_QUERY =  gql`
query{
    getMembers{
      _id,
      name,
      mobile,
      email,
     project_count
    team{
      name
    }
    }
}`;

export { GET_MEMBERS_QUERY }
