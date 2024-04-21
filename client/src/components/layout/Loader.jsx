import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import { BouncingSkeleton } from "../styles/StyledComponents";

const Loader = () => {
  return (
    <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
      <Grid
        item
        sm={4}
        md={3}
        height={"100%"}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
        <Stack spacing={"1rem"}>
          <Skeleton variant="rounded" height={"5rem"} />
          <Skeleton variant="rounded" height={"5rem"} />
          <Skeleton variant="rounded" height={"5rem"} />
          <Skeleton variant="rounded" height={"5rem"} />
          <Skeleton variant="rounded" height={"5rem"} />
          <Skeleton variant="rounded" height={"5rem"} />
        </Stack>
      </Grid>
      <Grid
        item
        md={4}
        lg={3}
        height={"100%"}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
    </Grid>
  );
};

export const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      justifyContent={"center"}
      padding={"0.5rem"}
    >
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{ animationDelay: "0.1s" }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{ animationDelay: "0.2s" }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{ animationDelay: "0.4s" }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{ animationDelay: "0.6s" }}
      />
    </Stack>
  );
};

export default Loader;
