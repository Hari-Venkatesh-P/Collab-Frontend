// Author : Hari Venkatesh P
// This Component is used to view all the projects created


import React , {useState , useEffect} from 'react';
import { useQuery , useMutation  } from '@apollo/client';
import {useSelector,useDispatch} from "react-redux"
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { CSVLink} from "react-csv";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Calendertimeline from "../components/calendertimelime"
import NavBar from "../components/navbar" 
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import {ADD_NEW_PROJECT_MUTATION } from "../graphql/projects/projectmutation";
import {GET_PROJECTS_QUERY ,GET_PROJECTS_BY_MEMBERS ,GET_PROJECTS_BY_TEAMS ,  } from "../graphql/projects/projectquery";
import {GET_PROJECT_BASIC_DETAILS , ADD_NEW_PROJECT ,GET_MEMBER_PROJECTS , GET_TEAM_PROJECTS} from "../redux/actions/ProjectActions";


import ProjectAppBar from "../components/projectappbar"
import ViewProject from "../components/viewproject"
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {isMemberLoggedIn ,getLoggedInUserId} from "../Auth/authutils"


function TaskScreen() {

  var userId = ""

  useEffect(()=>{
    userId = getLoggedInUserId();
  })

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles()
  const dispatch = useDispatch()
  const projectData = useSelector(state => state.projectReducer.projects)
  const projectDataMemberWise = useSelector(state => state.projectReducer.memberProjects)
  const projectDataTeamWise = useSelector(state => state.projectReducer.teamProjects)
  
  const [newProjectTitle,setNewProjectTitle] = useState('')
  const [newProjectDescription,setNewProjectDescription] = useState('')
  const [newProjectStartDate,setNewProjectStartDate] = useState(new Date())
  const [newProjectEndDate,setNewProjectEndDate] = useState(new Date())
  const [variables,setVariables] = useState({})
  const [dashboardView,setDashBoardView] = useState(true)
  const [viewId,setViewId] = useState('')
  const [open, setOpen] = useState(false);
  const [viewByToggle , setViewByToggle] = useState("MEMBERS")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const toggleView = (id) =>{
    if(id){
        setViewId(id)
    }
    setDashBoardView(!dashboardView)
  }

  const handleClose = () => {
    setNewProjectTitle('')
    setNewProjectDescription('')
    setNewProjectStartDate(new Date())
    setNewProjectEndDate(new Date())
    setOpen(false);
  };

  const handleViewByToggling = (e) =>{
      setViewByToggle(e.target.value)
  }


  const getAllProjectsByMemberCompleted = (data) =>{
    if(data){
      dispatch({type:GET_MEMBER_PROJECTS,payload:data.getMembers})
    }      
  }
  const { loading : projectByMemberLoading, error : projectByMemberErr} = useQuery(GET_PROJECTS_BY_MEMBERS,{
   onCompleted:getAllProjectsByMemberCompleted
  });



  const getAllProjectsByTeamCompleted = (data) =>{
    if(data){
      dispatch({type:GET_TEAM_PROJECTS,payload:data.getTeams})
    }      
  }
  const { loading : projectByTeamLoading, error : projectByTeamErr} = useQuery(GET_PROJECTS_BY_TEAMS,{
   onCompleted:getAllProjectsByTeamCompleted
  });



  const getAllProjectsCompleted = (data) =>{
    if(data.getProjects){
      dispatch({type:GET_PROJECT_BASIC_DETAILS,payload:data.getProjects})
    }      
  }
  const { loading, error} = useQuery(GET_PROJECTS_QUERY,{
    pollInterval: 30000,
    variables:{id:getLoggedInUserId()},
    onCompleted:getAllProjectsCompleted
    });
  

  const [AddNewProject,  addNewProjectMutationData ] = useMutation(ADD_NEW_PROJECT_MUTATION);

  const makeAddProjectMutation = () =>{
    AddNewProject({ variables: { title:newProjectTitle,description:newProjectDescription,start_date:newProjectStartDate.toString(),end_date:newProjectEndDate.toString() } })
    .then(result=>{
        if(result.data){
            NotificationManager.success(" New Project "+ newProjectTitle +" is created",'Success',3000);
           dispatch({type:ADD_NEW_PROJECT,payload:result.data.createProject})
            handleClose()
        }
    })
    .catch((res) => {
        res.graphQLErrors.map((error) => {
          if(error.message.startsWith("Database Error: ")){
           NotificationManager.error(error.message,'Error',4000);
          }else{
           NotificationManager.warning(error.message,'Warning',3000);
          }
    });
    });
  }
  return (
    <div>
        <NavBar></NavBar>
        <Dialog open={open} onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title" style={{color:"blue"}}>{"CREATING A NEW PROJECT !!"}</DialogTitle>
                        <DialogContent>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                          <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Title </InputLabel>
                          </Box>
                          <Box p={1} >
                            <TextField error={ (newProjectTitle === "") ? true :false}
                                onChange={(e)=>{setNewProjectTitle(e.target.value)}}
                                value={newProjectTitle}
                                id="standard-error-helper-text"
                                 placeholder="Project Title"
                                 helperText={(newProjectTitle==="") ? "Project Name is mandatory" : ""}
                             />
                          </Box>
                          <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Description </InputLabel>
                          </Box>
                          <Box p={1} >
                            <TextField error={ (newProjectDescription === "") ? true :false}
                                onChange={(e)=>{setNewProjectDescription(e.target.value)}}
                                value={newProjectDescription}
                                id="standard-error-helper-text"
                                 placeholder="Project Description"
                                 helperText={(newProjectDescription==="") ? "Project Description is mandatory" : ""}
                             />
                          </Box>
                        </Box>
                        
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                          <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Start Date </InputLabel>
                          </Box>
                          <Box p={1} >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker margin="normal" id="date-picker-dialog" 
                                  label="Event Date"format="dd/MM/yyyy"
                                  value={newProjectStartDate}
                                  onChange={(date)=>{setNewProjectStartDate(date)}}
                                  KeyboardButtonProps={{'aria-label': 'change date'}}/>
                            </MuiPickersUtilsProvider>                           
                          </Box>
                          <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> End  Date</InputLabel>
                          </Box>
                          <Box p={1} >
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDatePicker margin="normal" id="date-picker-dialog" 
                                      label="Event Date"format="dd/MM/yyyy"
                                      value={newProjectEndDate}
                                      onChange={(date)=>{setNewProjectEndDate(date)}}
                                      KeyboardButtonProps={{'aria-label': 'change date'}}/>
                              </MuiPickersUtilsProvider>                   
                          </Box>
                        </Box>
                        </DialogContent>
                    <DialogActions>
                        <Button
                         onClick={handleClose}
                           variant="outlined"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<CancelIcon />}> Cancel </Button>
                        <Button
                         onClick={makeAddProjectMutation} 
                         variant="contained"
                        color="primary"
                        size="large"
                         disabled = {(newProjectTitle === "" || newProjectDescription === "") ? true : false}
                        className={classes.button}
                        startIcon={<SaveIcon />}> Save </Button>
                    </DialogActions>
                </Dialog>
                          {
                             dashboardView && 
                             <div style={{margin:"2%"}}>
                               { !(isMemberLoggedIn())  &&
                                 <React.Fragment>
                                      <Box display="flex" justifyContent="flex-end"  bgcolor="background.paper">
                                    <Box p={1} >
                                        <Button variant="outlined"
                                                color="primary"
                                                className={classes.button}
                                                startIcon={<AddIcon />}
                                                onClick={handleClickOpen}
                                        >
                                            Add New Project
                                        </Button>
                                    </Box>
                                </Box>
                                 </React.Fragment>
                               }
                               
                                <Box display="flex" justifyContent="flex-end" m={1}>
                                          <IndeterminateCheckBoxIcon style={{color:"#e0d15a"}} ></IndeterminateCheckBoxIcon> ASSIGNED
                                          <IndeterminateCheckBoxIcon style={{color:"#849650"}} ></IndeterminateCheckBoxIcon> COMPLETED
                                          <IndeterminateCheckBoxIcon style={{color:"#d45568"}} ></IndeterminateCheckBoxIcon> DELAYED
                                </Box>
                                {
                                  (viewByToggle==="MEMBERS" &&  projectDataMemberWise.length!=0) &&
                                  <div>
                                    
                                      <Calendertimeline viewByToggle={viewByToggle} getMembers={projectDataMemberWise} ></Calendertimeline>
                                  </div>
                                }
                                {
                                  (viewByToggle==="TEAMS" &&  projectDataTeamWise.length!=0) &&
                                  <div>
                                      <Calendertimeline viewByToggle={viewByToggle} getTeams={projectDataTeamWise}></Calendertimeline>
                                  </div>
                                }
                              <Box display="flex" justifyContent="flex-end" m={1} p={1} bgcolor="background.paper">
                                <Box m={2} >
                                    <InputLabel id="demo-simple-select-label" style={{color:"black"}}>View By</InputLabel>
                                </Box>
                                <Box  m={1}>
                                  <Select
                                    value={viewByToggle}
                                    onChange={handleViewByToggling}
                                  >
                                    <MenuItem value="MEMBERS">MEMBERS</MenuItem>
                                    <MenuItem value="TEAMS">TEAMS</MenuItem>
                                  </Select>
                                </Box>
                                {
                                  !(isMemberLoggedIn()) &&
                                  <React.Fragment>
                                       <Box m={1}>
                                        <CloudDownloadIcon style={{color:"blue"}}></CloudDownloadIcon>   
                                      </Box>
                                      <Box m={1} >
                                        <CSVLink data={projectData} filename={"projects.csv"}> &nbsp;Download Report </CSVLink>
                                      </Box>

                                  </React.Fragment> 
                                     
                                }
                                
                              </Box>
                              <ProjectAppBar  projectData={projectData} onRowClick={toggleView} ></ProjectAppBar>
                             </div>
                          }
                          {
                            !dashboardView && 
                            <div style={{margin:"2%"}}>
                               <Box display="flex" justifyContent="flex-end" m={1} p={1} bgcolor="background.paper">
                                    <Box p={1} >
                                        <Button variant="outlined"
                                                color="primary"
                                                className={classes.button}
                                                startIcon={<ArrowBackIcon />}
                                              onClick={toggleView}
                                        >
                                            GO BACK
                                        </Button>
                                    </Box>
                                </Box>
                              <ViewProject viewId={viewId}></ViewProject>
                             </div>
                          }   

                           
                    </div>
  );
}

export default TaskScreen;