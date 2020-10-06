import React , {useEffect, useState} from 'react';
import {useSelector,useDispatch} from "react-redux"
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ASSIGN_PROJECTS} from "../redux/actions/ProjectActions"


export default function MemberMenu (props) {
    
    console.log(props.teamNames)

    
    const dispatch = useDispatch()

   const handleMemberChange = (e) =>{
     if(e.target.value && props.teamId){
      dispatch({type:ASSIGN_PROJECTS,payload:{memberId : e.target.value , teamId : props.teamId}})
     }
   }



    return(
        <div>
            <FormControl >
               <Select onChange={(e)=>{handleMemberChange(e)}}> 
              {
                 Object.keys(props.teamNames).map(function(key) {
                  return <MenuItem  value={props.teamNames[key]._id} name={props.teamNames[key].name}>{props.teamNames[key].name.toString().toUpperCase() } </MenuItem >
                })
              }
            </Select>
          </FormControl>
        </div>
    )
}