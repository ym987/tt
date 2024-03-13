import React from 'react';
import Grid from "@mui/material/Grid";
import ProgressDisplay from "./progressDisplay";
import MainProgress from "./mainProgress";


const drawerWidth = '25%';



const MyComponent = ( { ttID, mtchingId }) => {


  return (
    <Grid container>
      <Grid item width={drawerWidth} position={"fixed"} right={"0%"} >
        {ttID && <MainProgress ttID={ttID} mtchingId={mtchingId}/>}
        
      </Grid>
      <Grid item marginRight={drawerWidth} >
        {ttID && <ProgressDisplay ttID={ttID} />}
      </Grid>
    </Grid>
  );
};

export default MyComponent;