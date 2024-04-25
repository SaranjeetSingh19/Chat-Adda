import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material'

const Home = () => {
  return (
    <Box 
    
    sx={{
      backgroundImage: 'url("/chat_Bg.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '100%',
    }}
    height={"100%"}>
      <Typography p={"2rem"} variant='h5' textAlign={"center"}
      sx={{
        color: "white",
        fontWeight: 700
      }}
      >
        Select a Friend to Chat ! 🤍 
      </Typography>
    </Box>
  )
}

export default AppLayout()(Home)