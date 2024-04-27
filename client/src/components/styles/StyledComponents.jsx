import { Skeleton, keyframes, styled } from "@mui/material";
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
  transition: all 0.3s ease;
  font-weight: bold;
  &:hover {
    background-color: #4AA6BD;
 
  }
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  backgroundcolor: ${blue};
`;

export const SearchField = styled("input")`
  padding: 1rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color: #f1f1f1;
  font-size: 1.1rem;
`;

export const CurveButton = styled("button")`
  border-radius: 1.4rem;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: black;
  color: black;
  font-size: 1.2rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const bouncingWave = keyframes`
0% {transform: scale(1); }
50% {transform: scale(1.5); }
100% {transform: scale(1); }
`;

export const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bouncingWave} 1s infinite`
}));  // Through GPT

export const ditu = `❣️`
