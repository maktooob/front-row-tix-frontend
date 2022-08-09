import React from 'react';
import { Box, Button, Typography } from "@mui/material"


import ReactPlayer from 'react-player';



const Homepage = () => {

    return(
        <div>
            <h1>FRONT ROW TIX</h1>

            <section>
      <ReactPlayer
        url
        playing
        loop
        muted
        width="100%"
        height="100%"
      />
      <div>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="#fff"
        >
          <Typography variant="h3" component="h1">
            Title Goes Here
          </Typography>
          <Button color="primary" variant="contained">
            Click Me
          </Button>
        </Box>
      </div>
    </section>

        </div>
    )
}

export default Homepage