import React from "react";
import { Grid } from "@mui/material";

const Groups = () => {
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
      >
        Groups List
      </Grid>
    </Grid>
  );
};

export default Groups;
