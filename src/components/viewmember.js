import React , {useEffect, useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LockOpenIcon from '@material-ui/icons/LockOpen';
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
import { NotificationManager} from 'react-notifications';
import MemberAppBar from "../components/memberappbar"

import {GET_MEMBER_CORE_DETAILS_QUERY} from "../graphql/members/memberquery"
import {GET_MEMBER_CORE_DETAILS} from "../redux/actions/memberActions"
import {EDIT_MEMBER_MUTATION , RESET_MEMBER_PASSWORD} from "../graphql/members/membermutation"
import {EDIT_MEMBER} from "../redux/actionstrings"
import { isMemberLoggedIn , getLoggedInUserId} from "../Auth/authutils"


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

export default function ViewMember(props) {

    var isMemberPresent
    var userId

    useEffect(()=>{
        console.log(" View Core Details of member  renedered "+props.viewId)
    })

    const [editName,setEditName] = useState('') 
    const [editMobile,setEditMobile] = useState('') 
    const [editAddress,setEditAddress] = useState('') 
    const [open, setOpen] = useState(false);

    var emailPattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}[a-z]{2,3}")

    const existingTeams = useSelector(state=>state.teamReducer.existingTeams)
    const dispatch = useDispatch()
    const memberDataFromStore = useSelector(state=>state.memberReducer.members)
    var memberToDisplay = {}
    memberDataFromStore.map((member)=>{
       if(member._id === props.viewId && member.coredetails){
        memberToDisplay = member
       }
    })


    const getMemberCoreDetailsCompleted = (data) =>{
        if(data.getMemberById && !error && !loading){
            dispatch({type:GET_MEMBER_CORE_DETAILS,payload:{data : data.getMemberById , id : props.viewId}})
        }
    }

    const { loading, error} = useQuery(GET_MEMBER_CORE_DETAILS_QUERY,{
        variables:{id:props.viewId},
    // pollInterval: 10000,
        onCompleted:getMemberCoreDetailsCompleted
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

      const handleClose = () => {
        setEditName('')
        setEditMobile('')
        setEditAddress('')
        setOpen(false);
    };


    const [currentPassword,setCurrentPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [resetPassDialog,setResetDialogOpen] = useState(false) 

    const handleResetDialog = () => {
        setCurrentPassword('')
        setNewPassword('')
        setResetDialogOpen(false);
    };


    const [EditMemberMutation,  editMemberMutationData ] = useMutation(EDIT_MEMBER_MUTATION);

    const makeEditMutation = () =>{
      EditMemberMutation({ variables: { id:props.viewId,name:editName,mobile:editMobile,address:editAddress } })
      .then(result=>{
          if(result.data){
              NotificationManager.success("Details Updated Successfully",'Success',3000);
              dispatch({type:EDIT_MEMBER,payload:{id:props.viewId,name:editName,address:editAddress,mobile:editMobile}})
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

    const [ResetPasswordMutation,  editresetPassData ] = useMutation(RESET_MEMBER_PASSWORD);

    const makeResetPasswordMutation = () =>{
        ResetPasswordMutation({ variables: { id:props.viewId,currentpassword:currentPassword,newpassword:newPassword } })
      .then(result=>{
          if(result.data){
              NotificationManager.success("Password Reset done. !",'Success',3000);
              handleResetDialog()
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
    var passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,12}$")

    const doPasswordValidation = (txt)=> {
        if(txt === ""){
          return "Password is mandatory"
        }
        else if (!passwordPattern.test(txt)){
          return "6 to 12 characters, 1 upper caseletter, 1 lowercase, 1 numeric digit"
        }else{
          return ""
        }
      }
    return (
      <div>
                <Dialog open={open} onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title"  style={{color:"black"}} >{"EDIT MEMBER DETAILS :"}</DialogTitle>
                        <DialogContent>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                            <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Name </InputLabel>
                            </Box>
                            <Box p={1} >
                                <TextField error={ (editName === "") ? true :false}
                                    onChange={(e)=>{setEditName(e.target.value)}}
                                    value={editName}
                                    id="standard-error-helper-text"
                                    placeholder="Member Name "
                                    helperText={(editName==="") ? "Name is mandatory" : ""}
                                />
                            </Box>
                            
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                            <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Mobile </InputLabel>
                            </Box>
                            <Box p={1} >
                                <TextField  error={ (getMobileHelperText(editMobile) !=="") ? true :false}
                                    onChange={(e)=>{setEditMobile(e.target.value)}}
                                    value={editMobile}
                                    id="standard-error-helper-text"
                                    placeholder="Member Name "
                                    helperText={getMobileHelperText(editMobile)}
                                />
                            </Box>
                            <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Place  </InputLabel>
                            </Box>
                            <Box p={1} >
                                <TextField error={ (editAddress === "") ? true :false}
                                onChange={(e)=>{setEditAddress(e.target.value)}}
                                value={editAddress}
                                id="standard-error-helper-text"
                                 placeholder="Member Address"
                                 helperText={"Address is mandatory"}
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
                        <Button onClick={makeEditMutation}  variant="contained"
                        color="primary"
                        size="large"
                         disabled = {(editName === "" || editAddress ==="" ||getMobileHelperText(editMobile) !=="" ) ? true : false}
                        className={classes.button}
                        startIcon={<SaveIcon />}> Save </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={resetPassDialog} onClose={handleResetDialog}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" >{"PASSWORD RESET :"}</DialogTitle>
                        <DialogContent>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                            <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> CURRENT PASSWORD </InputLabel>
                            </Box>
                            <Box p={1} >
                                <TextField error={ (currentPassword === "") ? true :false}
                                    onChange={(e)=>{setCurrentPassword(e.target.value)}}
                                    value={currentPassword}
                                    id="standard-error-helper-text"
                                    placeholder="Member Name "
                                helperText={(currentPassword==="") ? "Current Password is mandatory" : ""}
                                />
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                            <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> NEW PASSWORD </InputLabel>
                            </Box>
                            <Box p={1} >
                                <TextField error={ (doPasswordValidation(newPassword) !=="") ? true :false}
                                    onChange={(e)=>{setNewPassword(e.target.value)}}
                                    value={newPassword}
                                    id="standard-error-helper-text"
                                    placeholder="Member Name "
                                helperText={doPasswordValidation(newPassword)}
                                />
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">
                        </Box>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleResetDialog}  variant="outlined"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<CancelIcon />}> Cancel </Button>
                        <Button onClick={makeResetPasswordMutation}  variant="contained"
                        color="primary"
                        size="large"
                         disabled = {(currentPassword === "" ||doPasswordValidation(newPassword) !=="" ) ? true : false}
                        className={classes.button}
                        startIcon={<SaveIcon />}> Save </Button>
                    </DialogActions>
                </Dialog>
            <Card className={classes.root} style={{backgroundColor:"lightblue"}}>
                <CardContent className={classes.content}>
                    <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} >
                        <img src="https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg"  width="80" height="130" ></img>
                        <Box  display="flex" flexDirection="column" justifyContent="flex-start" m={1} p={1} >
                        <Box m={1} display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1}>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >Member Name : </Typography>
                            </Box>
                            <Box m={1}>

                                <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{memberToDisplay.name}</Typography>
                            </Box>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >Member Email : </Typography>
                            </Box>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{memberToDisplay.email}</Typography>
                            </Box>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >Member Mobile  : </Typography>
                            </Box>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{memberToDisplay.mobile}</Typography>
                            </Box>
                        </Box>
                        <Box m={1} display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1}>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >Gender: </Typography>
                            </Box>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{memberToDisplay.gender}</Typography>
                            </Box>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >Date of Birth : </Typography>
                            </Box>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{new Date(memberToDisplay?.dob?.toString()).toDateString()}</Typography>
                            </Box>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >Address : </Typography>
                            </Box>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{memberToDisplay.address} </Typography>
                            </Box>
                        </Box>
                        <Box m={1} display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1}>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >Team : </Typography>
                            </Box>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{memberToDisplay?.team?.name} &nbsp; TEAM</Typography>
                            </Box>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >Completed Projects </Typography>
                            </Box>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{getProjectsCount(memberToDisplay?.coredetails?.asssigned_projects,"COMPLETED")} &nbsp; Project(s)</Typography>
                            </Box>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"blue" ,fontSize:"15px"}} >Delayed Projects </Typography>
                            </Box>
                            <Box m={1}>
                                <Typography variant="h6" component="h6"  style={{color:"black" ,fontSize:"15px"}} >{getProjectsCount(memberToDisplay?.coredetails?.asssigned_projects,"DELAYED")} &nbsp; Project(s)</Typography>
                            </Box>
                        </Box>
                  </Box>
              </Box>
            </CardContent>
          </Card>
          <Box display="flex" justifyContent="flex-end" m={1} p={1} bgcolor="background.paper">
              {
                  isMemberLoggedIn() &&
                  <React.Fragment>
                        <Box p={1} >
              <Button variant="outlined" color="primary"
                      className={classes.button}
                      startIcon={<LockOpenIcon />}
                       onClick={()=>{setResetDialogOpen(true)}}
              >
                  PASSWORD RESET
              </Button>
            </Box>
                  </React.Fragment>
              }
            <Box p={1} >
              <Button variant="outlined" color="primary"
                      className={classes.button}
                      startIcon={<EditIcon />}
                       onClick={()=>{setOpen(true)}}
              >
                  Edit Member Details
              </Button>
            </Box>
          </Box>
          {memberToDisplay._id && <MemberAppBar memberDetails={memberToDisplay}></MemberAppBar>}

          </div>
  );
}