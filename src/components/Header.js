import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalSignIn from "./Account.js/ModalSignIn";

const Header = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const handleOnClose = () => setShowModalLogin(false);
  return (
    <>
      <ModalSignIn
        onClose={handleOnClose}
        visible={showModalLogin}
      ></ModalSignIn>
      <nav className="bg-sky-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to={`/`}>
              <img
                src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/444151589_1877086456037477_1111746622231164736_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFWMFxBN3oBRpFAMIm2sGJSsVmeo7cxhPKxWZ6jtzGE8jXgbkR5Nk2mWoD5kF9PiAabOJAjeXYkWFn-nmXA01la&_nc_ohc=CIgL3TAe-pQQ7kNvgHYT2f1&_nc_ht=scontent.fsgn2-6.fna&oh=00_AYB_nxgSeHhakBLldvCH7JS1yAnUhIK2Oz2BZgqp8SBv0g&oe=664D328A"
                alt="Logo"
                className="ml-4 h-12 w-12 rounded-full"
              />
            </Link>
            <Link to={`/`} className="text-white text-2xl ml-4 font-bold">
              TutorMinds
            </Link>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="" className="text-white hover:text-gray-200">
              Đăng ký
            </Link>
            <button
              onClick={() => setShowModalLogin(true)}
              className="text-white hover:text-gray-200"
            >
              Đăng nhập
            </button>
            <Link to="" className="text-white hover:text-gray-200">
              Liên hệ
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
