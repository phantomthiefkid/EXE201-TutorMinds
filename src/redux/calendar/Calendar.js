import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL_FETCH_CALENDAR = "https://fams-management.tech/api/schedule/";

// export const fetchCalendar = createAsyncThunk(
//   "fetchCalendar",
//   async ({ email }) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Missing token");
//       }
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await axios.get(URL_FETCH_CALENDAR + email, config);
//       console.log("dataCalendar -->", response.data);
//       return response.data;
//     } catch (error) {
//       console.error(
//         "Error:",
//         error.response ? error.response.data : error.message
//       );
//       throw error;
//     }
//   }
// );
export const fetchCalendar = createAsyncThunk(
  "fetchCalendar",
  async ({ teacher_email, startDate, endDate }) => {
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
      const response = await axios.get(
        `${URL_FETCH_CALENDAR}${teacher_email}?startDate=${startDate}&endDate=${endDate}`,
        config
      );
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

export const CalendarData = createSlice({
  name: "calendarData",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    calendar: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.calendar = action.payload;
      })
      .addCase(fetchCalendar.rejected, (state) => {
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(fetchCalendar.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
  },
});

export default CalendarData.reducer;
