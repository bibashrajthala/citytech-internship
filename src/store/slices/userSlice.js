import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: {},
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
      //   console.log(response);
      //   console.log(response.data.data[0].jwt_token);
      localStorage.setItem("accessToken", response.data.data[0].jwt_token);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const dashboardSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user.userData;
// export const selectUserToken = (state) =>
//   state.user.userData?.data[0].data.jwt_token;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

// export const { addPost, addReactionCount } = postsSlice.actions;

export default dashboardSlice.reducer;
