import {
    createSlice,
    createAsyncThunk,
    isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
const URL_ENROLL_COURSE = "https://fams-management.tech/course/enroll/";

export const enrollCourse = createAsyncThunk("enrollCourse", async ({ courseId, userId }) => {
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

      const url = `${URL_ENROLL_COURSE}${courseId}/${userId}`;
  
      const response = await axios.post(url, {}, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  });

  export const getEnrollCourse = createAsyncThunk("getEnrollCourse", async ({ courseId, userId }) => {
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

      const url = `${URL_ENROLL_COURSE}${courseId}/${userId}`;
  
      const response = await axios.get(url, {}, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  });