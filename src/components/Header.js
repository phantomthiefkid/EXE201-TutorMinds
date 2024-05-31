import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BoxArrowRight, Gear, Person, Search } from "react-bootstrap-icons";
import ModalSignIn from "./Account.js/ModalSignIn";
import { getUserDataFromToken, getUserNameFromToken } from "../redux/auth/loginSlice";

const Header = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const handleOnClose = () => setShowModalLogin(false);
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
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
      <ModalSignIn onClose={handleOnClose} visible={showModalLogin} />
      <nav className="bg-white p-4 shadow-lg w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/445551860_1884650355281087_2659972058971311210_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=afA7fdo_8IUQ7kNvgGzfXrj&_nc_ht=scontent.fsgn2-4.fna&oh=00_AYCmUH7wEEo7MOax-QUL5qPfAOwHacx1dHoWZj9UvAxK6w&oe=665DFA91"
                alt="Logo"
                className="h-12 w-12 rounded-full"
              />
            </Link>
            <Link to="/" className="text-blue-600 text-2xl ml-4 font-bold">
              TutorMinds
            </Link>
          </div>

          {/* Search Bar */}
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

          {/* Menu Items */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-blue-600 hover:text-blue-800 transition duration-300">
              Trang chủ
            </Link>
            <Link to="/tutorlist" className="text-blue-600 hover:text-blue-800 transition duration-300">
              Danh sách gia sư
            </Link>
            <Link to="/courselist" className="text-blue-600 hover:text-blue-800 transition duration-300">
              Danh sách khóa học
            </Link>

            {!token && (
              <Link to="/registerUser" className="text-blue-600 hover:text-blue-800 transition duration-300">
                Đăng ký
              </Link>
            )}

            {token ? (
              <div className="relative">
                <div onClick={toggleDropdown} className="flex items-center cursor-pointer">
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
                      <Link to="/userlist">
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
                      <Link to="/profileuser">
                          <div className="flex items-center py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-300">
                          <Person size={20} className="mr-2" />
                          Hồ sơ
                          </div>
                      </Link>
                    </div>
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
