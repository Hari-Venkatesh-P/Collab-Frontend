import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider  } from '@apollo/client';
import {Provider} from 'react-redux';
import {NotificationContainer} from 'react-notifications';


import client from "../src/graphql/index"
import Store from "../src/redux/index"
import ProjectScreen from "../src/screens/projectscreen";
import TeamScreen from "../src/screens/teamscreen";
import MemberScreen from "../src/screens/memberscreen"
import LoginScreen from "../src/screens/loginscreen"
import ProfileScreen from "../src/screens/profilescreen"

function App() {

  return (
    <div className="App">
      <NotificationContainer/>
      <ApolloProvider client={client}>
        <Provider store={Store}>
        <BrowserRouter>
          <Route exact path="/" component={LoginScreen} /> 
          <Route exact path="/projects" component={ProjectScreen} /> 
          <Route exact path="/teams" component={TeamScreen} /> 
          <Route exact path="/members" component={MemberScreen} />
          <Route exact path="/profile" component={ProfileScreen} /> 
        </BrowserRouter>
        </Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;
