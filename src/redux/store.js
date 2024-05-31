import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./auth/loginSlice";
import UsersData from "./Usermanagement/user";
import TutorsData from "./TutorManagement/Tutor";
export default configureStore({
  reducer: {
    login: LoginSlice,
    user: UsersData,
    tutor: TutorsData,
  },
});


