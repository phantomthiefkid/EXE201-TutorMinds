import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_LOGIN = `http://35.72.46.118/api/auth/login`; //URI: Login

export const loginApi = (email, password) => {
  return axios.post(URL_LOGIN, {
    email: email,
    password: password,
  });
};

export const getUserNameFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const data = JSON.parse(atob(token.split(".")[1]));
    return data;
  }
  return null;
};

export const getUserDataFromToken = () => {
  const token = localStorage.getItem("token");
  try {
    if (token) {
      const payload = token.split(".")[1];
      const decodedPayload = atob(payload);
      const data = JSON.parse(decodedPayload);
      if (data && data.RoleName) {
        return data.RoleName;
      }
    }
  } catch (error) {
    console.error("Error decoding or parsing token:", error.message);
  }
  return null;
};

export const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    data: {},
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default LoginSlice.reducer;
