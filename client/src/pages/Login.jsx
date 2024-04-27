import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
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
import React, { useState } from "react";

import { useFileHandler, useInputValidation } from "6pp";
import axios from "axios";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { server } from "../constants/config";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoadings, setIsLoadings] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const bio = useInputValidation("");

  const dispatch = useDispatch();

  const avatar = useFileHandler("single"); // coz, we only want to select single file/profile/avatar photo

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");
    setIsLoadings(true);
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
      toast.success(data.message + "🫡💮", {
        id: toastId,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid Username or Password 🙅🏻‍♂️",
        {
          id: toastId,
        }
      );
    } finally {
      setIsLoadings(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing in...🔃");

    setIsLoadings(true);

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
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message + "😉", {
        id: toastId,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Upload Profile Picture 😡",
        {
          id: toastId,
        }
      );
    } finally {
      setIsLoadings(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("/loginBG.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
      }}
    >
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
            bgcolor: "#023F41",
            color: "#A6D7DE",
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
                  InputLabelProps={{
                    style: { color: "orange" },
                  }}
                  InputProps={{
                    style: { color: "white" }, // Color of the input text
                  }}
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
                  InputLabelProps={{
                    style: { color: "orange" },
                  }}
                  InputProps={{
                    style: { color: "white" }, // Color of the input text
                  }}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: "1rem", color: "white" }}
                  disabled={isLoadings}
                >
                  Login
                </Button>
                <Typography textAlign={"center"} marginTop={2}>
                  OR
                </Typography>
                <Button
                  sx={{ marginTop: "1rem", color: "white" }}
                  variant="text"
                  fullWidth
                  onClick={toggleLogin}
                  disabled={isLoadings}
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
                  InputLabelProps={{
                    style: { color: "orange" },
                  }}
                  InputProps={{
                    style: { color: "white" }, // Color of the input text
                  }}
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
                  InputLabelProps={{
                    style: { color: "orange" },
                  }}
                  InputProps={{
                    style: { color: "white" }, // Color of the input text
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
                  InputLabelProps={{
                    style: { color: "orange" },
                  }}
                  InputProps={{
                    style: { color: "white" }, // Color of the input text
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
                  InputLabelProps={{
                    style: { color: "orange" },
                  }}
                  InputProps={{
                    style: { color: "white" }, // Color of the input text
                  }}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={{ width: "300px", height: "50px" }} // Targets the input element
                  sx={{ marginTop: "1rem" }}
                  disabled={isLoadings}
                >
                  Sign up
                </Button>
                <Typography textAlign={"center"} marginTop={2}>
                  OR
                </Typography>
                <Button
                  sx={{ marginTop: "2px" }}
                  variant="text"
                  style={{ width: "300px", height: "50px", color: "white" }} // Targets the input element
                  onClick={toggleLogin}
                  disabled={isLoadings}
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
