import React from 'react';

import Calendertimeline from "../components/calendertimelime"
import NavBar from "../components/navbar" 

function TaskScreen() {
  return (
    <div>
        <NavBar></NavBar>
        <div style={{margin:"2%"}}>
            <Calendertimeline></Calendertimeline>
        </div>
       
        <h1>Task Screen</h1>
    </div>
  );
}

export default TaskScreen;