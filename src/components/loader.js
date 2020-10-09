// Author : Hari Venkatesh P 
// This Component is used for displaying loader while query is executing

import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));


function Loader() {
    const classes = useStyles();
    return (
      <div style={{margin:"20px"}}>
                <div style={{marginTop:"20px"}}>
                  <Backdrop className={classes.backdrop} open={true}>
                    <CircularProgress color="primary" />
                  </Backdrop>
                </div>
        </div>
    );
  }

export default Loader;