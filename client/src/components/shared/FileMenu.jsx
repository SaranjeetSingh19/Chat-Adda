import { Menu } from "@mui/material";
import React from "react";

const FileMenu = ({ anchorEl }) => {
  return (
    <Menu anchorEl={anchorEl} open={false}>
      <div
        style={{
          width: "10rem",
        }}
      ></div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
      aperiam. Nisi fuga facilis nulla dolores quaerat a vero natus magnam?
    </Menu>
  );
};

export default FileMenu;
