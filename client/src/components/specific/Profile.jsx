import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  CalendarMonth as CalendarIcon,
  AlternateEmail as UsernameIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";

const Profile = ({ user }) => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 120,
          height: 120,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid #CCCDFF",
        }}
      />
      <Profilecard heading={"Bio"} text={user?.bio} />
      <Profilecard
        heading={"Username"}
        text={user?.username}
        Icon={<UsernameIcon />}
      />
      <Profilecard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      <Profilecard
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon />}
      />
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
        <Typography color={"#42A992"} variant="body1">
          {text}
        </Typography>
        <Typography variant="caption" color={"#6F2764"}>
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};
