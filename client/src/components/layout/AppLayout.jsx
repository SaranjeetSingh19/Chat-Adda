import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../specific/ChatList";
import { sampleChat } from "../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import { useErrors } from "../../hooks/hook";
import { getSocket } from "../../socket";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const chatId = params.chatId;

    const socket = getSocket()

 

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{isError, error}])

 

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete chat", e, _id, groupChat);
    };

    const handleMobileClose = () => dispatch(setIsMobile(false))


    return (
      <div>
        <Title />
        <Header />

        {isLoading ? (
              <Skeleton />
            ) : (
              <Drawer open={isMobile} onClose={handleMobileClose}>
              <ChatList w="70vw"
                chats={data?.message} // 6pp used data.chats but i have declared message instead of chats
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
              </Drawer>
            )}

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            height={"100%"}
            bgcolor={"lightseagreen"}
            // borderRight={"2px solid #42A992"}
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },

              overflow: "hidden",
              overflowY: "scroll",
            }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.message} // 6pp used data.chats but i have declared message instead of chats
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"} // Change it to 100vh if any prob occurs
            bgcolor={"#E6E6FA"}
            sx={{ display: { xs: "none", sm: "block" } }}
            padding="2rem"
          >
            <Profile user={user}/>
          </Grid>
        </Grid>
      </div>
    );
  };
};

export default AppLayout;
