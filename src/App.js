import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import UserList from "./components/Usermanagement/Userlist";
import CreateUser from "./components/Usermanagement/CreateUser";
import RegisterTeacher from "./components/Usermanagement/RegisterTeacher";
import RegisterUser from "./components/Usermanagement/RegisterUser";
import SidebarAdmin from "./components/Admin/SidebarAdmin";
import Dashboard from "./components/Admin/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/createUser" element={<CreateUser></CreateUser>}></Route>
        <Route path="/registerTeacher" element={<RegisterTeacher></RegisterTeacher>}></Route>
        <Route path="/registerUser" element={<RegisterUser></RegisterUser>}></Route>
        <Route path="/userlist" element={<SidebarAdmin><UserList></UserList></SidebarAdmin>}></Route>
        <Route path="/dashboard" element={<SidebarAdmin><Dashboard></Dashboard></SidebarAdmin>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
