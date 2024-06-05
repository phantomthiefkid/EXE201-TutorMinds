import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./auth/loginSlice";
import UsersData from "./Usermanagement/user";
import TutorsData from "./TutorManagement/Tutor";
import UploadData from "./uploadFile/uploadFile";
import ClassData from "./ClassManagement/classSlice";
export default configureStore({
  reducer: {
    login: LoginSlice,
    user: UsersData,
    tutor: TutorsData,
    upload: UploadData,
    class: ClassData,
  },
});
