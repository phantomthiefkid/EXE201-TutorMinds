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
import CourseDetail from "./components/CourseManagement/CourseDetail";
import TutorDetail from "./components/Tutormanagement/Tutordetail.js";
import ProfileUser from "./components/Usermanagement/ProfileUser";
import ClassListRequest from "./components/ClassManagement/ClassListRequest";
import { getUserDataFromToken } from "./redux/auth/loginSlice";
import RequestListAdmin from "./components/Admin/RequestListAdmin";
import AddCourse from "./components/CourseManagement/AddCourse";
import LessonVideo from "./components/CourseManagement/LessonVideo";

function App() {
  const roleName = getUserDataFromToken();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/createUser" element={<CreateUserWithSidebar />}></Route>
        <Route path="/registerTeacher" element={<RegisterTeacher />}></Route>
        <Route path="/registerUser" element={<RegisterUser />}></Route>
        <Route path="/userlist" element={<UserListWithSidebar />}></Route>
        <Route path="/dashboard" element={<DashboardWithSidebar />}></Route>
        <Route path="/tutorlist" element={<Tutorlist />}></Route>
        <Route path="/courselist" element={<CourseList />}></Route>
        <Route path="/tutordetail/:id" element={<TutorDetail />}></Route>
        <Route path="/coursedetail/:id" element={<CourseDetail />}></Route>
        <Route path="/profileuser" element={<ProfileUser />}></Route>
        <Route path="/classlist" element={<ClassListRequest />}></Route>
        <Route path="/addcourse" element={<AddCourse />}></Route>
        <Route path="/video" element={<LessonVideo/>}></Route>
        
        <Route
          path="/requestlistadmin"
          element={<RequiestListWithSidebar></RequiestListWithSidebar>}
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );

  function CreateUserWithSidebar() {
    return roleName === "ADMIN" ? (
      <SidebarAdmin>
        <CreateUser />
      </SidebarAdmin>
    ) : (
      <Navigate to="/" />
    );
  }

  function UserListWithSidebar() {
    return roleName === "ADMIN" ? (
      <SidebarAdmin>
        <UserList />
      </SidebarAdmin>
    ) : (
      <Navigate to="/" />
    );
  }

  function DashboardWithSidebar() {
    return roleName === "ADMIN" ? (
      <SidebarAdmin>
        <Dashboard />
      </SidebarAdmin>
    ) : (
      <Navigate to="/" />
    );
  }

  function RequiestListWithSidebar() {
    return roleName === "ADMIN" ? (
      <SidebarAdmin>
        <RequestListAdmin></RequestListAdmin>
      </SidebarAdmin>
    ) : (
      <Navigate to="/requestlistadmin" />
    );
  }
}

export default App;
