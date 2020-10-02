import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import TaskScreen from "../src/screens/taskscreen";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={TaskScreen} /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
