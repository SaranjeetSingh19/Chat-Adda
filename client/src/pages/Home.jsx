import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material'

const Home = () => {
  return (
    <Box bgcolor={"#C8FBE8"} height={"100%"}>
      <Typography p={"2rem"} variant='h5' textAlign={"center"}>
        Select a friend to chat! 🥰👉🏻👈🏻
      </Typography>
    </Box>
  )
}

export default AppLayout()(Home)