import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";
const Search = () => {
  const dispatch = useDispatch();

  const { isSearch } = useSelector((state) => state.misc);

  const [users, setUsers] = useState([]);

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  const search = useInputValidation("");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((err) => console.log(err));
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack
        p={"1rem"}
        direction={"column"}
        backgroundColor={"#0C4545"}
        width={"25rem"}
        color={"white"}

      >
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" >
                <SearchIcon sx={{color: "white"}} />
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
