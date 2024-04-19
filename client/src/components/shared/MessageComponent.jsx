import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  

  const sameSender = sender?._id === user?._id; // if sender & user id both are same

 


  const timeAgo = moment(createdAt).fromNow();

  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography color={"#461E5D"} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url); // the url from the attachments will get pass here and further will get split and pop and then at the end it will get match according to it's extension

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
     
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
