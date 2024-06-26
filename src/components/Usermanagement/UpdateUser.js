import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";

const UpdateUser = ({ visible, onClose, user, fetchUsers }) => {
  const [userUpdate, setUserUpdate] = useState({
    email: user ? user.email : ""
  });
  const [imageAvatar, setImageAvatar] = useState(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (user) {
      setUserUpdate(user);
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageAvatar(file);
  };

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("files", file);
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };
      const response = await axios.post("https://fams-management.tech/api/files", formData, config);
      if (response) {
        console.log(response.data)
      }
      setUserUpdate((pre) => ({ ...pre, avatar: response.data }));
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Bạn không có quyền thực hiện thao tác này. Vui lòng đăng nhập lại.");
        // Optionally, redirect to login page
      } else {
        toast.error("Đã xảy ra lỗi khi tải lên ảnh đại diện.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'roleName') {
      let roleId;
      switch (value) {
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
        `https://fams-management.tech/api/users/users?email=${encodedEmail}`, userUpdate, {
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
      if (error.response && error.response.status === 403) {
        toast.error("Bạn không có quyền thực hiện thao tác này. Vui lòng đăng nhập lại.");
        // Optionally, redirect to login page
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      }
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
            <div className="flex justify-center items-center mb-4">
              <div className="relative">
                <img
                  src={imageAvatar ? URL.createObjectURL(imageAvatar) : userUpdate.avatar || "https://static-00.iconduck.com/assets.00/avatar-default-icon-1975x2048-2mpk4u9k.png"}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full border-2 border-gray-300"
                />
                <label htmlFor="avatar" className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-gray-300 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2a2 2 0 0 1 2 2v4.586l1.707-1.707a1 1 0 1 1 1.414 1.414l-3.5 3.5a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 1 1 1.414-1.414L10 8.586V4a2 2 0 0 1 2-2z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4 15a2 2 0 0 1-2-2V8.414l-1.707 1.707a1 1 0 1 1-1.414-1.414l3.5-3.5a1 1 0 0 1 1.414 0l3.5 3.5a1 1 0 1 1-1.414 1.414L4 8.414V13a2 2 0 0 1-2 2z" clipRule="evenodd" />
                  </svg>
                  <input
                    type='file'
                    id='avatar'
                    name='avatar'
                    accept='image/*'
                    className='hidden'
                    onChange={handleUploadAvatar}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
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

              <div>
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

              <div>
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
                  className="appearance-none block bg-slate-200 w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>

              <div>
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
                  disabled
                  value={userUpdate.username || ""}
                  readOnly
                  className="appearance-none bg-slate-200 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>

              <div>
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

              <div>
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
            </div>

            <div className="mt-6 flex justify-between space-x-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Cập nhật
              </button>
              <button
                onClick={onClose}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out"
              >
                Đóng
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateUser;
