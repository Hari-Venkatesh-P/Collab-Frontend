// Author : Hari Venkatesh P 
// This Component is used a for rendering select for selecting member names while assigning the project

import React  from 'react';
import {useDispatch} from "react-redux"
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {ASSIGN_PROJECTS} from "../redux/actions/ProjectActions"


export default function MemberMenu (props) {
    
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