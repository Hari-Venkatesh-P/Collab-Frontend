// Author : Hari Venkatesh P 
// This Component is used to display page not found when route is inappropriate

import React from 'react';
import LoginHeader from "../components/loginheader"
import Grid from '@material-ui/core/Grid';

export default function PageNotFound() {

  return (
    <div >
        <LoginHeader></LoginHeader>
        <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}
 >
     <h2 style={{color:"red"}}> 404 Page Not Found</h2>
  <Grid item xs={5}></Grid>
  </Grid>
    </div>
  );
}