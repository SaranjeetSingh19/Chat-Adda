import React, { memo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { Link } from "../styles/StyledComponents"

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      {/* "onContextMenu" is get triggered when we right click and see options of menus */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "#42A992" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
          
        }}
      >
        
        <AvatarCard avatar={avatar} />
        
        <Stack>
          <Typography >{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#00FF01",
            }}
          />
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
// we wrapped it inside memo because we do not want our component to be re rendered
//  again and again, it will only be re rendered now if any props inside (ChatItem) it will get change
