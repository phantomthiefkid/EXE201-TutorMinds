import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getEmailDataFromToken } from '../../redux/auth/loginSlice';

function ProfileUser() {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [roleId, setRoleId] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const emailToken = getEmailDataFromToken();

  // Lấy token từ localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Lấy thông tin người dùng từ API
    axios.get(`https://fams-management.tech/api/users/${emailToken}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const { fullName, phone, address, gender, username, email, roleId, avatar } = response.data;
        setFullName(fullName);
        setPhone(phone);
        setAddress(address);
        setGender(gender);
        setUsername(username);
        setEmail(email);
        setRoleId(roleId);
        setAvatarUrl(avatar);
      })
      .catch(error => console.error('Lỗi khi lấy thông tin hồ sơ người dùng:', error));
  }, [token, emailToken]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let updatedAvatarUrl = avatarUrl;

      // Nếu người dùng chọn ảnh mới, upload ảnh trước
      if (profileImage) {
        const formData = new FormData();
        formData.append('file', profileImage);

        const imageResponse = await axios.post('/api/upload/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        });

        updatedAvatarUrl = imageResponse.data.url; // URL của ảnh đã upload
      }

      // Cập nhật thông tin người dùng
      const userUpdateDto = {
        email,
        username,
        password: '', // Để trống vì không cần thiết trong trường hợp này
        fullName,
        phone,
        address,
        gender: parseInt(gender, 10), // Chuyển đổi giới tính thành số nguyên
        roleId: parseInt(roleId?.id, 10), // Chuyển đổi roleId thành số nguyên
        avatar: updatedAvatarUrl,
      };

      const response = await axios.put(`https://fams-management.tech/api/users/users?email=${encodeURIComponent(email)}`, userUpdateDto, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log(response);
        toast.success('Cập nhật thành công');
      } else {
        toast.error('Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật hồ sơ:', error);
      toast.error('Có lỗi xảy ra');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl p-8 mt-12 mb-12">
        <ToastContainer />
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Cập nhật hồ sơ</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-xl font-semibold text-gray-700">Tên người dùng</label>
            <input
              type="text"
              value={username}
              disabled
              className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md sm:text-base"
            />
          </div>
          <div className="mb-6">
            <label className="block text-xl font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md sm:text-base"
            />
          </div>
          <div className="mb-6">
            <label className="block text-xl font-semibold text-gray-700">Ảnh đại diện</label>
            <div className="mt-2 flex items-center">
              <img
                src={profileImage ? URL.createObjectURL(profileImage) : (avatarUrl)}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover border border-gray-300"
              />
              
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-xl font-semibold text-gray-700">Họ tên đầy đủ</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-xl font-semibold text-gray-700">Số điện thoại</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-xl font-semibold text-gray-700">Địa chỉ</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-xl font-semibold text-gray-700">Giới tính</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
              required
            >
              <option value="" disabled>Chọn giới tính</option>
              <option value="0">Nam</option>
              <option value="1">Nữ</option>
              <option value="2">Khác</option>
            </select>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileUser;
