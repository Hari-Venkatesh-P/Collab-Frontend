import React from 'react';
import { BrowserRouter, Route , Switch} from 'react-router-dom';
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
import PageNotFound from "../src/components/pagenotfound"

import {ProtectedRoute,MemberRoute} from "../src/Auth/protectedroutes"
function App() {

  return (
    <div className="App">
      <NotificationContainer/>
      <ApolloProvider client={client}>
        <Provider store={Store}>
        <BrowserRouter>
        <Switch>
        <Route exact path="/" component={LoginScreen} />
          <ProtectedRoute path="/projects" exact component={ProjectScreen}></ProtectedRoute> 
          <ProtectedRoute path="/teams" exact component={TeamScreen}></ProtectedRoute> 
          <ProtectedRoute path="/members" exact component={MemberScreen}></ProtectedRoute> 
          <MemberRoute path="/profile" exact component={ProfileScreen}></MemberRoute> 
          <Route  component={PageNotFound} />
        </Switch>
        </BrowserRouter>
        </Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;
