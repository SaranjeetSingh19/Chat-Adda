import React, { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const moveToSecreacy = () => navigate("/pm");

  const [lastTapTime, setLastTapTime] = useState(0);

  const handleTouchEnd = () => {
    const currentTime = new Date().getTime();
    const timeSinceLastTap = currentTime - lastTapTime;

    if (timeSinceLastTap < 300) {
      // Double-tap detected
      moveToSecreacy();
    } else {
      // Single tap detected
      setLastTapTime(currentTime);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("/chat_Bg.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
      }}
      height={"100%"}
    >
      <Typography
        p={"2rem"}
        variant="h5"
        textAlign={"center"}
        sx={{
          color: "white",
          fontWeight: 700,
        }}
      >
        Select a Friend to Chat ! 
        <span onDoubleClick={moveToSecreacy} onTouchEnd={handleTouchEnd}>
          🤍
        </span>
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
