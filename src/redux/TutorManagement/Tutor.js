import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL_FETCH_TUTOR = "https://fams-management.tech/api/tutors";
const URL_FETCH_TUTOR_DETAIL = "https://fams-management.tech/api/tutors/"
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
      const requestBody = [];

      const response = await axios.post(URL_FETCH_TUTOR, requestBody, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchTutorDetail = createAsyncThunk("fetchTutorDetail", async ({id}) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Missing token");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    };


    const response = await axios.get(URL_FETCH_TUTOR_DETAIL + id, config);
    console.log("Du lieu o dau: ", response.data)
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
      })
      .addCase(fetchTutorDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.tutor = action.payload;
      })
      .addCase(fetchTutorDetail.rejected, (state) => {
        state.isError = true;
        state.isError = true;
      })
      .addCase(fetchTutorDetail.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
  },
});

export default TutorsData.reducer;
