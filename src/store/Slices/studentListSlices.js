import { createSlice } from "@reduxjs/toolkit";
import fetchUsers, { addUser, deleteUser } from "../reducers/userCreator";

const initialState = {
  users: [],
  isLoadingUsers: false,
  usersError: "",
};

const usersSlice = createSlice({
  initialState,
  name: "StudentList",
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.isLoadingUsers = false;
    },
    setIsLoadingUsers: (state) => {
      state.isLoadingUsers = true;
      state.users = [];
      state.usersError = "";
    },
    setUsersError: (state, action) => {
      state.usersError = action.payload;
      state.isLoadingUsers = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoadingUsers = true;
      state.users = [];
      state.usersError = "";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoadingUsers = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.usersError = action.payload;
      state.isLoadingUsers = false;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.usersError = action.payload;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.usersError = action.payload;
    });
  },
});

const usersReducer = usersSlice.reducer;
export const { setIsLoadingUsers, setUsers, setUsersError } = usersSlice.actions;
export default usersReducer;
