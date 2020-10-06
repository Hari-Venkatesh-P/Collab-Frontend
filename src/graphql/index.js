import { ApolloClient, ApolloProvider  } from '@apollo/client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from '@apollo/client/link/context';


const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true
    }
});


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: "My X-Auth",
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