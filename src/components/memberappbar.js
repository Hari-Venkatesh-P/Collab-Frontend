// Author : Hari Venkatesh P 
// This Component is used to as app bar for displaying member details

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AssignmentLateTwoToneIcon from '@material-ui/icons/AssignmentLateTwoTone';
import PeopleTwoToneIcon from '@material-ui/icons/PeopleTwoTone';
import { isMemberLoggedIn } from "../Auth/authutils"
import AppBarTable from "../components/appbartable"

export default function MemberAppBar(props) {

  const [showProject, setShowProject] = React.useState(true);
  const [value, setValue] = React.useState(0);

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
        centered
      >
        <Tab label={ (props.isProfileScreen) ? "My Projects" : (!isMemberLoggedIn()) ? "Projects of Member" : "Projects of Colleague" } icon={<AssignmentLateTwoToneIcon />} />
        <Tab label={ (props.isProfileScreen) ? "My Team" : (!isMemberLoggedIn()) ? "Team of Member" : "Team of Colleague" } icon={<PeopleTwoToneIcon />}  />
      </Tabs>
     
    </Paper>
      </div>
     <AppBarTable isProjectFromMemberScreen={showProject} isTeamDetailsFromMemberScreen={!showProject} tableDetails={props.memberDetails}></AppBarTable>

    </div>
  );
}