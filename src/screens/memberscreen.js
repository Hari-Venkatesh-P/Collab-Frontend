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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Radio from '@material-ui/core/Radio';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GET_MEMBERS_QUERY} from "../graphql/members/memberquery"
import {GET_TEAMS_NAMES_QUERY} from "../graphql/teams/teamquery"
import {ADD_NEW_MEMBER_MUTATION , DELETE_MEMBER_MUTATION} from "../graphql/members/membermutation"
import {GET_ALL_MEMBERS_BASIC_DETAILS , TEAM_NAMES_FOR_NEW_MEMBER,ADD_NEW_MEMBER , DELETE_MEMBER} from "../redux/actionstrings"
import DataTable from "../components/table"
import NavBar from "../components/navbar" 
import Loader from "../components/loader"
import ViewMember from "../components/viewmember"

function MemberScreen(props) {

  useEffect(()=>{
    console.log("Teams Screen is useEffect Called")
  })

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles()


  const dispatch = useDispatch()  
  const memberData = useSelector(state=>state.memberReducer.members)
  
  const [newMemberName,setNewMemberName] = useState('')
  const [newMemberEmail,setNewMemberEmail] = useState('')
  const [newMemberMobile,setNewMemberMobile] = useState('')
  const [newTeamMemberAddress,setNewTeamMemberAddress] = useState('')
  const [newTeamMemberDOB, setNewTeamMemberDOB] = React.useState(new Date());
  const [newTeamMemberGender, setNewTeamMemberGender] = React.useState('');
  const [newMemberTeam,setNewMemberTeam] = useState('')


  const [basicView,setBasicView] = useState(true)
  const [viewId,setViewId] = useState('')
  const [open, setOpen] = useState(false);


  const existingTeams = useSelector(state=>state.teamReducer.existingTeams)
  var emailPattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}[a-z]{2,3}")


  const handleClickOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setNewMemberName('')
      setNewTeamMemberAddress('')
      setNewMemberEmail('')
      setNewMemberMobile('')
      setOpen(false);
  };

  const toggleToTeamCoreDetailsView = (id) =>{
      if(id){
          setViewId(id)
      }
      setBasicView(!basicView)
  }


  const getTeamNamesQueryCompleted = (data) =>{
    if(data.getTeams){
      dispatch({type:TEAM_NAMES_FOR_NEW_MEMBER,payload:data.getTeams})
    } 
  }

  const  {loading:teamnamequeryloading,error:teamnamequeryerror} = useQuery(GET_TEAMS_NAMES_QUERY,{
    // pollInterval: 10000,
   onCompleted:getTeamNamesQueryCompleted
  });

  const getMembersQueryCompleted = (data) =>{
    if(data.getMembers){
      dispatch({type:GET_ALL_MEMBERS_BASIC_DETAILS,payload:data.getMembers})
    }      
  }
  const { loading, error} = useQuery(GET_MEMBERS_QUERY,{
      // pollInterval: 10000,
     onCompleted:getMembersQueryCompleted
  });

  const getEmailHelperText = (txt)=> {
    if(txt === ""){
      return "Email is mandatory"
    }
    else if (!emailPattern.test(txt)){
      return "Enter Proper Email Format"
    }else{
      return ""
    }
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

  const renderTeamSelectMenu = () =>{
    return(
      <FormControl error={newMemberTeam==="" ? true : false}>
           <Select onChange={(e)=>{setNewMemberTeam(e.target.value);}}>
          {
             Object.keys(existingTeams).map(function(key) {
              return <MenuItem  value={existingTeams[key]._id}>{existingTeams[key].name.toString().toUpperCase() } &nbsp; TEAM</MenuItem >
            })
          }
        </Select>
        <FormHelperText>{newMemberTeam==="" ? "Team Name is Mandatory" : ""}</FormHelperText>
      </FormControl>
     
    )
  }


  const [AddMember,  addMemberMutationData ] = useMutation(ADD_NEW_MEMBER_MUTATION);

  const makeAddMemberMutation = () =>{
    var password = newMemberEmail.toString().slice(0,5)+newMemberMobile.toString().slice(newMemberMobile.toString().length - 3,newMemberMobile.toString().length)
    AddMember({ variables: { name:newMemberName,email:newMemberEmail,mobile:newMemberMobile,password:password,team:newMemberTeam,dob:newTeamMemberDOB,address:newTeamMemberAddress,gender:newTeamMemberGender } })
    .then(result=>{
        if(result.data.createMember){
            NotificationManager.success(" New Member "+ newMemberName +" is created",'Success',3000);
            dispatch({type:ADD_NEW_MEMBER,payload:result.data.createMember})
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

  const [DeleteMember,  deleteMemberMutationData ] = useMutation(DELETE_MEMBER_MUTATION);

  const makeDeletememberMutation = (id) =>{
    DeleteMember({ variables: {id:id} })
    .then(result=>{
        if(result.data){
            NotificationManager.success(" Member deleted successfully",'Success',3000);
            dispatch({type:DELETE_MEMBER,payload:{id:id}})
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
  else if (error){
    return(
        <div>
            <NavBar></NavBar>
            <h3 style={{color:"red"}}>We are facing an issue.Kindly wait.</h3>
        </div>
    );
  }else{
    return(
      <div>
           <NavBar></NavBar>
           <Dialog open={open} onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title" >{"CREATING A NEW MEMBER :"}</DialogTitle>
                        <DialogContent>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                          <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Name </InputLabel>
                          </Box>
                          <Box p={1} >
                            <TextField error={ (newMemberName === "") ? true :false}
                                onChange={(e)=>{setNewMemberName(e.target.value)}}
                                value={newMemberName}
                                id="standard-error-helper-text"
                                 placeholder="Member Name "
                                 helperText={(newMemberName==="") ? "Name is mandatory" : ""}
                             />
                          </Box>
                          <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Email  </InputLabel>
                          </Box>
                          <Box p={1} >
                            <TextField error={ (getEmailHelperText(newMemberEmail) !=="") ? true :false}
                                onChange={(e)=>{setNewMemberEmail(e.target.value)}}
                                value={newMemberEmail}
                                id="standard-error-helper-text"
                                 placeholder="Member Email"
                                 helperText={getEmailHelperText(newMemberEmail)}
                             />
                          </Box>
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                          <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Place </InputLabel>
                          </Box>
                          <Box p={1} >
                            <TextField error={ (newTeamMemberAddress === "") ? true :false}
                                onChange={(e)=>{setNewTeamMemberAddress(e.target.value)}}
                                value={newTeamMemberAddress}
                                id="standard-error-helper-text"
                                 placeholder="Member Address "
                                 helperText={(newTeamMemberAddress==="") ? "Address is mandatory" : ""}
                             />
                          </Box>
                          <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Mobile  </InputLabel>
                          </Box>
                          <Box p={1} >
                            <TextField error={ (getMobileHelperText(newMemberMobile) !=="") ? true :false}
                                onChange={(e)=>{setNewMemberMobile(e.target.value)}}
                                value={newMemberMobile}
                                id="standard-error-helper-text"
                                 placeholder="Member Mobile"
                                 helperText={getMobileHelperText(newMemberMobile)}
                             />
                          </Box>
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                          <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> DOB  </InputLabel>
                          </Box>
                          <Box p={1} >
                             <DatePicker selected={newTeamMemberDOB} onChange={date => setNewTeamMemberDOB(date)} />                          </Box>
                          <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Gender  </InputLabel>
                          </Box>
                          <Box p={1} >
                            <Radio   checked={newTeamMemberGender === 'Male'} onChange={(e)=>{setNewTeamMemberGender(e.target.value)}} value="Male" name="radio-button-demo" inputProps={{ 'aria-label': 'Male' }}/> MALE
                            <Radio   checked={newTeamMemberGender === 'Female'} onChange={(e)=>{setNewTeamMemberGender(e.target.value)}} value="Female" name="radio-button-demo" inputProps={{ 'aria-label': 'Female' }}/> FEMALE
                          </Box>
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                        <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Picture </InputLabel>
                          </Box>
                          <Box p={1} >
                          <Button variant="outlined"
                                               color="primary" aria-label="upload picture"
                                                className={classes.button}
                                                startIcon={ <PhotoCamera />}
                                        >
                                           UPLOAD
                                        </Button>
                          </Box>
                          <Box display="flex" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                          <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}>Member Team  :</InputLabel>
                          </Box>
                          <Box p={1} >
                            {renderTeamSelectMenu()}
                          </Box>
                          </Box>
                        </Box>
                        
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}  variant="outlined"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<CancelIcon />}> Cancel </Button>
                        <Button onClick={makeAddMemberMutation}  variant="contained"
                        color="primary"
                        size="large"
                         disabled = {(newMemberName === "" || newMemberTeam === "" || newTeamMemberAddress ===""|| !newTeamMemberDOB || newTeamMemberGender===""||getMobileHelperText(newMemberMobile) !=="" || getEmailHelperText(newMemberEmail)!=="") ? true : false}
                        className={classes.button}
                        startIcon={<SaveIcon />}> Save </Button>
                    </DialogActions>
                </Dialog>
                <div  style={{margin:"3%"}}>
                  {
                      basicView &&
                        <div>
                              <Box display="flex" justifyContent="flex-end" m={1} p={1} bgcolor="background.paper">
                                    <Box p={1} >
                                        <Button variant="outlined"
                                                color="primary"
                                                className={classes.button}
                                                startIcon={<AddIcon />}
                                                onClick={handleClickOpen}
                                        >
                                            Add New Member
                                        </Button>
                                    </Box>
                                </Box>
                                <DataTable  isTeam={false} tableDetails={memberData}  onRowClick={toggleToTeamCoreDetailsView} makeDeletememberMutation={makeDeletememberMutation}></DataTable>
                        </div>  
                  } 
                  {
                      !basicView &&  
                      <div>
                            <Box display="flex" justifyContent="flex-end" m={1} p={1} bgcolor="background.paper">
                                    <Box p={1} >
                                        <Button variant="outlined"
                                                color="primary"
                                                className={classes.button}
                                                startIcon={<ArrowBackIcon />}
                                                onClick={toggleToTeamCoreDetailsView}
                                        >
                                           Go Back
                                        </Button>
                                    </Box>
                            </Box>
                            <ViewMember viewId={viewId} ></ViewMember>
                      </div>
                  } 
              </div>
      </div>
  );
  }
}

export default MemberScreen;