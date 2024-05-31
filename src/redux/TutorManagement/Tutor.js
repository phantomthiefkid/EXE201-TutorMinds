import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL_FETCH_TUTOR = "https://fams-management.tech/api/tutors";

export const fetchTutorList = createAsyncThunk(
  "fetchTutorList",
  async ({ search, pageSize, pageIndex }) => {
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
        },
      };
      const requestBody = []; // JSON array specified in the cURL command

      console.log("Request body:", requestBody);

      const response = await axios.post(URL_FETCH_TUTOR, requestBody, config);
      console.log("Response data:", response.data);
      return response.data.content;
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
);

export const TutorsData = createSlice({
  name: "tutorsData",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    totalPages: 0,
    tutor: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTutorList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTutorList.rejected, (state) => {
        state.isError = true;
        state.isError = true;
      })
      .addCase(fetchTutorList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
  },
});

export default TutorsData.reducer;
