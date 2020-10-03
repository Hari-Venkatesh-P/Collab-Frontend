import React from 'react';
import DataTable from "../components/table"
import NavBar from "../components/navbar" 

function MemberScreen() {
  return (
    <div>
        <NavBar></NavBar>
        <div style={{margin:"2%"}}>
            {/* <DataTable></DataTable> */}
        </div>
       
        <h1>Task Screen</h1>
    </div>
  );
}

export default MemberScreen;