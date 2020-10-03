import React , {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useQuery , useMutation  } from '@apollo/client';
import {useSelector,useDispatch} from "react-redux"


import {GET_TEAM_COREDETAILS_QUERY} from "../graphql/teams/teamquery"
import {GET_TEAM_CORE_DETAILS} from "../redux/actionstrings"
import TeamAppBar from "../components/teamappbar"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ViewTeam(props) {

   useEffect(()=>{
        console.log(" View Core Details of team  renedered "+props.viewId)
    })
   const classes = useStyles();
   const dispatch = useDispatch()
   const teamDataFromStore = useSelector(state=>state.teamReducer.teams)
   var teamDataToDisplay = {}
   teamDataFromStore.map((team)=>{
       if(team._id === props.viewId && team.coredetails){
        teamDataToDisplay = team
       }
   })
   
   console.log(teamDataToDisplay)
   
    
    const getTeamsCoreDetailsQueryCompleted = (data) =>{
        if(data.getTeamById && !error && !loading){
            dispatch({type:GET_TEAM_CORE_DETAILS,payload:{data : data.getTeamById , id : props.viewId}})
        }
    }
    
    const { loading, error} = useQuery(GET_TEAM_COREDETAILS_QUERY,{
        variables:{id:props.viewId},
    // pollInterval: 10000,
        onCompleted:getTeamsCoreDetailsQueryCompleted
    });
    
    const getProjectsCount = (projects,status) => {
        var j = 0
        for(var i=0;i<projects.length;i++){
            if(projects[i].status === status){
                j = j+1
            }
        }
        return j;
    }
    const renderDetaillsCards = () =>{
        var ts = new Date(teamDataToDisplay.created_at.toString())
        return(
            <Card className={classes.root} style={{backgroundColor:"lightblue"}}>
            <CardContent>
              <Box display="flex" justifyContent="flex-start" m={1} p={1} >
                  <Box m={1}>
                      <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} onClick={()=>{props.onRowClick()}}>TEAM NAME : </Typography>
                  </Box>
                  <Box m={1}>
                    <Typography variant="h6" component="h6"  style={{color:"black",fontSize:"15px"}}>{teamDataToDisplay.name} &nbsp; Team</Typography>
                  </Box>
                  <Box m={1}>
                      <Typography variant="h6" component="h6"  style={{color:"blue",fontSize:"15px"}}>TEAM SPECIALITY : </Typography>
                  </Box>
                  <Box m={1}>
                      <Typography variant="h6" component="h6"  style={{color:"black",fontSize:"15px"}}>{teamDataToDisplay.speciality}</Typography>
                  </Box>
              </Box>
              <Box display="flex" justifyContent="flex-start" m={1} p={1} >
                  <Box m={1}>
                      <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}}>TEAM DECRIPTION : </Typography>
                  </Box>
                  <Box m={1}>
                      <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}}>{teamDataToDisplay.description}</Typography>
                  </Box>
              </Box>
              <Box display="flex" justifyContent="flex-start" m={1} p={1} >
                  <Box m={1}>
                      <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}}>TEAM STRENGTH : </Typography>
                  </Box>
                  <Box m={1}>
                      <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}}>{teamDataToDisplay.team_strength} &nbsp; Member(s)</Typography>
                  </Box>
                  <Box m={1}>
                      <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}}>TEAM FOUNDED AT: </Typography>
                  </Box>
                  <Box m={1}>
                      <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}}>{ts.toDateString()} </Typography>
                  </Box>
              </Box>
              <Box display="flex" justifyContent="flex-start" m={1} p={1} >
                  <Box m={1}>
                      <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}}>TOTAL PROJECTS : </Typography>
                  </Box>
                  <Box m={1}>
                      <Typography variant="h6" component="h6"  style={{color:"black",fontSize:"15px"}}>{teamDataToDisplay.project_count} &nbsp; Project(s)</Typography>
                  </Box>
                  <Box m={1}>
                      <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}}>COMPLETED PROJECTS : </Typography>
                  </Box>
                  <Box m={1}>
                    <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}}>{getProjectsCount(teamDataToDisplay.coredetails.assigned_projects,"COMPLETED")} Project(s)</Typography>
                  </Box>
                  <Box m={1}>
                      <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}}>Delayed Projects : </Typography>
                  </Box>
                  <Box m={1}>
                      <Typography variant="h6" component="h6"  style={{color:"black",fontSize:"15px"}}>{getProjectsCount(teamDataToDisplay.coredetails.assigned_projects,"DELAYED")} &nbsp; Project(s)</Typography>
                  </Box>
              </Box>
            </CardContent>
          </Card>
        )
    }
    return (
    <div>
        {teamDataToDisplay._id && renderDetaillsCards()}

        {teamDataToDisplay._id && <TeamAppBar teamDetails = {teamDataToDisplay}></TeamAppBar>}
        
   </div>
  );
}
