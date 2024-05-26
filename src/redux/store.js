import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./auth/loginSlice";
export default configureStore({
  reducer: {
    login: LoginSlice,
  },
});
