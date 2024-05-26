import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ModalSignIn from "../Account.js/ModalSignIn";
import axios from 'axios';

const RegisterUser = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const handleOnClose = () => setShowModalLogin(false);
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      username: formData.get("fullname"),
      password: formData.get("password"),
      fullName: formData.get("fullname"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      gender: parseInt(formData.get("gender")),
      roleId: 3
    };

    try {
      const response = await axios.post('http://tutormind-env.eba-ejjyp8md.ap-northeast-1.elasticbeanstalk.com/api/auth/register', data, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        }
      });

      if (response.status === 200) {
        toast.success("Đăng ký thành công!");
        setShowModalLogin(true);
        formRef.current.reset();
      } else {
        toast.error("Đăng ký thất bại!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://giasudaykemtainha.vn/uploads/posts/gia-su-online-day-truc-tuyen-qua-mang.jpg")',
      }}
    >
      <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg max-w-lg w-full mt-5 mb-5">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Đăng Ký Tài Khoản
        </h1>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-gray-700 font-semibold mb-2"
            >
              Họ và Tên
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Mật Khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Xác Nhận Mật Khẩu
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-semibold mb-2"
            >
              Số Điện Thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-semibold mb-2"
            >
              Địa Chỉ
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="birthdate"
              className="block text-gray-700 font-semibold mb-2"
            >
              Ngày Sinh
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 font-semibold mb-2"
            >
              Giới Tính
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="0">Nam</option>
              <option value="1">Nữ</option>
              <option value="2">Khác</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700"
          >
            Đăng Ký
          </button>
        </form>
        <p className="mt-6 text-center">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
      <ToastContainer />
      <ModalSignIn
        onClose={handleOnClose}
        visible={showModalLogin}
      />
    </div>
  );
};

export default RegisterUser;
