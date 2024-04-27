import React from 'react';
import { Typography, Container, Box, Link, Button } from '@mui/material';
import {Error as ErrorIcon} from "@mui/icons-material"

const errorPageStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#003740', // Your custom theme color
    color: '#fff', // White text
    padding: '2rem',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  titleIcon: {
    fontSize: '3rem',
    marginRight: '1rem',
    color: '#f0f8ff', // Light gray icon
  },
  title: {
    fontSize: '2.5rem',
  },
  content: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    lineHeight: 1.5, // Adjust line height for better readability
  },
  button: {
    marginTop: '1rem',
    backgroundColor: '#f0f8ff', // Light gray button background
    color: '#003740', // Your theme color text
    border: 'none',
    borderRadius: '5px',
    padding: '.75rem 1.5rem',
    cursor: 'pointer',
    fontWeight: 'bold', // Add boldness for emphasis
  },
  '@media (max-width: 600px)': { // Responsive styles for smaller screens
    '.titleContainer': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    '.titleIcon': {
      marginBottom: '1rem',
    },
    '.title': {
      fontSize: '2rem',
    },
  },
};

const NotFound = () => {
  return (
    <Container maxWidth="md" style={errorPageStyles.root}>
      <Box sx={errorPageStyles.titleContainer}>
      <ErrorIcon sx={{fontSize: "5rem"}} /> 
        <i className="material-icons" style={errorPageStyles.titleIcon}>
        Error
        </i>
        <Typography variant="h2" style={errorPageStyles.title}>
          404: Page Not Found
        </Typography>
      </Box>
      <Typography variant="body1" style={errorPageStyles.content}>
      We can't find the page that you're looking for.
      Please Check the URL and Try again!
      </Typography>
      <Link href="/" underline="none" style={errorPageStyles.button}>
        Go Home
      </Link>
    </Container>
  );
};

export default NotFound;
