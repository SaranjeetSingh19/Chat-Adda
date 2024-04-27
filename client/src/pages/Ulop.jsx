import { ExitToApp as ExitToAppIcon } from "@mui/icons-material";
import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Ulop = () => {
  const navigate = useNavigate();

  const moveToHome = () => navigate("/");

  const spc = () => navigate("/PM<3");

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const icons = [];


  for (let i = 0; i < 110; i++) {
    const randomLeft = getRandomNumber(0, window.innerWidth - 48); // Adjust 48 based on the icon size
    const randomBottom = getRandomNumber(0, window.innerHeight - 48); // Adjust 48 based on the icon size

    icons.push(
      <IconButton
        key={i}
        sx={{
          position: 'absolute',
          left: `${randomLeft}px`,
          bottom: `${randomBottom}px`,
          color: 'gray',
        }}
        onClick={moveToHome}  
      >
        <ExitToAppIcon />
      </IconButton>
    );
  }


  return (
    <Box sx={{ bgcolor: "#D1FFBD" , width: "100vw", height: "100vh"}}>
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
            height: "6rem",
            width: "10rem",
          }}
        >
          <Typography
            position={"absolute"}
            variant="h5"
            marginBottom={"1.5rem"}
          >
            P.M
          </Typography>

          <IconButton
            sx={{
              position: "relative",
              left: "11rem",
              bottom: "2rem",
              color: "gray",
            }}
            onClick={spc}
          >
            <ExitToAppIcon />
          </IconButton>
          <>
      {icons}
    </>

        



        </Paper>
      </Container>
    </Box>
  );
};

export default Ulop;
