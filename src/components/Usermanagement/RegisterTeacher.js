import React from "react";
import { Link } from "react-router-dom";
import "../css/RegisterTeacher.css"; // Import file CSS

const RegisterTeacher = () => {
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://giasudaykemtainha.vn/uploads/posts/gia-su-online-day-truc-tuyen-qua-mang.jpg")',
      }}>
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
          <button className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out" type="submit">Đăng Ký</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTeacher;
