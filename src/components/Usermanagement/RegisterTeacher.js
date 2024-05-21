import React from "react";
import { Link } from "react-router-dom";

const RegisterTeacher = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8 mt-2">
      <div className="registration-form">
        <h1>Đăng Ký Tài Khoản Gia Sư</h1>
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
            <label htmlFor="subjects">Môn Dạy</label>
            <input type="text" id="subjects" name="subjects" required />
          </div>
          <div className="form-group">
            <label htmlFor="experience">Kinh Nghiệm (năm)</label>
            <input type="number" id="experience" name="experience" required min={0} />
          </div>
          <button type="submit">Đăng Ký</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTeacher;
