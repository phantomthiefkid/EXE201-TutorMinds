import React from "react";
// import { PlusCircle } from "react-bootstrap-icons";

const Homepage = () => {
  return (
    <>
      <div class="container mx-auto w-full p-6">
        <h2 class="text-3xl font-bold mb-4 text-blue-500">
          Chào mừng bạn đến với dịch vụ gia tìm kiếm gia sư
        </h2>
        <p class="text-gray-600 text-xl">
          Chúng tôi cung cấp các dịch vụ tìm kiếm gia sư uy tín, chất lượng. Cảm
          ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi.
        </p>
        <img
          src="https://truonghoc247.vn/wp-content/uploads/2023/08/gia-su-online-day-truc-tuyen-qua-mang_6.jpg"
          alt="homepage"
          className="rounded-sm mx-auto mt-3"
        />
      </div>
      <div class="container mx-auto max-w-full p-6 bg-blue-100">
        <h2 class="text-3xl font-bold text-blue-500 mb-3">Dịch Vụ</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 bg-gray-100 rounded-lg shadow-sm">
            <h3 class="text-lg font-bold mb-4 text-blue-500">
              Gia sư trực tuyến
            </h3>
            <p class="text-gray-600">
              Cung cấp các lớp học 1-1 online cho học sinh ở mọi lứa tuổi.
            </p>
          </div>

          <div class="p-6 bg-gray-100 rounded-lg shadow-sm">
            <h3 class="text-lg font-bold mb-4 text-blue-500">
              Lớp học chuyên môn
            </h3>
            <p class="text-gray-600">
              Tham gia học với các giảng viên có nhiều năm kinh nghiệm giảng
              dạy.
            </p>
          </div>

          <div class="p-6 bg-gray-100 rounded-lg shadow-sm">
            <h3 class="text-lg font-bold mb-4 text-blue-500">
              Cố vấn các ngành học
            </h3>
            <p class="text-gray-600">
              Phát triển các kỹ năng và định hướng nghề nghiệp cho học sinh.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
