// Author : Hari Venkatesh P 
// This Component is the login Page

import React ,{ useState}from 'react';
import { useMutation   } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LoginHeader from "../components/loginheader";
import { Box } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { useHistory } from "react-router";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import {LOGIN_MEMBER} from "../graphql/members/membermutation"
import {setTokens} from "../Auth/authutils"

const LoginScreen = () =>{

    const history = useHistory();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [visiblity,setVisiblity]  = useState(false)
    const [showType,setShowtype] = useState('password')


   const  handleVisiblity =  () => {
    setVisiblity(!visiblity)
    if(showType=="password"){
      setShowtype("text")
    }else{
      setShowtype("password")
    }
    }
    let icon = null; 
    if (visiblity) {
        icon = <VisibilityIcon style={{color:"blue",cursor:"pointer"}} onClick={()=>{handleVisiblity()}}/>;
    } else {
        icon = <VisibilityOffIcon  style={{color:"blue",cursor:"pointer"}} onClick={()=>{handleVisiblity()}}/>;
    }


    const [LoginMember,  addMemberMutationData ] = useMutation(LOGIN_MEMBER);

    const makeLoginMemberMutation = () =>{
      LoginMember({ variables: { email:email,password:password} })
      .then(result=>{
          if(result.data.login){
              setTokens(result.data.login)
              setEmail('')
              setPassword('')
              history.replace("/projects")
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

    return(
        <div>
                <LoginHeader></LoginHeader>
                <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}
 >

  <Grid item xs={5}>
  <Card style={{borderColor:"#d0d5db",borderStyle:"solid",borderWidth:"5px"}}>
      <CardContent>
                    <Box display="flex" p={1} m={1} flexDirection="row" justifyContent="center"  >
                          <Box   style={{color:"blue"}}>
                                <Typography variant="p" component="p"> Collabs for collaborators</Typography>                          
                          </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="flex-start"  >
                          <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Email :  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</InputLabel>
                          </Box>
                          <Box p={1} >
                            <TextField error={ (email === "") ? true :false}
                                onChange={(e)=>{setEmail(e.target.value)}}
                                value={email}
                                id="standard-error-helper-text"
                                 placeholder="Email"
                                 helperText={(email==="") ? "Email is mandatory" : ""}
                             />
                          </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="flex-start"  >
                          <Box p={1} >
                              <InputLabel htmlFor="component-simple"  style={{color:"black"}}> Password :  </InputLabel>
                          </Box>
                          <Box p={1} >
                            <TextField error={ (password === "") ? true :false}
                                onChange={(e)=>{setPassword(e.target.value)}}
                                value={password}
                                type={showType}
                                id="standard-error-helper-text"
                                 placeholder="Password"
                                 InputProps={{
                                  endAdornment: icon
                                }}
                                 helperText={(password==="") ? "Password is mandatory" : ""}
                             />
                          </Box>
                    </Box>
                    
      </CardContent>
    </Card>
    <Box display="flex"  m ={2} flexDirection="row" justifyContent="center">
    <Button size="small" variant="contained" color="primary"
                                 disabled = {(email === "" || password ==="" ) ? true : false}
              onClick={()=>{makeLoginMemberMutation()}}
            >
          Login
        </Button>     
                    </Box>
  </Grid>      
    </Grid>
    </div>
    )
}

export  default LoginScreen;