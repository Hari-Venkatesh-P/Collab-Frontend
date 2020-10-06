import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider  } from '@apollo/client';
import {Provider} from 'react-redux';
import {NotificationContainer} from 'react-notifications';
import Store from "../src/redux/index"
import TaskScreen from "../src/screens/projectscreen";
import TeamScreen from "../src/screens/teamscreen";
import MemberScreen from "../src/screens/memberscreen"
import client from "../src/graphql/index"

function App() {

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
