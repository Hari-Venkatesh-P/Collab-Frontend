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

  const useStyles = makeStyles((theme) => ({
    table: {
      // minWidth: 900,
    },
    deleteicon: {
      marginRight: theme.spacing(2),
    },
  }));

export default function DataTable(props) {
  const classes = useStyles();

  function renderHeading(){
    var headings = [] 
    if(props.isTeam){
      headings = ['Team Name','Team Speciality','Team Strength','Total Projects','Team Created At']
      return headings.map((heading,idx) => {
        return(
        <StyledTableCell key={Math.random()}>{heading}</StyledTableCell>
        )
      })
    }else{
        headings = ['Member Name' ,'Mobile', 'Email' ,'Team', 'Total Projects', 'Delete']
        return headings.map((heading,idx) => {
          return(
            <StyledTableCell key={Math.random()}>{heading}</StyledTableCell>
          )
        })
      }
    }
    function renderBody(){
      if(props.isTeam && props.tableDetails.length!=0){
        return props.tableDetails.map((team,idx) => {
          return(
            <StyledTableRow key={team.title} onClick={()=>{props.onRowClick(team._id)}}>
              <StyledTableCell component="th" scope="row"> {team?.name.toString().toUpperCase()}</StyledTableCell>
              <StyledTableCell align="left">{team?.speciality}</StyledTableCell>
              <StyledTableCell align="left">{team?.team_strength}</StyledTableCell>
              <StyledTableCell align="left">{team?.project_count}</StyledTableCell>
            <StyledTableCell align="left">{new Date(team?.created_at.toString()).toDateString()}</StyledTableCell>

          </StyledTableRow>
          )
        })
       }if(!props.isTeam &&  props.tableDetails.length!=0 ){
        return props.tableDetails.map((member,idx) => {
          console.log(member)
          return(
            <StyledTableRow key={member?.name} >
                <StyledTableCell component="th" scope="row" onClick={()=>{props.onRowClick(member._id)}}> {member?.name} </StyledTableCell>
                <StyledTableCell align="left" onClick={()=>{props.onRowClick(member._id)}}>{member?.mobile}</StyledTableCell>
                <StyledTableCell align="left" onClick={()=>{props.onRowClick(member._id)}}>{member?.email}</StyledTableCell>
                <StyledTableCell align="left" onClick={()=>{props.onRowClick(member._id)}}>{member?.team.name}</StyledTableCell>
                <StyledTableCell align="left" onClick={()=>{props.onRowClick(member._id)}}>{member?.project_count}</StyledTableCell>
                    <IconButton edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="Delete Icon"><DeleteIcon onClick={()=>{props.makeDeletememberMutation(member._id)}}/></IconButton>
            </StyledTableRow>
          )
        })
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