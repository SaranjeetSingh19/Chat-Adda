import React, { useState } from "react";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  Close as CloseIcon,
  ExitToApp as ExitToAppIcon,
  Group as GroupIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";

import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunks/admin";

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: white;
  padding: 1rem;
  fontweight: 700;
  &:hover {
    color: gray;
  }
`;

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

const SideBar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(adminLogout())
  }

  return (
    <Stack
      width={w}
      direction={"column"}
      p={"3rem"}
      spacing={"3rem"}
      sx={{
        bgcolor: "black",
        height: "100%",
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: "#F2E5E5", fontWeight: "700" }}
        textTransform={"uppercase"}
      >
        Admin
      </Typography>

      <Stack spacing={"2rem"}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: "white",
                color: "black",
                borderRadius: "2rem",
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
      </Stack>
      <Link onClick={logoutHandler}>
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
          <ExitToAppIcon />
          <Typography >Logout</Typography>
        </Stack>
      </Link>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {

  const {isAdmin} = useSelector(state => state.auth)
  

  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
 
  const handleClose = () => {
    setIsMobile(false);
  };

  if(!isAdmin) return <Navigate  to="/adminpanel2590" />

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: {
            xs: "none",
            md: "block ",
          },
        }}
      > <SideBar /></Grid>

      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: "#dadada",
        }}
      >
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <SideBar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
