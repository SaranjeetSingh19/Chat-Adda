import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationIcon,
  Person as PersonIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import moment from "moment";
import { SearchField } from "../../components/styles/StyledComponents";
import { CurveButton } from "../../components/styles/StyledComponents";
import { DognutChart, LineChart } from "../../components/specific/Charts";

const Dashboard = () => {
  const appBar = (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
        <SearchField />
        <CurveButton>
          <SearchIcon sx={{ color: "white", fontSize: "1.8rem" }} />
        </CurveButton>
        <Box flexGrow={2}>
          <Typography
            display={{
              xs: "none",
              lg: "block",
            }}
            color={"rgba(0,0,0,0.7)"}
            textAlign={"center"}
          >
            {moment().format("dddd, D MMMM YYYY")}
          </Typography>
        </Box>
        <NotificationIcon sx={{ fontSize: "2rem" }} />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems={"center"}
      margin={"2rem 0"}

    >
      <Widget title={"Users"} value={10} icon={<PersonIcon />} />
      <Widget title={"Chats"} value={3} icon={<GroupIcon />} />
      <Widget title={"Messages"} value={456} icon={<MessageIcon />} />
    </Stack>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>
        {appBar}

        <Stack direction={{
          xs: "column",
          lg: "row"
        }} spacing={"2rem"} flexWrap={"wrap"} justifyContent={"center"}
        alignItems={{
          xs: "center",
          lg: "stretch"
        }}
        sx={{gap: "2rem"}}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3,5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem", // KHUD SE KARA HAI
              // height: "25rem",
            }}
          >
            <Typography margin={"2rem 0"} variant="h4">
              Last message
            </Typography>
        <LineChart  value={[14,55,32,9,88,1]}/>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: " center",
              width: {
                xs: " 100%",
                sm: "50%",
              },
              position: "relative",
              widhth: "100%",
              maxWidth: "25rem",
              
            }}
          >
           <DognutChart 
           labels={["Single chats", "Group chats"]} value={[23,66]}/>
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              widhth={"100%"}
              height={"100%"}
            >
              <GroupIcon /> <Typography>Vs</Typography> <PersonIcon />
            </Stack>
          </Paper>
        </Stack>

        {Widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, icon }) => (
  <Paper
  elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
      bgcolor: "black",
      color: "white"
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
      sx={{
        color: "white",
        borderRadius: "50%",
        border: "5px solid white",
        width: "5rem",
        height: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      >{value}</Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
)

export default Dashboard;
