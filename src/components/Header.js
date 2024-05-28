import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BoxArrowRight, Gear, Person } from "react-bootstrap-icons";
import ModalSignIn from "./Account.js/ModalSignIn";
import {
  getUserDataFromToken,
  getUserNameFromToken,
} from "../redux/auth/loginSlice";

const Header = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const handleOnClose = () => setShowModalLogin(false);
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getUserNameFromToken();
  const roleName = getUserDataFromToken();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <>
      <ModalSignIn
        onClose={handleOnClose}
        visible={showModalLogin}
      ></ModalSignIn>
      <nav style={{ background: "#6A9CFD" }} className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to={`/`}>
              <img
                src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/444151589_1877086456037477_1111746622231164736_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFWMFxBN3oBRpFAMIm2sGJSsVmeo7cxhPKxWZ6jtzGE8jXgbkR5Nk2mWoD5kF9PiAabOJAjeXYkWFn-nmXA01la&_nc_ohc=edeqdBUQWB8Q7kNvgFWqCMb&_nc_ht=scontent.fsgn2-6.fna&oh=00_AYCaPj40SYxC-4bRD6Rw-7Ww4P599NAY0fVW_iaFEljP-A&oe=6655FC8A"
                alt="Logo"
                className="ml-4 h-12 w-12 rounded-full"
              />
            </Link>
            <Link to={`/`} className="text-white text-2xl ml-4 font-bold">
              TutorMinds
            </Link>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-white hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/tutorlist" className="text-white hover:text-gray-200">
              Danh sách gia sư
            </Link>
            {token ? null : (<Link to="/registerUser" className="text-white hover:text-gray-200">
              Đăng ký
            </Link>)}

            {token ? (
              <div>
                <div onClick={toggleDropdown} className="flex items-center">
                  <div className="text-white hover:text-gray-200 mr-2 text-lg">
                    {roleName}
                  </div>
                  <img
                    className="rounded-full h-12 w-12"
                    src={
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="profile"
                  />

                  {isOpen && (
                    <div className="absolute w-48 top-16 right-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                      {roleName === "ADMIN" && (
                        <Link to="/userlist">
                          <div
                            className="cursor-pointer hover:text-blue-500 flex justify-start items-center px-10 py-2"
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            <Gear size={20} className="mr-2"></Gear>
                            Quản lý
                          </div>
                        </Link>
                      )}

                      <div
                        className="cursor-pointer hover:text-blue-500 flex justify-start items-center px-10 py-2"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <Person size={20} className="mr-2"></Person> Hồ sơ
                      </div>


                      <div
                        onClick={handleLogout}
                        className="cursor-pointer hover:text-blue-500 flex justify-start items-center px-10 py-2"
                      >
                        <BoxArrowRight size={20} className="mr-2" />
                        Đăng xuất
                      </div>
                    </div>
                  )
                  }
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowModalLogin(true)}
                className="text-white hover:text-gray-200"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
