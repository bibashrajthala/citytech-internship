import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  summary: {},
  table1: [],
  table2: [],
  countries: [],
  status: "idle", // idle or pending or succeeded or failed
  error: null,
};

const API = axios.create({
  baseURL: "https://jp-dev.cityremit.global",
});

let token = localStorage.getItem("accessToken");
API.interceptors.request.use((req) => {
  if (token) {
    // console.log(token);

    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// { headers: { Authorization: `Bearer ${token}` } }

export const fetchSummary = createAsyncThunk(
  "dashboard/fetchSummary",
  async () => {
    try {
      const response = await API.get(
        "/web-api/transaction-manager/v1/admin/dashboard/summary"
      );
      //   console.log(response.data.data[0]);
      //   const data = await response.data.data[0];
      return response.data.data[0];
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchTable1 = createAsyncThunk(
  "dashboard/fetchTable1",
  async () => {
    try {
      const response = await API.post(
        "/web-api/transaction-manager/v1/admin/dashboard/search",
        null
      );
      //   console.log(response);
      const data = await response.data.data;
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchTable2 = createAsyncThunk(
  "dashboard/fetchTable2",
  async () => {
    try {
      const response = await API.post(
        "/web-api/config/v1/tickets/search",
        null
      );
      //   console.log(response);
      const data = await response.data.data.data;
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchCountries = createAsyncThunk(
  "dashboard/fetchCountries",
  async () => {
    try {
      const response = await API.get(
        "/web-api/config/v1/admin/masters/country"
      );
      // console.log(response);
      const data = await response.data.data;
      return data;
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
      .addCase(fetchSummary.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.summary = action.payload;
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTable1.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTable1.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.table1 = action.payload;
      })
      .addCase(fetchTable1.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTable2.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTable2.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.table2 = action.payload;
      })
      .addCase(fetchTable2.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCountries.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectSummary = (state) => state.dashboard.summary;
export const selectTable1 = (state) => state.dashboard.table1;
export const selectTable2 = (state) => state.dashboard.table2;
export const selectCountries = (state) => state.dashboard.countries;
export const selectDashboardStatus = (state) => state.dashboard.status;
export const selectDashbaordError = (state) => state.dashboard.error;

// export const { addPost, addReactionCount } = postsSlice.actions;

export default dashboardSlice.reducer;
