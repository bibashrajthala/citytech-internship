import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/userSlice";
import dashboardReducer from "./slices/dashboardSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
    dashboard: dashboardReducer,
  },
});
