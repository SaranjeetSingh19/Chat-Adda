import { useInputValidation } from '6pp'
import { Box, Button, Container,  Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Navigate } from 'react-router-dom'
 

const AdminLogin = () => {

    const secretKey = useInputValidation("")

    const isAdmin = true

    const  submitHandler = (e) => {
        e.preventDefault();
        console.log("Submit btn");
    }
    
    if(isAdmin) return <Navigate to="/admin/dashboard"/> 

  return (
    <Box sx={{ backgroundColor: "#ADD8E6  " }}>
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
        elevation={3}
        sx={{
          backgroundColor: "#F5F5F5  ",
          borderRadius: "10px",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxHeight: "98%",
        }}
      >
        { 
          <>
            <Typography variant="h5" marginBottom={"1.5rem"}>Admin Login</Typography>
            <form  
             onSubmit={submitHandler}>
              
              {/* {username.error && (
                <Typography color="error" variant="caption">
                  {username.error}
                </Typography>
              )} */}
              {/* If any error occured while filling username, this will be shown */}
              <TextField
                required
                fullWidth
                label="Secret key"
                variant="outlined"
                type="password"
                value={secretKey.value}
                onChange={secretKey.changeHandler}
               
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                sx={{ marginTop: "1.5rem" }}
              >
                Login
              </Button>
              
           
            </form>
          </>
      
         
        }
      </Paper>
    </Container>
  </Box>
  )
}

export default AdminLogin