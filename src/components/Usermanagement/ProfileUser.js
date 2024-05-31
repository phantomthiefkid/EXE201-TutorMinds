import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfileUser() {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('Han');
  const [phone, setPhone] = useState('0888577863');
  const [address, setAddress] = useState('Quang Tri');
  const [gender, setGender] = useState('male');
  const [username, setUsername] = useState('thienloc@gmail.com');
  const [email, setEmail] = useState('thienloc@gmail.com');
  const [avatarUrl, setAvatarUrl] = useState('https://th.bing.com/th/id/R.910cabc7d55bb965d6c42571a2b7973a?rik=HRpRhGm%2fnmbF8g&pid=ImgRaw&r=0');
  
  const defaultImage = "https://via.placeholder.com/150"; // Link ảnh mặc định

  useEffect(() => {
    // Lấy thông tin người dùng từ API
    axios.get('/api/user/profile')
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
      .catch(error => console.error('Error fetching user profile:', error));
  }, []);

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
          },
        });

        updatedAvatarUrl = imageResponse.data.url; // URL của ảnh sau khi tải lên
      }

      // Cập nhật thông tin người dùng
      const userUpdateDto = {
        email,
        username,
        fullName,
        phone,
        address,
        gender,
        avatar: updatedAvatarUrl,
      };

      const response = await axios.put('/api/user/profile', userUpdateDto);
      console.log('User profile updated:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Cập nhật hồ sơ</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tên người dùng</label>
          <input
            type="text"
            value={username}
            disabled
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
          <div className="mt-2 flex items-center">
            <img
              src={profileImage ? URL.createObjectURL(profileImage) : (avatarUrl || defaultImage)}
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="ml-5 bg-white rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Họ tên đầy đủ</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Giới tính</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="" disabled>Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileUser;
