import React, { memo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { Link } from "../styles/StyledComponents";
import { motion } from "framer-motion";

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
    sx={{
      color: "white",
      '&:hover': {
      color: 'orange', // Change to your desired hover effect
    },
    }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      {/* "onContextMenu" is get triggered when we right click and see options of menus */}
      <motion.div
      
        initial={{ opacity: 0, y: "-100%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "#1F89A3" : "unset",
          color: sameSender ? "orange" : "unset",
          position: "relative",
        }}
        
      >
        <AvatarCard avatar={avatar} />

        <Stack
         
        >
          <Typography>{name}</Typography>
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
              backgroundColor: "lightgreen",
            }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
// we wrapped it inside memo because we do not want our component to be re rendered
//  again and again, it will only be re rendered now if any props inside (ChatItem) it will get change
