import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4863c7",
    color: theme.palette.common.black,
    fontSize: 16,
  },
  body: {
    fontSize: 16,
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
     if(props.isProject){
      headings = ['TITLE' , 'DESCRIPTION','START DATE','END DATE']
      return headings.map((heading,idx) => {
        return(
        <StyledTableCell key={Math.random()}>{heading}</StyledTableCell>
        )
      })
     }else if(props.isTeamMembers){
       headings = ['NAME' , 'MOBILE' , 'EMAIL']
      return headings.map((heading,idx) => {
        return(
        <StyledTableCell key={Math.random()}>{heading}</StyledTableCell>
        )
      })
     }else{
      headings = ['NAME' , 'SPECIALITY' , 'TEAM_STRENGTH' , 'TOTAL PROJECTS']
      return headings.map((heading,idx) => {
        return(
        <StyledTableCell key={Math.random()}>{heading}</StyledTableCell>
        )
      })
     }
    }

    function renderBody(){
      if(props.isProject){
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
       }else if (props.isTeamMembers) {
        return props.tableDetails.coredetails &&  props.tableDetails.coredetails.team_members.map((member,idx) => {
          return(
            <StyledTableRow key={member.email}>
            <StyledTableCell component="th" scope="row">
              {member.name}
            </StyledTableCell>
            <StyledTableCell align="left">{member.email}</StyledTableCell>
            <StyledTableCell align="left">{member.mobile}</StyledTableCell>
          </StyledTableRow>
          )
        })
       }else{
        if(props.tableDetails.coredetails && props.tableDetails.coredetails.team) {
          return(
            <StyledTableRow key={props.tableDetails.coredetails.team.name} >
            <StyledTableCell component="th" scope="row">
              {props.tableDetails.coredetails.team.name.toString} &nbsp; TEAM 
            </StyledTableCell>
            <StyledTableCell align="left">{props.tableDetails.coredetails.team.speciality}</StyledTableCell>
            <StyledTableCell align="left">{props.tableDetails.coredetails.team.team_strength} &nbsp; MEMBERS</StyledTableCell>
            <StyledTableCell align="left">{props.tableDetails.coredetails.team.project_count}  &nbsp; PROJECTS</StyledTableCell>
          </StyledTableRow>
          )
        }
       }
    }

  return (
    <TableContainer component={Paper}>
      <Table style={{cursor:"pointer"}} className={classes.table} aria-label="customized table">
        <TableHead>
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