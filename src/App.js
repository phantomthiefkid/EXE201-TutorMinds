import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import UserList from "./components/Usermanagement/Userlist";
import CreateUser from "./components/Usermanagement/CreateUser";
import RegisterTeacher from "./components/Usermanagement/RegisterTeacher";
import RegisterUser from "./components/Usermanagement/RegisterUser";
import SidebarAdmin from "./components/Admin/SidebarAdmin";
import Dashboard from "./components/Admin/Dashboard";
import Tutorlist from "./components/Tutormanagement/Tutorlist";
import CourseList from "./components/CourseManagement/CourseList";
import TutorDetail from "./components/Tutormanagement/TutorDetail";
import CourseDetail from "./components/CourseManagement/CourseDetail";
import { getUserDataFromToken } from "./redux/auth/loginSlice";

function App() {
  const roleName = getUserDataFromToken();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/createUser"
          element={
            roleName === "ADMIN" ? (
              <SidebarAdmin>
                <CreateUser />
              </SidebarAdmin>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/registerTeacher"
          element={<RegisterTeacher />}
        />
        <Route
          path="/registerUser"
          element={<RegisterUser />}
        />
        <Route
          path="/userlist"
          element={
            roleName === "ADMIN" ? (
              <SidebarAdmin>
                <UserList />
              </SidebarAdmin>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            roleName === "ADMIN" ? (
              <SidebarAdmin>
                <Dashboard />
              </SidebarAdmin>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/tutorlist"
          element={<Tutorlist />}
        />
        <Route
          path="/courselist"
          element={<CourseList />}
        />
        <Route
          path="/tutordetail/:id"
          element={<TutorDetail />}
        />
        <Route
          path="/coursedetail/:id"
          element={<CourseDetail />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
