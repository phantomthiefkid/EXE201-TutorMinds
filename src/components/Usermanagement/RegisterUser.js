import React from "react";
import { Link } from "react-router-dom";
import "../css/RegisterUser.css"; // Import file CSS

const RegisterUser = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8 mt-2">
      <div className="registration-form">
        <h1>Đăng Ký Tài Khoản</h1>
        <form action="/register" method="POST">
          <div className="form-group">
            <label htmlFor="fullname">Họ và Tên</label>
            <input type="text" id="fullname" name="fullname" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật Khẩu</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Xác Nhận Mật Khẩu</label>
            <input type="password" id="confirm-password" name="confirm-password" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Số Điện Thoại</label>
            <input type="tel" id="phone" name="phone" required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Địa Chỉ</label>
            <input type="text" id="address" name="address" required />
          </div>
          <div className="form-group">
            <label htmlFor="birthdate">Ngày Sinh</label>
            <input type="date" id="birthdate" name="birthdate" required />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Giới Tính</label>
            <select id="gender" name="gender" required>
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <button type="submit">Đăng Ký</button>
        </form>
        <p className="mt-4">
          Đã có tài khoản? <Link to="/login" className="text-blue-500">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
