import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: {},
  status: "idle", // idle or pending or succeeded or failed
  error: null,
};

const LOGIN_URL =
  "https://jp-dev.cityremit.global/web-api//config/v1/auths/login";

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (formData) => {
    try {
      const response = await axios.post(LOGIN_URL, formData);
      console.log(response);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.users.users;
// export const selectUserToken = state=>state.users.users;
export const selectPostStatus = (state) => state.posts.status;
export const selectPostError = (state) => state.posts.error;

// export const { addPost, addReactionCount } = postsSlice.actions;

export default usersSlice.reducer;
