import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/shared/FileMenu";
import { sampleMessage } from "../components/constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const Chat = () => {
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);

  const user = {
    _id: "rdksfkds",
    name: "Siren",
  };

  return (
    <>
      <Stack
        ref={containerRef}
        padding={"1rem"}
        spacing={"1rem"}
        backgroundColor={"#C8FBE8"}
        height={"90%"}
        sx={{
          overflow: "hidden",
          overflow: "auto",
        }}
      >
        {sampleMessage.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              rotate: "30deg",
            }}
            ref={fileMenuRef}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder="Message..." />

          <IconButton
            type="submit"
            sx={{
              backgroundColor: "#42A992",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                backgroundColor: "seagreen",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </>
  );
};

export default AppLayout()(Chat);
