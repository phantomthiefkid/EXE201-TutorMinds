import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_CREATE_NEW_USER = "https://fams-management.tech/api/auth/register"

export const CreateNewUser = createAsyncThunk('CreateNewUser', async (data) => {
    try {
      
      const response = await axios.post(URL_CREATE_NEW_USER, data);
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.log("here")
      throw error;
    }
  }, []);

  export const UsersData = createSlice({
    name: 'userData',
    initialState: {
      isLoading: false,
      data: [],
      isError: false,
      totalPages: 0,
      user: {}
    },
    extraReducers: (builder) => {
      builder.addCase(CreateNewUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.isError = false
      })
      builder.addCase(CreateNewUser.pending, (state, action) => {
        state.isLoading = true;
      })
      builder.addCase(CreateNewUser.rejected, (state, action) => {
        state.isError = true;
      })
    }
  })
  
  export default UsersData.reducer;