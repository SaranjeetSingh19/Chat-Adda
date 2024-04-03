import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleChat } from "../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";

const NewGroup = () => {
  const groupName = useInputValidation("");
  const [memebers, setMembers] = useState(sampleChat);
  const [selectedMemebers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) // If the id is already includes/exists then, it will filter and not takes that id and if id doesn't exist then it will add it in an Array
        ? prev.filter((currentElem) => currentElem !== id)
        : [...prev, id]
    );
  };
  const submitHandler = () => {};

  const closeHandler = () => {};

  return (
    <Dialog open onClose={closeHandler}>
      <Stack
        p={{ xs: "0rem", sm: "1rem" }}
        width={"23rem"}
        backgroundColor={"#EBD1E3"}
        spacing={"2rem"}
      >
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>

        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          label="Group name"
        />
        <Typography variant="body1">Members</Typography>

        <Stack>
          {sampleChat.map((i, index) => (
            <UserItem
              user={i}
              key={i._id}
              isAdded={selectedMemebers.includes(i._id)} // If id of selectedMembers includes then, icon will be changed from + to -
              handler={selectMemberHandler}
            />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="text" color="error">
            Cancel
          </Button>
          <Button variant="contained" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
