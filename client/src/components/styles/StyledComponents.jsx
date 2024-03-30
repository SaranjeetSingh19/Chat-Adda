import { styled } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { Link as LinkComponent } from "react-router-dom";

export const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  &:hover {
    background-color: white;
  }
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  backgroundColor: ${blue}
`;
