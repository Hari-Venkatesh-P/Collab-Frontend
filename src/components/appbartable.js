import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {isMemberLoggedIn} from "../Auth/authutils";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4863c7",
    color: theme.palette.common.black,
    width : "50",
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function AppBarTable(props) {
  const classes = useStyles();

   function renderHeading(){
    var headings = [] 
     if(props.isProjectFromTeamScreen ){
      headings = ['TITLE' , 'DESCRIPTION','START DATE','END DATE']
      return headings.map((heading,idx) => {
        return(
        <StyledTableCell key={Math.random()}>{heading}</StyledTableCell>
        ) 
      })
     }else if(props.isTeamMembersFromTeamScreen ){
      headings = ['NAME' , 'EMAIL' , 'MOBILE']
     return headings.map((heading,idx) => {
       return(
       <StyledTableCell key={Math.random()}>{heading}</StyledTableCell>
       )
     })
    }else if(props.isAssignedProject){
       headings = ['TITLE' , 'DESCRIPTION' , 'START_DATE','END_DATE','STATUS']
      return headings.map((heading,idx) => {
        return(
        <StyledTableCell key={Math.random()}>{heading}</StyledTableCell>
        )
      })
     }else if(props.isNewProjects){
      headings = ['TITLE' , 'DESCRIPTION' , 'START_DATE','END_DATE','CREATED_AT']
     return headings.map((heading,idx) => {
       return(
       <StyledTableCell key={Math.random()}>{heading}</StyledTableCell>
       )
     })
    }else if(props.isTeamDetailsFromMemberScreen){
      headings = ['TEAM' , 'SPECIALITY' , 'TEAM_STRENGTH','PROJECT_COUNT']
     return headings.map((heading,idx) => {
       return(
       <StyledTableCell key={Math.random()}>{heading}</StyledTableCell>
       )
     })
    }else if(props.isProjectFromMemberScreen){
      headings = ['TITLE' , 'DESCRIPTION','START DATE','END DATE']
      return headings.map((heading,idx) => {
        return(
        <StyledTableCell key={Math.random()}>{heading}</StyledTableCell>
        )
      })
     }else if(props.isTeamFromViewProjectScreen){
      headings = ['NAME' , 'SPECIALITY','DESCRIPTION']
      return headings.map((heading,idx) => {
        return(
        <StyledTableCell key={Math.random()}>{heading}</StyledTableCell>
        )
      })
     }else if(props.isMemberFromViewProjectScreen){
      headings = ['NAME' , 'EMAIL','MOBILE']
      if(!isMemberLoggedIn()){
        headings.push('REMOVE')
      }
      return headings.map((heading,idx) => {
        return(
        <StyledTableCell key={Math.random()}>{heading}</StyledTableCell>
        )
      })
     }
    }

    function renderBody(){
      if(props.isProjectFromTeamScreen){
        return props.tableDetails.coredetails.assigned_projects.map((project,idx) => {
          return(
            <StyledTableRow key={project.title}>
            <StyledTableCell component="th" scope="row">
              {project.title}
            </StyledTableCell>
            <StyledTableCell align="left">{project.description}</StyledTableCell>
            <StyledTableCell align="left">{new Date(project.start_date.toString()).toDateString()}</StyledTableCell>
            <StyledTableCell align="left">{new Date(project.end_date.toString()).toDateString()}</StyledTableCell>
          </StyledTableRow>
          )
        })
       }else if (props.isTeamMembersFromTeamScreen) {
        return props.tableDetails.coredetails &&  props.tableDetails.coredetails.team_members.map((member,idx) => {
          return(
            <StyledTableRow key={member.email} >
            <StyledTableCell component="th" scope="row">
              {member.name}
            </StyledTableCell>
            <StyledTableCell align="left">{member.email}</StyledTableCell>
            <StyledTableCell align="left">{member.mobile}</StyledTableCell>
          </StyledTableRow>
          )
        })
       }else if (props.isAssignedProject && props.tableDetails) {
         return props.tableDetails.map((current)=>{
           if(current.status !=="CREATED"){
            return(
              <StyledTableRow key={current.title} onClick={()=>{props.toggleView(current._id)}} >
              <StyledTableCell component="th" scope="row">
                {current.title.toString().toUpperCase()} &nbsp; PROJECT 
              </StyledTableCell>
              <StyledTableCell align="left">{current.description}</StyledTableCell>
              <StyledTableCell align="left">{new Date(current.start_date).toDateString()} </StyledTableCell>
              <StyledTableCell align="left">{new Date(current.end_date).toDateString()}</StyledTableCell>
              <StyledTableCell align="left">{current.status.toString().toUpperCase()}</StyledTableCell>
            </StyledTableRow>
            )
           }
         })
       }else if (props.isNewProjects && props.tableDetails.length!=0) {
        return props.tableDetails.map((current)=>{
          if(current.status === "CREATED"){
            return(
              <StyledTableRow key={current.title} onClick={()=>{props.toggleView(current._id)}}>
              <StyledTableCell component="th" scope="row">
                {current.title.toString().toUpperCase()} &nbsp; PROJECT 
              </StyledTableCell>
              <StyledTableCell align="left">{current.description}</StyledTableCell>
              <StyledTableCell align="left">{new Date(current.start_date).toDateString()} </StyledTableCell>
              <StyledTableCell align="left">{new Date(current.end_date).toDateString()}</StyledTableCell>
            <StyledTableCell align="left">{current.created_at}</StyledTableCell>
            </StyledTableRow>
            )
          }
        })
     }else if(props.isTeamDetailsFromMemberScreen){
        if(props.tableDetails.coredetails && props.tableDetails.coredetails.team) {
          return(
            <StyledTableRow key={props.tableDetails.coredetails.team.name} >
            <StyledTableCell component="th" scope="row">
              {props.tableDetails.coredetails.team.name} &nbsp; TEAM 
            </StyledTableCell>
            <StyledTableCell align="left">{props.tableDetails.coredetails.team.speciality}</StyledTableCell>
            <StyledTableCell align="left">{props.tableDetails.coredetails.team.team_strength} &nbsp; MEMBERS</StyledTableCell>
            <StyledTableCell align="left">{props.tableDetails.coredetails.team.project_count}  &nbsp; PROJECTS</StyledTableCell>
          </StyledTableRow>
          )
        }
       }else if(props.isProjectFromMemberScreen){
        if(props.tableDetails.coredetails && props.tableDetails.coredetails.assigned_projects) {
          return props.tableDetails.coredetails.assigned_projects.map((project,idx) => {
            return(
              <StyledTableRow key={project.title}>
              <StyledTableCell component="th" scope="row">
                {project.title}
              </StyledTableCell>
              <StyledTableCell align="left">{project.description}</StyledTableCell>
              <StyledTableCell align="left">{new Date(project.start_date.toString()).toDateString()}</StyledTableCell>
              <StyledTableCell align="left">{new Date(project.end_date.toString()).toDateString()}</StyledTableCell>
            </StyledTableRow>
            )
          })
        }
       }else if(props.isTeamFromViewProjectScreen && props.tableDetails?.coredetails){
        return props.tableDetails.coredetails.team_assigned.map((team,idx) => {
          return(
            <StyledTableRow key={team.name} >
            <StyledTableCell component="th" scope="row">
              {team.name.toString().toUpperCase()} &nbsp; TEAM 
            </StyledTableCell>
            <StyledTableCell align="left">{team.speciality}</StyledTableCell>
            <StyledTableCell align="left">{team.description}</StyledTableCell>

          </StyledTableRow>
          )
        })
       }else if(props.isMemberFromViewProjectScreen && props.tableDetails?.coredetails){
        return  props.tableDetails.coredetails.member_assigned.map((member,idx) => {
          return(
            <StyledTableRow key={member.name} >
            <StyledTableCell component="th" scope="row">
              {member.name.toString().toUpperCase()} 
            </StyledTableCell>
            <StyledTableCell align="left">{member.email}</StyledTableCell>
            <StyledTableCell align="left">{member.mobile}</StyledTableCell>
            {
              !(isMemberLoggedIn()) &&
              <React.Fragment>
                <IconButton edge="start"
                      color="inherit"
                      aria-label="Delete Icon"><DeleteIcon onClick={()=>{props.makeDeleteMemberFromProject(member._id)}}/></IconButton>
              </React.Fragment>
            }
            
            
          </StyledTableRow>
          )
        })
       }
    }

  return (
    <TableContainer component={Paper}>
      <Table style={{cursor:"pointer"}} className={classes.table} aria-label="customized table">
        <TableHead style={{cursor:"pointer"}}>
          <TableRow>
            {renderHeading()}
          </TableRow>
        </TableHead>
        <TableBody>
            {renderBody()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}