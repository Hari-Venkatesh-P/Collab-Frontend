import React ,{useEffect , useState}from 'react';
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
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import DataTable from "../components/table"
import ViewTeam from "../components/viewteams"
import Loader from "../components/loader"
import {GET_TEAMS_QUERY , GET_TEAM_COREDETAILS_QUERY} from "../graphql/teams/teamquery"
import {ADD_NEW_TEAM_MUTATION} from "../graphql/teams/teammutation"
import NavBar from "../components/navbar" 
import {GET_ALL_TEAMS_BASIC_DETAILS , ADD_NEW_TEAM} from "../redux/actionstrings"

function TeamScreen(props) {


    useEffect(()=>{
        console.log("Teams Screen is useEffect Called")
    })


    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
    }));


    const dispatch = useDispatch()
    const teamData = useSelector(state=>state.teamReducer)


    const [newTeamName,setNewTeamName] = useState('')
    const [newTeamSpeciality,setNewTeamSpeciality] = useState('')
    const [newTeamDescription,setNewTeamDescription] = useState('')
    const [basicView,setBasicView] = useState(true)
    const [viewId,setViewId] = useState('')
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setNewTeamName('')
        setNewTeamDescription('')
        setNewTeamSpeciality('')
        setOpen(false);
    };

    const toggleToTeamCoreDetailsView = (id) =>{
        if(id){
            console.log("Setting View Id")
            setViewId(id)
        }
        setBasicView(!basicView)
    }

    const classes = useStyles()

    const getTeamsQueryCompleted = (data) =>{
        dispatch({type:GET_ALL_TEAMS_BASIC_DETAILS,payload:data.getTeams})
    }
    const { loading, error} = useQuery(GET_TEAMS_QUERY,{
        // pollInterval: 10000,
       onCompleted:getTeamsQueryCompleted
    });


    const [AddTeam,  addTeamMutationData ] = useMutation(ADD_NEW_TEAM_MUTATION);
    const makeAddEventMutation = () =>{
        AddTeam({ variables: { name:newTeamName,description:newTeamDescription,speciality:newTeamSpeciality  } })
        .then(result=>{
            console.log(result)
            if(result.data.createTeam){
                NotificationManager.success('New Team is created','Success',3000);
                dispatch({type:ADD_NEW_TEAM,payload:result.data.createTeam})
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

    if (loading){
        return (
            <Loader></Loader>
         );
    } 
    if (error){
        console.log(error)
        return(
            <div>
                <NavBar></NavBar>
                <h3 style={{color:"red"}}>We are facing an issue.Kindly wait.</h3>
            </div>
        );
    }
    else{
        return (
          <div>
              <NavBar></NavBar>
                    <Dialog open={open} onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title" >{"Creating a new team !!"}</DialogTitle>
                        <DialogContent>
                        <Box display="flex" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                        <Box p={1} >
                            <InputLabel htmlFor="component-simple" style={{color:"black"}}>Name</InputLabel>
                            <TextField error={(newTeamName === "") ? true :false}
                                value = {newTeamName}
                                onChange={(e)=>{setNewTeamName(e.target.value)}}
                                id="standard-error-helper-text"
                                 placeholder="Team Name"
                                 helperText="Team Name is mandatory."
                            />
                        </Box>
                        <Box p={1} >
                            <InputLabel htmlFor="component-simple"  style={{color:"black"}}>Speciality</InputLabel>
                                <TextField error={ (newTeamSpeciality === "") ? true :false}
                                value = {newTeamSpeciality}
                                onChange={(e)=>{setNewTeamSpeciality(e.target.value)}}
                                id="standard-error-helper-text"
                                 placeholder="Team Speciality"
                                 helperText="Team Speciality is Mandatory"
                                />
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                        <Box p={1} >
                            <InputLabel htmlFor="component-simple"  style={{color:"black"}}>Description</InputLabel>
                            <TextField error={ (newTeamDescription === "") ? true :false}
                                onChange={(e)=>{setNewTeamDescription(e.target.value)}}
                                value={newTeamDescription}
                                id="standard-error-helper-text"
                                 placeholder="Team Description"
                                 multiline
                                 rows={4}
                                 fullWidth
                                 helperText="Description is mandatory"
                            />
                        </Box>
                    </Box>
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}  variant="outlined"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<CancelIcon />}> Cancel </Button>
                        <Button onClick={makeAddEventMutation}  variant="contained"
                        color="primary"
                        size="large"
                        disabled = {(newTeamName === "" || newTeamDescription === "" || newTeamSpeciality==="") ? true : false}
                        className={classes.button}
                        startIcon={<SaveIcon />}> Save </Button>
                    </DialogActions>
                </Dialog>
                <div  style={{margin:"3%"}}>
                <Box display="flex" justifyContent="flex-end" m={1} p={1} bgcolor="background.paper">
                    <Box p={1} >
                        <Button variant="outlined"
                               color="primary"
                                className={classes.button}
                                startIcon={<AddIcon />}
                                onClick={handleClickOpen}
                        >
                            Add New Team
                        </Button>
                    </Box>
                </Box>
                  {
                      basicView &&  <DataTable headings={['Team Name','Team Speciality','Team Strength','Total Projects','Team Created At']} rowdetails={teamData.teams} onRowClick={toggleToTeamCoreDetailsView}></DataTable>
                  } 
                  {
                      !basicView &&  <ViewTeam viewId={viewId} onRowClick={toggleToTeamCoreDetailsView}></ViewTeam>
                  } 
              </div>
          </div>
         );
    }
}

export default TeamScreen;