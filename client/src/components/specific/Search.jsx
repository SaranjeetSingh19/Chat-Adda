import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleChat } from "../constants/sampleData";
const Search = () => {

  const isLoadingSendFriendRequest = false

  const [users, setUsers] = useState(sampleChat)

  const addFriendHandler = (id) => {
    // console.log(id);
  }

  const search = useInputValidation("");
  return (
    <Dialog open>
      <Stack p={"1rem"} direction={"column"} backgroundColor={"#EBD1E3"}  width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((i, index) => (
            <UserItem
              user={i}
              handlerIsLoading={isLoadingSendFriendRequest}
              key={i._id}
              handler={addFriendHandler}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
