import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/shared/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../components/constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId }); // hook will not get called (skip) if chatId doesn't exist

  const oldMsgsChunk = useGetMessagesQuery({ chatId, page });
  // Above RTKQuery api hook will fetch the getMessages and pass in below infinite scroll bar, whenever scrollBar reaches it's limit it will then fetch again from the above api
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMsgsChunk?.data?.totalPages,
    page,
    setPage,
    oldMsgsChunk?.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMsgsChunk.isError, error: oldMsgsChunk.error },
  ];

  console.log(oldMsgsChunk?.data);

  const members = chatDetails?.data?.chat?.members;

  const socket = getSocket();

  console.log("oldMessages :=", oldMessages);

  const allMessages = [...oldMessages, ...messages];

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // This(emit) will send(trigger) message through FORM
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const newMessageHandler = useCallback((data) => {
    setMessages((prev) => [...prev, data.message]);
  }, []);

  const eventHandler = { [NEW_MESSAGE]: newMessageHandler };

  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
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
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
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

          <InputBox
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

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
