import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { ditu } from "../components/styles/StyledComponents";
import { ExitToApp as ExitToAppIcon } from "@mui/icons-material";
 
const Ulop2 = () => {
    
    const navigate = useNavigate()
    const moveToHome = () => navigate("/");
 
    return (
        <Box sx={{ bgcolor: "#D1FFBD" }}>
          <Container
            component={"main"}
            maxWidth="xs"
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={7}
              sx={{
                backgroundColor: "pink",
                borderRadius: "10px",
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "7rem",
                width: "17rem",
              }}
            >
              <Typography
                position={"absolute"}
                variant="h5"
                marginBottom={"1.5rem"}
              >
               Unga Bunga P.M {ditu}
              </Typography> 
    
              <IconButton
            sx={{
              position: "relative",
              left: "11rem",
              bottom: "2rem",
              color: "gray",
            }}
            onClick={moveToHome}
          >
            <ExitToAppIcon />
          </IconButton>
      
            </Paper>
          </Container>
        </Box>
      );
}

export default Ulop2