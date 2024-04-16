import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";

import axios from "axios";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation } from "6pp";
import { usernameValidator } from "../utils/validators";
import { userExists } from "../redux/reducers/auth";

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { server } from "../constants/config";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const bio = useInputValidation("");

  const dispatch = useDispatch();

  const avatar = useFileHandler("single"); // coz, we only want to select single file/profile/avatar photo

  const handleLogin = async (e) => {
    e.preventDefault();

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
 
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
 
      dispatch(userExists(data.user));
      toast.success(data.message);
    } 
    catch (error)
     {
       toast.error(error?.response?.data?.message || "Something went wrong");
       console.log(error);
     }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      console.log(server);
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error.response?.data?.message);
      console.log(error);
    }
  };

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
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                    {/* If any error occured while filling username, this will be shown */}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                >
                  Login
                </Button>
                <Typography textAlign={"center"} marginTop={2}>
                  OR
                </Typography>
                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="text"
                  fullWidth
                  onClick={toggleLogin}
                >
                  {" "}
                  Sign up instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5" sx={{ marginTop: "-17px" }}>
                Sign up
              </Typography>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                onSubmit={handleSignUp}
              >
                <Stack position={"relative"} width={"10rem"} marginLeft={"8vw"}>
                  <Avatar
                    sx={{
                      width: "7rem",
                      height: "7rem",
                      objectFit: "contain",
                      marginTop: "6px",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",

                      left: "6.3vw",
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {avatar.error && (
                  <Typography
                    marginLeft={"8vw"}
                    marginTop={"2vh"}
                    marginBottom={"-1vh"}
                    color="error"
                    variant="caption"
                    width={"fit-content"}
                    display={"block"}
                  >
                    {avatar.error}
                    {/* If any error occured while filling username, this will be shown */}
                  </Typography>
                )}

                <TextField
                  required
                  style={{ width: "300px", height: "50px" }} // Targets the input element
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />

                <TextField
                  required
                  style={{ width: "300px", height: "50px" }} // Targets the input element
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                  sx={{
                    marginTop: "5px",
                  }}
                />
                <TextField
                  required
                  style={{ width: "300px", height: "50px" }} // Targets the input element
                  label="Bio"
                  margin="normal"
                  value={bio.value}
                  onChange={bio.changeHandler}
                  variant="outlined"
                  sx={{
                    marginTop: "5px",
                  }}
                />
                <TextField
                  required
                  style={{ width: "300px", height: "50px" }} // Targets the input element
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password.value}
                  onChange={password.changeHandler}
                  sx={{
                    marginTop: "5px",
                  }}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={{ width: "300px", height: "50px" }} // Targets the input element
                  sx={{ marginTop: "1rem" }}
                >
                  Sign up
                </Button>
                <Typography textAlign={"center"} marginTop={2}>
                  OR
                </Typography>
                <Button
                  sx={{ marginTop: "2px" }}
                  variant="text"
                  style={{ width: "300px", height: "50px" }} // Targets the input element
                  onClick={toggleLogin}
                >
                  {" "}
                  Login instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
