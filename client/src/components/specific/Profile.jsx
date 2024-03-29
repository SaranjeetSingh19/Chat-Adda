import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  CalendarMonth as CalendarIcon,
  AlternateEmail as UsernameIcon,
} from "@mui/icons-material";
import moment from "moment"

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 120,
          height: 120,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid #CCCDFF",
        }}
      />
      <Profilecard heading={"Bio"} text={"mah lyf mah rulexx babiee 😎"} />
      <Profilecard heading={"Username"} text={"Saran_.19"} Icon={<UsernameIcon />} />
      <Profilecard heading={"Name"} text={"Saran Singh"} Icon={<FaceIcon /> }/>
      <Profilecard heading={"Joined"} text={moment("2024-03-26T18:30:00.000Z").fromNow()} Icon={<CalendarIcon /> }/>
    </Stack>
  );
};

export default Profile;

export const Profilecard = ({ text, Icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      textAlign={"center"}
      spacing={"1rem"}
      color={"white"}
    >
      {Icon && Icon}

      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography variant="caption" color={"#6F2764"}>
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};
