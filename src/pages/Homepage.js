import React from 'react';
import { Box, Button, Typography } from "@mui/material"

import { Link } from 'react-router-dom';



const Homepage = () => {

    return (
        <div className="home">

            <Box maxWidth="xl">
                <div className="left">
                    <h1 className="hero-line">GRAB YOUR TICKET</h1>
                    <p className="subhero">and create everlasting memories</p>
                    <Link class="fancy" to="/events">
                        <span className="top-key"></span>
                        <span className="text">Buy Tickets</span>
                        <span className="bottom-key-1"></span>
                        <span className="bottom-key-2"></span>
                    </Link>
                </div>
            </Box>
        </div>
    )
}

export default Homepage