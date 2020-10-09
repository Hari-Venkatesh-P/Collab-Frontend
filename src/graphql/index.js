import { ApolloClient  } from '@apollo/client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from '@apollo/client/link/context';


const httpLink = new HttpLink({
    uri: 'https://collab-services.herokuapp.com/graphql',
});

const wsLink = new WebSocketLink({
    uri: `ws://collab-services.herokuapp.com/graphql`,
    options: {
      reconnect: true
    }
});


const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token || " ",
    }
  }
});


const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
   wsLink,
    httpLink,
  );
  

  
const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache({
    })
});

export default  client;