import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./auth/loginSlice";
import UsersData from "./Usermanagement/user";
export default configureStore({
  reducer: {
    login: LoginSlice,
    user: UsersData,
  },
});


