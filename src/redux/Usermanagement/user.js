import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_CREATE_NEW_USER = "https://fams-management.tech/api/auth/register";
const URL_FETCH_USER = "https://fams-management.tech/api/users/";

export const CreateNewUser = createAsyncThunk(
  "CreateNewUser",
  async (data) => {
    try {
      const response = await axios.post(URL_CREATE_NEW_USER, data);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  []
);

export const fetchUser = createAsyncThunk("fetchUsers", async ({ email }) => {
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
    const response = await axios.get(URL_FETCH_USER + email, config);
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
});

export const UsersData = createSlice({
  name: "userData",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    totalPages: 0,
    user: {},
  },
  extraReducers: (builder) => {
    builder.addCase(CreateNewUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(CreateNewUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(CreateNewUser.rejected, (state, action) => {
      state.isError = true;
    });

    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isError = true;
        state.isLoading = true;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
  },
});

export default UsersData.reducer;
