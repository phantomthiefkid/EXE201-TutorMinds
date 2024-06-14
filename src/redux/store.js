import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./auth/loginSlice";
import UsersData from "./Usermanagement/user";
import TutorsData from "./TutorManagement/Tutor";
import UploadData from "./uploadFile/uploadFile";
import ClassData from "./ClassManagement/classSlice";
import Calendar from "./calendar/Calendar";
import Wallet from "./payment/Payment";
export default configureStore({
  reducer: {
    login: LoginSlice,
    user: UsersData,
    tutor: TutorsData,
    upload: UploadData,
    class: ClassData,
    calendar: Calendar,
    wallet: Wallet,
  },
});
