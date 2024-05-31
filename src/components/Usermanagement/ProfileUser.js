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
  const defaultImage = "https://via.placeholder.com/150"; // Link ảnh mặc định

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
      .catch(error => console.error('Error fetching user profile:', error));
  }, [token, emailToken]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let updatedAvatarUrl = avatarUrl;

      // Nếu người dùng chọn ảnh mới, tải ảnh lên trước
      if (profileImage) {
        const formData = new FormData();
        formData.append('file', profileImage);

        const imageResponse = await axios.post('/api/upload/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        });

        updatedAvatarUrl = imageResponse.data.url; // URL của ảnh sau khi tải lên
      }

      // Cập nhật thông tin người dùng
      const userUpdateDto = {
        email,
        username,
        password: '', // Để trống vì không cần thiết trong trường hợp này
        fullName,
        phone,
        address,
        gender: parseInt(gender, 10), // Chuyển đổi gender sang số nguyên
        roleId: parseInt(roleId?.id, 10), // Chuyển đổi roleId sang số nguyên
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
      console.error('Error updating profile:', error);
      toast.error('Có lỗi xảy ra');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mt-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Cập nhật hồ sơ</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Tên người dùng</label>
          <input
            type="text"
            value={username}
            disabled
            className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md sm:text-sm"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md sm:text-sm"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
          <div className="mt-2 flex items-center">
            <img
              src={profileImage ? URL.createObjectURL(profileImage) : (avatarUrl || defaultImage)}
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover border border-gray-300"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="ml-4 bg-white rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Họ tên đầy đủ</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Giới tính</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileUser;
