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
  const [avatarUrl, setAvatarUrl] = useState('');
  const emailToken = getEmailDataFromToken();
  const token = localStorage.getItem('token');

  const fetchUserData = () => {
    axios.get(`https://fams-management.tech/api/users/${emailToken}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        const { fullName, phone, address, gender, username, email, avatar } = response.data;
        setFullName(fullName);
        setPhone(phone);
        setAddress(address);
        setGender(gender);
        setUsername(username);
        setEmail(email);
        setAvatarUrl(avatar);
      })
      .catch(error => console.error('Lỗi khi lấy thông tin hồ sơ người dùng:', error));
  };

  useEffect(() => {
    fetchUserData();
  }, [token, emailToken]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let updatedAvatarUrl = avatarUrl;

      if (profileImage) {
        const formData = new FormData();
        formData.append('files', profileImage, profileImage.name);

        const imageResponse = await axios.post('https://fams-management.tech/api/files', formData, {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });

        updatedAvatarUrl = imageResponse.data;
      }

      const userDto = {
        email,
        username,
        fullName,
        phone,
        address,
        gender: parseInt(gender, 10),
        avatar: updatedAvatarUrl,
      };
      const response = await axios.put(`https://fams-management.tech/api/users/users?email=${encodeURIComponent(email)}`, userDto, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setAvatarUrl(updatedAvatarUrl);
        fetchUserData(); // Refresh user data
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        <ToastContainer />
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Hồ Sơ Của Tôi</h2>
        <p className="mb-8 text-gray-600">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium">Tên đăng nhập</label>
              <input
                type="text"
                value={username}
                disabled
                className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium">Tên</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium">Số điện thoại</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium">Địa chỉ</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium">Giới tính</label>
              <div className="mt-2 flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="0"
                    checked={gender === "0"}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Nam</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="1"
                    checked={gender === "1"}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Nữ</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="2"
                    checked={gender === "2"}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Khác</span>
                </label>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium">Ngày sinh</label>
              <div className="mt-2 flex space-x-4">
                <select className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md">
                  <option value="12">12</option>
                  {/* Add other days */}
                </select>
                <select className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md">
                  <option value="10">Tháng 10</option>
                  {/* Add other months */}
                </select>
                <select className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md">
                  <option value="2002">2002</option>
                  {/* Add other years */}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={profileImage ? URL.createObjectURL(profileImage) : avatarUrl}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover border-4 border-gray-300 mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-600"
            />
            <p className="mt-2 text-gray-500 text-sm">Dung lượng file tối đa 1 MB. Định dạng: JPEG, .PNG</p>
            <button
              type="submit"
              className="mt-8 w-full py-3 px-4 border border-transparent rounded-md text-lg font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileUser;
