import { useInfiniteScrollTop } from "6pp";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Skeleton, Stack } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ALERTS,
  CHAT_EXITED,
  CHAT_JOINED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../components/constants/events";
import AppLayout from "../components/layout/AppLayout";
import { TypingLoader } from "../components/layout/Loader";
import FileMenu from "../components/shared/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponents";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { removeNewMessageAlert } from "../redux/reducers/chat";
import { setIsFileMenu } from "../redux/reducers/misc";
import { getSocket } from "../socket";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [page, setPage] = useState(1);

  const [iAmTyping, setIAmTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const bottomRef = useRef(null);
  const typingTimeOut = useRef(null);

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

  const members = chatDetails?.data?.chat?.members;

  const socket = getSocket();

  const allMessages = [...oldMessages, ...messages];

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // This(emit) will send(trigger) message through FORM
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const inputChangeHandler = (e) => {
    setMessage(e.target.value);

    if (!iAmTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIAmTyping(true);
    }

    setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIAmTyping(false);
    }, [2000]);
  };

  useEffect(() => {

    socket.emit(CHAT_JOINED, { userId: user._id, members });
    
    dispatch(removeNewMessageAlert(chatId));
    
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
    
      socket.emit(CHAT_EXITED, { userId: user._id, members });
    
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const openFileHandler = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const newMessageListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== data.chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "anyRandomWords",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = {
    [NEW_MESSAGE]: newMessageListener,
    [ALERTS]: alertListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

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
        // backgroundColor={"#2A4562"}

        height={"90%"}
        sx={{
          overflow: "hidden",
          overflow: "auto",
          backgroundImage: 'url("/chat_Bg.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
        }}
      >
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}

        {userTyping && <TypingLoader />}

        <div ref={bottomRef} />
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
          sx={{
            bgcolor: "#1C2932",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              rotate: "30deg",
              color: "#dadada",
            }}
            ref={fileMenuRef}
            onClick={openFileHandler}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Message..."
            value={message}
            onChange={inputChangeHandler}
            sx={{
              bgcolor: "#1C2932",
              color: "white",
            }}
          />

          <IconButton
            type="submit"
            sx={{
              backgroundColor: "#1D7A8F",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                backgroundColor: "#00262D",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </>
  );
};

export default AppLayout()(Chat);
