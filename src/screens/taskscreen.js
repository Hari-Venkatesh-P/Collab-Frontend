import React from 'react';
import NavBar from "../components/navbar"
import Calendertimeline from "../components/calendertimelime"

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