// Author : Hari Venkatesh P 
// This Component is used as app bar to display team details

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AssignmentLateTwoToneIcon from '@material-ui/icons/AssignmentLateTwoTone';
import PeopleTwoToneIcon from '@material-ui/icons/PeopleTwoTone';

import AppBarTable from "../components/appbartable"

export default function TeamAppBar(props) {

  const [showProject, setShowProject] = React.useState(false);
  const [value, setValue] = React.useState(1);

  const setToggling = () =>{
    if(showProject){
      setValue(1)
    }else{
      setValue(0)
    }
  }


  const handleChange = () => {
    setShowProject(!showProject);
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
        aria-label="disabled tabs example"
        centered
      >
        <Tab label="Project Details" icon={<AssignmentLateTwoToneIcon />} />
        <Tab label="Team Member Details" icon={<PeopleTwoToneIcon />}  />
      </Tabs>
     
    </Paper>
      </div>
     <AppBarTable isProjectFromTeamScreen={showProject} isTeamMembersFromTeamScreen={!showProject} tableDetails={props.teamDetails}></AppBarTable>

    </div>
      
  );
}