import React from "react";
import {
  Book,
  People,
  Broadcast,
  CheckSquareFill,
} from "react-bootstrap-icons";

const Homepage = () => {
  return (
    <>
      <div class="container mx-auto w-full p-6">
        <h2 class="text-3xl font-bold mb-4 text-blue-500">
          Chào mừng bạn đến với dịch vụ tìm kiếm gia sư
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
      <div class="container mx-auto max-w-full p-6 bg-blue-100 z-10">
        <h2 class="text-3xl font-bold text-blue-500 mb-3">Dịch Vụ</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 bg-white rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
            <div class="flex items-center mb-4">
              <Book class="mr-2 text-blue-500" />
              <h3 class="text-lg font-bold text-blue-500">Gia sư trực tuyến</h3>
            </div>
            <p class="text-gray-600">
              Cung cấp các lớp học 1-1 online cho học sinh ở mọi lứa tuổi.
            </p>
          </div>

          <div class="p-6 bg-white rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
            <div class="flex items-center mb-4">
              <Broadcast class="mr-2 text-blue-500" />
              <h3 class="text-lg font-bold text-blue-500">
                Lớp học chuyên môn
              </h3>
            </div>
            <p class="text-gray-600">
              Tham gia học với các giảng viên có nhiều năm kinh nghiệm giảng
              dạy.
            </p>
          </div>

          <div class="p-6 bg-white rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
            <div class="flex items-center mb-4">
              <People class="mr-2 text-blue-500" />
              <h3 class="text-lg font-bold text-blue-500">
                Cố vấn các ngành học
              </h3>
            </div>
            <p class="text-gray-600">
              Phát triển các kỹ năng và định hướng nghề nghiệp cho học sinh.
            </p>
          </div>
        </div>

        <div class="container mx-auto px-6 py-10">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src="https://us.123rf.com/450wm/pitinan/pitinan2106/pitinan210600827/170217332-video-call-business-people-meeting-on-virtual-workplace-or-remote-office-telework-conference-call.jpg?ver=6"
              alt="benefit"
              class="rounded-lg shadow-lg w-10/12"
            />
            <div class="flex flex-col justify-center">
              <h2 class="text-3xl font-bold text-center mb-8 text-blue-600">
                Bạn sẽ nhận được gì sau khi tham gia khóa học?
              </h2>
              <div class="space-y-6">
                <div class="flex items-center bg-white rounded-lg shadow-md p-5">
                  <span class="text-green-500 text-3xl inline-block mr-4">
                    <CheckSquareFill />
                  </span>
                  <div>
                    <h3 class="text-xl font-bold">
                      Học 1 kèm 1 với đa ngôn ngữ
                    </h3>
                    <p class="text-gray-600">
                      Được học với những giảng viên có chuyên môn cao.{" "}
                      <a href="#" class="text-blue-500 underline">
                        Xem thêm
                      </a>
                    </p>
                  </div>
                </div>
                <div class="flex items-center bg-white rounded-lg shadow-md p-5">
                  <span class="text-green-500 text-3xl inline-block mr-4">
                    <CheckSquareFill />
                  </span>
                  <div>
                    <h3 class="text-xl font-bold">
                      Đội ngũ giảng viên chất lượng, năng động
                    </h3>
                    <p class="text-gray-600">
                      Phát triển các kỹ năng cá nhân, phát triển hơn về các mối
                      quan hệ.{" "}
                      <a href="#" class="text-blue-500 underline">
                        Xem thêm
                      </a>
                    </p>
                  </div>
                </div>
                <div class="flex items-center bg-white rounded-lg shadow-md p-5">
                  <span class="text-green-500 text-3xl inline-block mr-4">
                    <CheckSquareFill />
                  </span>
                  <div>
                    <h3 class="text-xl font-bold">Học tập từ xa</h3>
                    <p class="text-gray-600">
                      Đa dạng các phương pháp học như remote, online và offline.{" "}
                      <a href="#" class="text-blue-500 underline">
                        Xem thêm
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <div class="text-center p-6">
          <h1 class="text-3xl mb-4">Bạn đã sẵn sàng để bắt đầu?</h1>
          <h3 class="text-xl mb-6">
            Liên hệ với chúng tôi ngay hôm nay để đặt lịch học
          </h3>
          <button class="bg-blue-400 py-3 px-6 rounded-full hover:bg-blue-600 ">
            Bắt đầu
          </button>
        </div>
      </div>
    </>
  );
};

export default Homepage;
