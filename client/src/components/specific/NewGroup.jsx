import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { setIsNewGroup } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const NewGroup = () => {
  const dispatch = useDispatch();

  const { isNewGroup } = useSelector((state) => state.misc);

  const groupName = useInputValidation("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const { data, isLoading, isError, error } = useAvailableFriendsQuery();

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) // If the id is already includes/exists then, it will filter and not takes that id and if id doesn't exist then it will add it in an Array
        ? prev.filter((currentElem) => currentElem !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if (!groupName.value) return toast.error("GroupNname is Required 🥸👊🏻");

    if (selectedMembers < 2)
      return toast.error("Please Select at Least 3 Members 😐");

    newGroup("Creating group...", {
      name: groupName.value,
      members: selectedMembers,
    });
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack
        p={{ xs: "0rem", sm: "1rem" }}
        width={"23rem"}
        backgroundColor={"#0C4545"}
        spacing={"2rem"}
        color={"white"}
      >
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>

        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          InputLabelProps={{
            style: { color: "#dadada" },
          }}
          label="Group name"
        />
        <Typography variant="body1">Members</Typography>

        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i, index) => (
              <UserItem
                user={i}
                key={index} // previously it was i._id
                isAdded={selectedMembers.includes(i._id)} // If id of selectedMembers includes then, icon will be changed from + to -
                handler={selectMemberHandler}
              />
            ))
          )}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button
            variant="text"
            color="error"
            onClick={closeHandler}
            disabled={isLoadingNewGroup}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "skyblue", color: "darkblue" }}
            onClick={submitHandler}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
