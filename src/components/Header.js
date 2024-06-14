import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BoxArrowRight,
  Gear,
  Person,
  Search,
  Book,
  CalendarCheck,
  Wallet,
} from "react-bootstrap-icons";
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
  const user = getUserNameFromToken();
  const roleName = getUserDataFromToken();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      setIsOpen(false);
      navigate("/");
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <ModalSignIn onClose={handleOnClose} visible={showModalLogin} />
      <nav className="bg-white p-4 shadow-lg w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="https://storage.googleapis.com/tutormind/dev%2Ftutormindslogo.png-4pBcY7.png"
                alt="Logo"
                className="h-12 w-12 rounded-full"
              />
            </Link>
            <Link to="/" className="text-blue-600 text-2xl ml-4 font-bold">
              TutorMinds
            </Link>
          </div>
          <div className="flex-grow mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm khóa học hoặc gia sư"
                className="w-full p-3 pl-10 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              Trang chủ
            </Link>
            <Link
              to="/tutorlist"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              Danh sách gia sư
            </Link>
            <Link
              to="/courselist"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              Danh sách khóa học
            </Link>

            {!token && (
              <Link
                to="/registerUser"
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Đăng ký
              </Link>
            )}

            {token ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={toggleDropdown}
                  className="flex items-center cursor-pointer"
                >
                  <div className="text-blue-600 hover:text-blue-800 mr-2 text-lg">
                    {roleName}
                  </div>
                  <img
                    className="rounded-full h-12 w-12"
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="profile"
                  />
                </div>

                {isOpen && (
                  <div className="absolute z-50 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    {roleName === "ADMIN" && (
                      <Link to="/userlist" onClick={closeDropdown}>
                        <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300">
                          <Gear size={20} className="mr-2" />
                          Quản lý
                        </div>
                      </Link>
                    )}
                    <div
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <Link to="/profileuser" onClick={closeDropdown}>
                        <div className="flex items-center text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300">
                          <Person size={20} className="mr-2" />
                          Hồ sơ
                        </div>
                      </Link>
                    </div>
                    {(roleName === "TUTOR" || roleName === "STUDENT") && (
                      <div
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <Link to="/classlist" onClick={closeDropdown}>
                          <div className="flex items-center py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300">
                            <Book size={20} className="mr-2" />
                            Lớp học của tôi
                          </div>
                        </Link>
                      </div>
                    )}
                    {(roleName === "STUDENT") && (
                      <div
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <Link to="" onClick={closeDropdown}>
                          <div className="flex items-center py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300">
                            Nạp tiền
                          </div>
                        </Link>
                      </div>
                    )}
                    {(roleName === "STUDENT" && roleName === "ADMIN") && (
                      <div
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <Link to="/payment" onClick={closeDropdown}>
                          <div className="flex items-center py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300">
                            Lịch sử giao dịch
                          </div>
                        </Link>
                      </div>
                  )}
                    {roleName === "TUTOR" && (
                      <Link to="/calendar" onClick={closeDropdown}>
                        <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300">
                          <CalendarCheck size={20} className="mr-2" />
                          Lịch dạy của tôi
                        </div>
                      </Link>
                    )}
                    
                    <div
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300"
                      onClick={handleLogout}
                    >
                      <BoxArrowRight size={20} className="mr-2" />
                      Đăng xuất
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowModalLogin(true)}
                className="text-blue-600 hover:text-blue-800 transition duration-300"
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
