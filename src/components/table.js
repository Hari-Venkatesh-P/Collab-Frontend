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

function createData(column1, column2, column3, column4, column5 , id) {
  return { column1, column2, column3, column4, column5 , id };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function DataTable(props) {
  const classes = useStyles();
  const rows = []
  var ts
  props.rowdetails.map((row)=>{
        ts = new Date(row.created_at.toString());
        rows.push(createData(row.name.toString().toUpperCase(),row.speciality,row.team_strength,row.project_count,ts.toDateString(),row._id))
  })


   function renderHeading(){
    return props.headings.map((heading,idx) => {
        return(
        <StyledTableCell key={Math.random()}>{heading}</StyledTableCell>
        )
      })
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
          {rows.map((row) => (
            <StyledTableRow key={row.id} onClick={()=>{props.onRowClick(row.id)}}>
              <StyledTableCell component="th" scope="row">
                {row.column1}
              </StyledTableCell>
              <StyledTableCell align="left">{row.column2}</StyledTableCell>
              <StyledTableCell align="left">{row.column3}</StyledTableCell>
              <StyledTableCell align="left">{row.column4}</StyledTableCell>
              <StyledTableCell align="left">{(row.column5)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}