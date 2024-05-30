import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL_FETCH_TUTOR = ''
export const fetchTutorList = createAsyncThunk('fetchTutorList', async () => {
  try {

    const response = await axios.get(URL_FETCH_TUTOR, data);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.log("here")
    throw error;
  }
})