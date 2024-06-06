import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL_FETCH_CLASSES = "https://fams-management.tech/api/conversation";
const URL_FETCH_CLASSES_DETAIL =
  "https://fams-management.tech/api/conversation/";
const URL_CREATE_CLASSES = "https://fams-management.tech/api/conversation";

export const fetchClassList = createAsyncThunk(
  "fetchClassList",
  async ({ search, pageSize, pageIndex, sortBy }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Missing token");
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          pageIndex,
          pageSize,
          search,
          sortBy,
        },
      };

      const response = await axios.get(URL_FETCH_CLASSES, config);
      console.log("Response data: ", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
);

export const fetchClassDetail = createAsyncThunk(
  "fetchClassDetail",
  async ({ id }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Missing token");
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(URL_FETCH_CLASSES_DETAIL + id, config);
      console.log("Data detail:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
);

export const createClasses = createAsyncThunk(
  "class/createClasses",
  async (ClassData, { rejectWithValue }) => {
    try {
      console.log("class Data:", ClassData);
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No authentication token found");
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(URL_CREATE_CLASSES, ClassData, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const ClassData = createSlice({
  name: "classData",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    totalPages: 0,
    class: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchClassList.rejected, (state) => {
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(fetchClassList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(fetchClassDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.class = action.payload;
      })
      .addCase(fetchClassDetail.rejected, (state) => {
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(fetchClassDetail.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(createClasses.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.class = action.payload;
      })
      .addCase(createClasses.rejected, (state) => {
        state.isError = true;
      })
      .addCase(createClasses.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default ClassData.reducer;
