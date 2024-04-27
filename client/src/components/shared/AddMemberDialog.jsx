import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleChat } from "../constants/sampleData";
import UserItem from "./UserItem";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddGroupMemberMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();

  const [members, setMembers] = useState(sampleChat);
  const [selectedMemebers, setSelectedMembers] = useState([]);

  const { isAddMember } = useSelector((state) => state.misc);
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMemberMutation
  );

  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) // If the id is already includes/exists then, it will filter and not takes that id and if id doesn't exist then it will add it in an Array
        ? prev.filter((currentElem) => currentElem !== id)
        : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    addMembers("Adding members...", { members: selectedMemebers, chatId });
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack spacing={"1rem"} padding={"2rem"} width={"20rem"} sx={{bgcolor: "#00242D", color: "white"}}> 
        <DialogTitle textAlign={"center"}>Add member</DialogTitle>
        <Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((i, index) => (
              <UserItem
                key={i._id}
                user={i}  
                handler={selectMemberHandler}
                isAdded={selectedMemebers.includes(i._id)}
              />
            ))
          ) : (
            <Typography 
            color={"orange"}
            textAlign={"center"}>No friends</Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button
            onClick={addMemberSubmitHandler}
            disabled={isLoadingAddMembers}
            variant="contained"
            color="primary"
            style={{
              margin: "8px",
              borderRadius: "20px",
              padding: "10px 20px",
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#2E8B57", // Sea Green
              color: "white",
              "&:hover": {
                backgroundColor: "#3CB371", // Medium Sea Green on hover
              },
            }}
          >
            Add
          </Button>

          <Button
            onClick={closeHandler}
            variant="contained"
            color="secondary"
            style={{
              margin: "8px",
              borderRadius: "20px",
              padding: "10px 20px",
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#FF6347", // Tomato
              color: "white",
              "&:hover": {
                backgroundColor: "#FF4500", // Orange Red on hover
              },
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
