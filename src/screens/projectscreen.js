import React , {useState} from 'react';
import { useQuery , useMutation  } from '@apollo/client';
import {useSelector,useDispatch} from "react-redux"
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

import {ADD_NEW_PROJECT_MUTATION} from "../graphql/projects/projectmutation";
import {GET_PROJECTS_QUERY} from "../graphql/projects/projectquery";
import {GET_PROJECT_BASIC_DETAILS , ADD_NEW_PROJECT} from "../redux/actions/ProjectActions";
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ProjectAppBar from "../components/projectappbar"
import ViewProject from "../components/viewproject"


function TaskScreen() {

  const [newProjectTitle,setNewProjectTitle] = useState('')
  const [newProjectDescription,setNewProjectDescription] = useState('')
  const [newProjectStartDate,setNewProjectStartDate] = useState(new Date())
  const [newProjectEndDate,setNewProjectEndDate] = useState(new Date())


  

  const [dashboardView,setDashBoardView] = useState(true)
  const [viewId,setViewId] = useState('')
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const toggleView = (id) =>{
    if(id){
        console.log("Setting View Id")
        setViewId(id)
    }
    setDashBoardView(!dashboardView)
  }

  var getMembers =  [
    {
      _id: "5f7ae7666ed6c48f7038d2b8",
      name: "Hari",
      mobile: "8608468562",
      assigned_projects: [
        {
          _id: "5f7ae82a6ed6c48f7038d2bc",
          title: "UI Project",
          start_date: "2020-10-13T16:04:00.000Z",
          end_date: "2020-10-31T16:04:00.000Z"
        }
      ]
    },
    {
      _id: "5f7ae78f6ed6c48f7038d2b9",
      name: "Venkatesh",
      mobile: "9865971733",
      assigned_projects: [
        {
          _id: "5f7ae82a6ed6c48f7038d2bc",
          title: "UI Project",
          start_date: "2020-10-13T16:04:00.000Z",
          end_date: "2020-10-31T16:04:00.000Z"
        },
        {
          _id: "5f7b4ea992a8b89274094399",
          title: "Test 7 ",
          start_date: "2020-10-05T16:49:48.822Z",
          end_date: "2020-10-16T16:49:00.000Z"
        }
      ]
    },
    {
      _id: "5f7ae7bf6ed6c48f7038d2ba",
      name: "Keerthi",
      mobile: "7412589633",
      assigned_projects: [
        {
          _id: "5f7ae82a6ed6c48f7038d2bc",
          title: "UI Project",
          start_date: "2020-10-13T16:04:00.000Z",
          end_date: "2020-10-31T16:04:00.000Z"
        },
        {
          _id: "5f7ae8446ed6c48f7038d2bd",
          title: "Sevice",
          start_date: "Mon Oct 10 2020 15:02:13 GMT+0530 (India Standard Time)",
          end_date: "Mon Oct 15 2020 15:02:13 GMT+0530 (India Standard Time)"
        }
      ]
    },
    {
      _id: "5f7ae7fe6ed6c48f7038d2bb",
      name: "Kavu",
      mobile: "9874563214",
      assigned_projects: [
        {
          _id: "5f7ae82a6ed6c48f7038d2bc",
          title: "UI Project",
          start_date: "2020-10-13T16:04:00.000Z",
          end_date: "2020-10-31T16:04:00.000Z"
        }
      ]
    }
  ]


  const handleClose = () => {
    setNewProjectTitle('')
    setNewProjectDescription('')
    setNewProjectStartDate(new Date())
    setNewProjectEndDate(new Date())
    setOpen(false);
  };

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles()

  const getAllProjectsCompleted = (data) =>{
    if(data.getProjects){
      dispatch({type:GET_PROJECT_BASIC_DETAILS,payload:data.getProjects})
    }      
  }

  const dispatch = useDispatch()
  const projectData = useSelector(state => state.projectReducer.projects)

  const { loading, error} = useQuery(GET_PROJECTS_QUERY,{
      // pollInterval: 10000,
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
                    <DialogTitle id="alert-dialog-title" >{"CREATING A NEW PROJECT :"}</DialogTitle>
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
                               <Box display="flex" justifyContent="flex-end" m={1} p={1} bgcolor="background.paper">
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
                              <Calendertimeline getMembers={getMembers}></Calendertimeline>
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
                                                startIcon={<AddIcon />}
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