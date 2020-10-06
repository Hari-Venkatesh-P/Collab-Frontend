import React , {useEffect, useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { green } from '@material-ui/core/colors';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import Typography from '@material-ui/core/Typography';
import { useQuery , useMutation  } from '@apollo/client';
import {useSelector,useDispatch} from "react-redux"
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { NotificationManager} from 'react-notifications';
import DeleteIcon from '@material-ui/icons/Delete';
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import ViewProjectAppBar from "../components/viewprojectappbar";
import CommentTwoToneIcon from '@material-ui/icons/CommentTwoTone';

import MemberMenu from "./assignproject"

import {GET_PROJECT_CORE_DETAILS_QUERY} from "../graphql/projects/projectquery"
import {GET_TEAMS_NAMES_QUERY} from "../graphql/teams/teamquery"
import {EDIT_PROJECT_MUTATION , DELETE_PROJECT_MUTATION , ASSIGN_PROJECT_TO_MEMBER_MUTATION , UPDATE_PROJECT_STATUS_MUTATION, DELETE_MEMBER_FROM_PROJECT_MUTATION } from "../graphql/projects/projectmutation"
import {GET_PROJECT_CORE_DETAILS, EDIT_PROJECT , ASSIGN_PROJECTS_TO_MEMBER , UPDATE_PROJECT_STATUS , REMOVE_MEMBER_FROM_PROJECT} from "../redux/actions/ProjectActions";
import { TEAM_NAMES_FOR_NEW_MEMBER} from "../redux/actionstrings";

const useStyles = makeStyles({
    root: {
      minWidth: 500,
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

  const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

export default function ViwProject(props) {

    useEffect(()=>{
        console.log(" View Core Details of member  renedered "+props.viewId)
    })

    const [editDescription,setEditDescription] = useState('') 
    const [editStartDate,setEditStartDate] = useState(new Date()) 
    const [editEndDate,setEditEndDate] = useState(new Date()) 
    const [open, setOpen] = useState(false);

    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const handleEditClose = () => {
        setEditDescription('')
        setEditStartDate(new Date())
        setEditEndDate(new Date())
        setEditDialogOpen(false);
    };

    const [assignTeamId,setAssignTeamId] = useState('')
  
    var teamNames = []
    const [assignDialogOpen, setAssignDialogOpen] = useState(false);

    const handleAssignClose = () => {
        setAssignTeamId('')
        setAssignDialogOpen(false);
    };

    const [comment, setCommment] = useState('');
    const [commentDialogOpen, setCommmentDialogOpen] = useState(false);

    const handleCommentClose = () => {
        setCommment('')
        setProjectStatus('')
        setCommmentDialogOpen(false);
    };

    const [viewCommentDialog,setViewCommentDialog] = useState(false)
    const handleViewCommentDialog = () => {
        setViewCommentDialog(false);
    };


    const handleClose = () => {
        // setEditDescription('')
        // setEditStartDate(new Date())
        // setEditEndDate(new Date())
        setOpen(false);
    };
    const [projectStatus,setProjectStatus] = React.useState('')

    const dispatch = useDispatch()
    const projectDataFromStore = useSelector(state=>state.projectReducer.projects)
    const assign_project = useSelector(state=>state.projectReducer.assign_project)
    const teamsAndMembers = useSelector(state=>state.teamReducer.existingTeams)
    var projectToDisplay = {}
    projectDataFromStore.map((project)=>{
       if(project._id === props.viewId && project.coredetails){
        projectToDisplay = project
       }
    })

    if(assignTeamId){
        teamsAndMembers.map((team)=>{
            if(team._id == assignTeamId){
                teamNames = team.team_members
            }
        })
    }

    const getTeamsandNamesQueryCompleted = (data) =>{
        if(data.getTeamsAndMembers){
            dispatch({type:TEAM_NAMES_FOR_NEW_MEMBER,payload: data.getTeamsAndMembers})
        }
    }

    const {loading : getTeamsandNamesQueryCompletedloading,error:getTeamsandNamesQueryCompletedErr} = useQuery(GET_TEAMS_NAMES_QUERY,{
    // pollInterval: 10000,
        onCompleted:getTeamsandNamesQueryCompleted
    });
    
    
    const getProjectsCoreDetailsCompleted = (data) =>{
        if(data.getProjectById && !error && !loading){
            dispatch({type:GET_PROJECT_CORE_DETAILS,payload:{data : data.getProjectById , id : props.viewId}})
        }
    }

    const { loading, error} = useQuery(GET_PROJECT_CORE_DETAILS_QUERY,{
        variables:{id:props.viewId},
    // pollInterval: 10000,
        onCompleted:getProjectsCoreDetailsCompleted
    });
  
    
    const classes = useStyles();
    const theme = useTheme();

    const getProjectsCount = (projects,status) => {
        var j = 0
        if(projects){
            for(var i=0;i<projects.length;i++){
                if(projects[i].status === status){
                    j = j+1
                }
            }
        }
        return j    
    }

      const getMobileHelperText = (txt)=> {
        if(txt === ""){
          return "Mobile is mandatory"
        }
        else if (parseInt(txt.length) !== 10){
          return "Enter Proper Mobile Number"
        }else{
          return ""
        }
      }

    const [EditProjectMutation,  editProjectMutationData ] = useMutation(EDIT_PROJECT_MUTATION);

    const makeEditMutation = () =>{
      EditProjectMutation({ variables: { id:props.viewId,start_date:editStartDate,end_date:editEndDate,description:editDescription } })
      .then(result=>{
          if(result.data){
              NotificationManager.success("Project details edited",'Success',3000);
              dispatch({type:EDIT_PROJECT,payload:{id:props.viewId,start_date:editStartDate,end_date:editEndDate,description:editDescription}})
              handleEditClose()
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

    const [DeleteProject,  deleteProjectMutationData ] = useMutation(DELETE_PROJECT_MUTATION);

    const makeDeleteMutation = () =>{
        DeleteProject({ variables: { id:props.viewId} })
        .then(result=>{
            if(result.data){
                NotificationManager.success("Project Deleted",'Success',3000);
                window.location.href = "/"
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
      

      const [AssignProject,  assignProjectMutationData ] = useMutation(ASSIGN_PROJECT_TO_MEMBER_MUTATION);

      const makeAssignProjectMutation = () =>{
        AssignProject({ variables: { projectId:props.viewId,teamId:assign_project.teamId,memberId:assign_project.memberId } })
        .then(result=>{
            if(result.data){
                handleAssignClose()
                dispatch({type:ASSIGN_PROJECTS_TO_MEMBER,payload:{id:props.viewId,data:result.data.assignProjectToMember}})
                NotificationManager.success("Project Assigned",'Success',3000);
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


      const [UpdateProjectStatusMutation,  updateProjectMutationData ] = useMutation(UPDATE_PROJECT_STATUS_MUTATION);

      const makeUpdateStatusMutation = () =>{
        UpdateProjectStatusMutation({ variables: { id:props.viewId,status:projectStatus,created_by:"5f7ae7666ed6c48f7038d2b8",content:comment } })
        .then(result=>{
            if(result.data){
                NotificationManager.success("Status Marked as "+projectStatus,'Success',3000);
                dispatch({type:UPDATE_PROJECT_STATUS,payload:{data:result.data.updateProjectStatus}})
                handleCommentClose()
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

      const checkStatusType = () =>{
        if(projectStatus === "COMPLETED"){
            makeUpdateStatusMutation()
        }else if (projectStatus === "DELAYED"){
            setCommmentDialogOpen(true)
        }else{
            alert("Kindly select a status to update !")
        }
  }
  const [DeleteMemberFromProject,  deleteMemberFromProjectMutation ] = useMutation(DELETE_MEMBER_FROM_PROJECT_MUTATION);

  const makeDeleteMemberFromProject = (memberId) =>{
    if(memberId){
      DeleteMemberFromProject({ variables: { id:props.viewId,memberId:memberId } })
      .then(result=>{
          if(result.data){
              NotificationManager.success("Member Deleted Successfully",'Success',3000);
             dispatch({type:REMOVE_MEMBER_FROM_PROJECT,payload:{ id:props.viewId,memberid:memberId }})
             console.log(projectDataFromStore)
          }
      })
      .catch((res) => {
            console.log(res)
      });
    }
    }

      const  renderTeamSelectMenu = () =>{
        return(
          <FormControl error={assignTeamId==="" ? true : false}>
               <Select onChange={(e)=>{setAssignTeamId(e.target.value)}}> 
              {
                 Object.keys(teamsAndMembers).map(function(key) {
                  return <MenuItem  value={teamsAndMembers[key]._id} name={teamsAndMembers[key].name}>{teamsAndMembers[key].name.toString().toUpperCase() } &nbsp; TEAM</MenuItem >
                })
              }
            </Select>
            <FormHelperText>{assignTeamId==="" ? "Team Name is Mandatory" : ""}</FormHelperText>
          </FormControl>
         
        )
      }

    return (
      <div>
          <Dialog open={viewCommentDialog} onClose={handleViewCommentDialog}
                    >
                        <DialogTitle id="alert-dialog-title" style={{color:"#4863c7"}}>{"COMMENTS FOR PROJECTS :"}</DialogTitle>
                        <DialogContent>
                            {
                                projectToDisplay?.coredetails?.comments?.map((comment)=>{
                                    return(
                                    <Box style={{backgroundColor:"lightblue"}} m={1} p={1}>
                                        <Box display="flex" flexDirection="row" justifyContent="flex-start" >
                                            <Box p={1} >
                                                <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{comment.content} </Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" flexDirection="row" justifyContent="flex-start" >
                                            <Box p={1} >
                                                <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{comment.created_by?.name} </Typography>
                                            </Box>
                                            <Box p={1} >
                                                <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{comment.created_by?.team?.name} </Typography>
                                            </Box>
                                            <Box p={1} >
                                                <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{new Date(comment.created_at).toDateString()}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    )
                                })
                            }
                        </DialogContent>
                </Dialog>
          <Dialog open={commentDialogOpen} onClose={handleCommentClose}
                    >
                        <DialogTitle id="alert-dialog-title" style={{color:"#4863c7"}}>{"COMMENTS FOR PROJECT DELAY :"}</DialogTitle>
                        <DialogContent>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                            <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}>COMMENT CONTENT </InputLabel>
                            </Box>
                            <Box p={1} >
                                <TextField error={ (comment === "") ? true :false}
                                    onChange={(e)=>{setCommment(e.target.value)}}
                                    value={comment}
                                    multiline={true}
                                    rows={3}
                                    id="standard-error-helper-text"
                                    placeholder="Comment Content"
                                    helperText={(comment==="") ? "Comment is mandatory" : ""}
                                />
                            </Box>
                        </Box>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCommentClose}  variant="outlined"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<CancelIcon />}> Cancel </Button>
                        <Button 
                        onClick={()=>{makeUpdateStatusMutation()}}
                          variant="contained"
                        color="primary"
                        size="large"
                         disabled = { comment=="" ? true : false}
                        className={classes.button}
                        startIcon={<SaveIcon />}> Save </Button>
                    </DialogActions>
                </Dialog>
            <Dialog open={assignDialogOpen} onClose={handleAssignClose}
                    >
                        <DialogTitle id="alert-dialog-title" >{"ASSIGNING PROJECT TO MEMBER :"}</DialogTitle>
                        <DialogContent>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                            <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}>TEAM ASSIGNED </InputLabel>
                            </Box>
                            <Box p={1} >
                               {renderTeamSelectMenu()}
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                            <Box p={1} >
                                <InputLabel htmlFor="component-simple"  style={{color:"black"}}> MEMBER ASSIGNED </InputLabel>
                            </Box>
                            <Box p={1} >
                                { (teamNames.length != 0 && assignTeamId !="") &&
                                        <MemberMenu teamNames={teamNames} teamId={assignTeamId}></MemberMenu>
                                }
                            </Box>
                        </Box>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleAssignClose}  variant="outlined"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<CancelIcon />}> Cancel </Button>
                        <Button 
                        onClick={()=>{makeAssignProjectMutation()}}
                          variant="contained"
                        color="primary"
                        size="large"
                         disabled = {(assign_project.memberId === "" || assign_project.teamId == "") ? true : false}
                        className={classes.button}
                        startIcon={<SaveIcon />}> Save </Button>
                    </DialogActions>
                </Dialog>
           <Dialog open={editDialogOpen} onClose={handleEditClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" >{"EDITING  MEMBER DETAILS :"}</DialogTitle>
                        <DialogContent>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                            <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Project Description </InputLabel>
                            </Box>
                            <Box p={1} >
                                <TextField error={ (editDescription === "") ? true :false}
                                    onChange={(e)=>{setEditDescription(e.target.value)}}
                                    value={editDescription}
                                    id="standard-error-helper-text"
                                    placeholder="Project Description"
                                    helperText={(editDescription==="") ? "Project Description is mandatory" : ""}
                                />
                            </Box>
                            
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                            <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Revised Start  Date </InputLabel>
                            </Box>
                            <Box p={1} >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDatePicker margin="normal" id="date-picker-dialog" 
                                      label="Event Date"format="dd/MM/yyyy"
                                      value={editStartDate}
                                      onChange={(date)=>{setEditStartDate(date)}}
                                      KeyboardButtonProps={{'aria-label': 'change date'}}/>
                              </MuiPickersUtilsProvider>
                            </Box>
                            <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Revised End  Date </InputLabel>
                            </Box>
                            <Box p={1} >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDatePicker margin="normal" id="date-picker-dialog" 
                                      label="Event Date"format="dd/MM/yyyy"
                                      value={editEndDate}
                                      onChange={(date)=>{setEditEndDate(date)}}
                                      KeyboardButtonProps={{'aria-label': 'change date'}}/>
                              </MuiPickersUtilsProvider>
                            </Box>
                        </Box>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleEditClose}  variant="outlined"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<CancelIcon />}> Cancel </Button>
                        <Button 
                        onClick={makeEditMutation}
                          variant="contained"
                        color="primary"
                        size="large"
                         disabled = {(editDescription === "" ) ? true : false}
                        className={classes.button}
                        startIcon={<SaveIcon />}> Save </Button>
                    </DialogActions>
                </Dialog>
                <Card className={classes.root} style={{backgroundColor:"lightblue"}}>
                    <CardContent className={classes.content}>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start"  >
                            <Box  display="flex" flexDirection="column" justifyContent="flex-start"  >
                                <Box display="flex" flexDirection="row" justifyContent="flex-start">
                                    <Box m={1}>
                                        <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >PROJECT TITLE : </Typography>
                                    </Box>
                                    <Box m={1}>
                                        <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{projectToDisplay.title}</Typography>
                                    </Box>
                                    <Box m={1}>
                                        <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >PROJECT DESCRIPTION </Typography>
                                    </Box>
                                    <Box m={1}>
                                        <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{projectToDisplay.description}</Typography>
                                    </Box>
                                    <Box m={1}>
                                        <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >STATUS  : </Typography>
                                    </Box>
                                    <Box m={1}>
                                        <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{projectToDisplay.status}</Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" flexDirection="row" justifyContent="flex-start" >
                                    <Box m={1}>
                                        <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >START DATE  : </Typography>
                                    </Box>
                                    <Box m={1}>
                                        <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{new Date(projectToDisplay.start_date).toDateString()}</Typography>
                                    </Box>
                                    <Box m={1}>
                                        <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >END DATE  : </Typography>
                                    </Box>
                                    <Box m={1}>
                                        <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{new Date(projectToDisplay.end_date).toDateString()}</Typography>
                                    </Box>
                                    <Box m={1}>
                                        <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >CREATED AT  : </Typography>
                                    </Box>
                                    <Box m={1}>
                                        <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{projectToDisplay.created_at}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                <Box display="flex" justifyContent="flex-end" m={1} p={1} bgcolor="background.paper">
                    <Box p={1} >
                        <Button variant="outlined" color="primary" className={classes.button} 
                                startIcon={<EditIcon />} 
                                onClick={()=>{setEditDialogOpen(true)}}
                        >
                            EDIT PROJECT
                        </Button>
                    </Box>
                    <Box p={1} >
                        <Button variant="outlined" color="primary" className={classes.button} 
                                startIcon={<AssignmentIndIcon />} 
                                onClick={()=>{setAssignDialogOpen(true)}}
                        >
                            ASSIGN PROJECT
                        </Button>
                    </Box>
                    <Box p={1} >
                        <Button variant="outlined" color="primary" className={classes.button} 
                                startIcon={<DeleteIcon />} 
                                onClick={()=>{ 
                                    if(props.viewId){
                                        makeDeleteMutation()
                                    }
                                }}
                        >
                            DELETE PROJECT
                        </Button>
                    </Box>
                    <Box p={1} >
                        <Button variant="outlined" color="primary" className={classes.button} 
                                startIcon={<CommentTwoToneIcon />} 
                                onClick={()=>{setViewCommentDialog(true)}}
                        >
                            GET COMMENTS 
                        </Button>
                    </Box>
                </Box>
                <Card className={classes.root} style={{backgroundColor:"lightblue"}}>
                    <CardContent  className={classes.content}>
                            <Box display="flex" flexDirection="row" justifyContent="flex-start"  >
                                <Box display="flex" flexDirection="row" justifyContent="flex-start" >
                                    <Box>
                                        <Radio   checked={projectStatus === 'DELAYED'} onChange={(e)=>{setProjectStatus(e.target.value)}}  value="DELAYED" inputProps={{ 'aria-label': 'DELAYED' }}/>
                                    </Box>
                                    <Box m={1}>
                                        <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} > MARK AS DELAYED</Typography>
                                    </Box>
                                    <Box>
                                        <GreenRadio   checked={projectStatus === 'COMPLETED'} onChange={(e)=>{setProjectStatus(e.target.value)}}  value="COMPLETED" inputProps={{ 'aria-label': 'COMPLETED' }}/> 
                                    </Box>
                                    <Box m={1}>
                                        <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >MARK AS COMPLETED</Typography>
                                    </Box>
                                </Box>
                            </Box>
                    </CardContent>
                </Card>
                <Box display="flex" justifyContent="flex-end" m={1} p={1} bgcolor="background.paper">
                    
                    <Box p={1} >
                        <Button variant="outlined" color="primary" className={classes.button} 
                                startIcon={<EditIcon />} 
                                onClick={()=>{checkStatusType()}}
                        >
                            UPDATE STATUS 
                        </Button>
                    </Box>
                </Box>   
                <ViewProjectAppBar projectToDisplay={projectToDisplay} makeDeleteMemberFromProject={makeDeleteMemberFromProject}></ViewProjectAppBar>   
          </div>
        );
    }