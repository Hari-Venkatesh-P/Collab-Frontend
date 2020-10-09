import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PeopleTwoToneIcon from '@material-ui/icons/PeopleTwoTone';
import AssignmentIndTwoToneIcon from '@material-ui/icons/AssignmentIndTwoTone';

import AppBarTable from "../components/appbartable"

export default function ProjectAppBar(props) {

  const [isTeam, setIsTeam] = React.useState(true);
  const [value, setValue] = React.useState(0);

  const setToggling = () =>{
    if(isTeam){
        setValue(1)
    }else{
        setValue(0)
    }
  }


  const handleChange = () => {
    setIsTeam(!isTeam);
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
        <Tab label="ASSIGNED TEAMS" icon={<PeopleTwoToneIcon />} />
        <Tab label="ASSIGNED MEMBERS" icon={<AssignmentIndTwoToneIcon />}   />
      </Tabs>
     
    </Paper>
      </div>
        <AppBarTable isTeamFromViewProjectScreen={isTeam} isMemberFromViewProjectScreen={!isTeam} tableDetails={props.projectToDisplay} deleteIconClicked={props.deleteIconClicked}></AppBarTable>
    </div>
  );
}