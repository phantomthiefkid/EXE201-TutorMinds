import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UpdateUser = ({ visible, onClose, user, fetchUsers }) => {
  const [userUpdate, setUserUpdate] = useState({
    email: user ? user.email : ""
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (user) {
      setUserUpdate(user);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'roleName') {
      let roleId;
      switch(value) {
        case '1':
          roleId = 1;
          break;
        case '2':
          roleId = 2;
          break;
        case '3':
          roleId = 3;
          break;
        default:
          roleId = '';
          break;
      }
      setUserUpdate({ ...userUpdate, roleId: roleId });
    } else {
      setUserUpdate({ ...userUpdate, [name]: value });
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const encodedEmail = encodeURIComponent(userUpdate.email); 
      const response = await axios.put(
        `http://tutormind-env.eba-ejjyp8md.ap-northeast-1.elasticbeanstalk.com/api/users/users?email=${encodedEmail}`,userUpdate ,{
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
    });
      if (response.status === 200) {
        toast.success("Cập nhật thành công!");
        onClose();
        fetchUsers();
      } else {
        toast.error("Cập nhật thất bại!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  if (!visible || !user) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-2xl rounded-md mb-6">
        <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
          <h2 className="text-2xl mb-4 font-semibold text-center">
            Cập nhật người dùng
          </h2>
          <form onSubmit={updateUser}>
            <input type="hidden" name="email" value={userUpdate.email} />

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Họ và tên
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={userUpdate.fullName || ""}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Giới tính
              </label>
              <select
                id="gender"
                name="gender"
                value={userUpdate.gender || ""}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              >
                <option value="">Chọn giới tính</option>
                <option value="1">Nam</option>
                <option value="2">Nữ</option>
              </select>
            </div>

            <div className="mt-6">
              <label
                htmlFor="roleName"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Vai trò
              </label>
              <input
                id="roleName"
                name="roleName"
                type="text"
                value={userUpdate.roleName || ""}
                readOnly 
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Tên đăng nhập
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={userUpdate.username || ""}
                readOnly 
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Số điện thoại
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={userUpdate.phone || ""}
                readOnly
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Địa chỉ
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={userUpdate.address || ""}
                onChange={handleInputChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Cập nhật
              </button>
            </div>
          </form>
          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
