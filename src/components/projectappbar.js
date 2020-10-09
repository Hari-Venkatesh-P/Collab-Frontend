// Author : Hari Venkatesh P 
// This Component is used to app bar while displaying project details

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AppBarTable from "../components/appbartable"

export default function ProjectAppBar(props) {

  const [showAssignedProject, setShowAssignedProjects] = React.useState(false);
  const [value, setValue] = React.useState(1);

  const setToggling = () =>{
    if(showAssignedProject){
      setValue(1)
    }else{
      setValue(0)
    }
  }

  const handleChange = () => {
    setShowAssignedProjects(!showAssignedProject);
    setToggling()
  };
  return (
    <div>
        <div style={{marginTop:"20px",marginBottom:"20px"}}>
            <Paper       
 square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        centered
      >
        <Tab label="PIPELINED PROJECTS" />
        <Tab label="ONGOING PROJECTS"   />
      </Tabs>
    </Paper>
      </div>
        <AppBarTable isAssignedProject={!showAssignedProject} isNewProjects={showAssignedProject} toggleView = {props.onRowClick} tableDetails={props.projectData}></AppBarTable>
    </div>
      
  );
}