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


import { GET_MEMBERS_QUERY} from "../graphql/members/memberquery"
// import {ADD_NEW_TEAM_MUTATION} from "../graphql/teams/teammutation"
import {GET_ALL_MEMBERS_BASIC_DETAILS , ADD_NEW_MEMBER} from "../redux/actionstrings"
import DataTable from "../components/table"
import NavBar from "../components/navbar" 
import Loader from "../components/loader"

function MemberScreen(props) {

  useEffect(()=>{
    console.log("Teams Screen is useEffect Called")
  })

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));


  const dispatch = useDispatch()  
  const memberData = useSelector(state=>state.memberReducer)

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

  const getMembersQueryCompleted = (data) =>{
    if(data.getMembers){
      dispatch({type:GET_ALL_MEMBERS_BASIC_DETAILS,payload:data.getMembers})
    }      
  }
  const { loading, error} = useQuery(GET_MEMBERS_QUERY,{
      // pollInterval: 10000,
     onCompleted:getMembersQueryCompleted
  });
  if (loading){
    return (
        <Loader></Loader>
     );
  } 
  else if (error){
    console.log(error)
    return(
        <div>
            <NavBar></NavBar>
            <h3 style={{color:"red"}}>We are facing an issue.Kindly wait.</h3>
        </div>
    );
  }else{
    console.log(memberData)
    return(
      <div>
           <NavBar></NavBar>
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
                                <DataTable  isTeam={false} tableDetails={memberData.members}  onRowClick={toggleToTeamCoreDetailsView}></DataTable>
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
                            {/* <ViewTeam viewId={viewId} ></ViewTeam> */}
                      </div>
                  } 
              </div>
      </div>
  );
  }
}

export default MemberScreen;