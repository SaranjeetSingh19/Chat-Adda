import { useInputValidation } from "6pp";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

import { ExitToApp as ExitToAppIcon } from "@mui/icons-material";

const AdminLogin = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const secretKey = useInputValidation("");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(adminLogin(secretKey.value));
  };

  const moveToHome = () => navigate("/");

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to="/admin/dashboard" />;

  return (
    <Box sx={{
      backgroundImage: 'url("/loginBG.jpg")',
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      width: "100%",
    }}>
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
            backgroundColor: "white",
            borderRadius: "10px",
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxHeight: "98%",       bgcolor: "#0C4545", color: "white"
          }}
        >
          {
            <>
              <Typography
                position={"absolute"}
                variant="h5"
                marginBottom={"1.5rem"}
                marginTop={"-0.7rem"}
              >
                Admin Login
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

              <form onSubmit={submitHandler}>
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
                  InputLabelProps={{
                    style: { color: "#dadada" },
                  }}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: "1.5rem" , bgcolor: "skyblue", color: "royalblue"}}
                >
                  Login
                </Button>
              </form>
            </>
          }
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;
