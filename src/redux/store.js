import { configureStore } from "@reduxjs/toolkit";
import UsersData from "./Usermanagement/user";

export default configureStore({
    reducer: {
        user: UsersData,
    }
})