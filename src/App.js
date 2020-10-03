import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider  } from '@apollo/client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from 'apollo-utilities';
import {Provider} from 'react-redux';
import {NotificationContainer} from 'react-notifications';

import Store from "../src/redux/index"

import TaskScreen from "../src/screens/taskscreen";
import TeamScreen from "../src/screens/teamscreen";
import MemberScreen from "../src/screens/memberscreen"

function App() {

  const httpLink = new HttpLink({
    uri: 'https://collab-services.herokuapp.com/graphql',
});

const wsLink = new WebSocketLink({
    uri: `ws://collab-services.herokuapp.com/graphql`,
    options: {
      reconnect: true
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
    link: link,
    cache: new InMemoryCache({
    })
});
  
  return (
    <div className="App">
      <NotificationContainer/>
      <ApolloProvider client={client}>
        <Provider store={Store}>
        <BrowserRouter>
          <Route exact path="/" component={TaskScreen} /> 
          <Route exact path="/teams" component={TeamScreen} /> 
          <Route exact path="/members" component={MemberScreen} /> 
        </BrowserRouter>
        </Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;
