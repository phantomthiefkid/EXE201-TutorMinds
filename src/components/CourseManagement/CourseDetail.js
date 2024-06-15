import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Check2,
  Laptop,
  FileEarmarkArrowDown,
  Shield,
} from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://fams-management.tech/course/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, []);
  if (!course) {
    return <div>Loading...</div>;
  }

  console.log(course);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-full px-4 md:px-5 mx-auto mt-6">
      <div class="text-white flex flex-col h-full min-h-[280px] w-full rounded-sm !bg-gray-900 px-12 py-8">
        <h2 class="text-3xl mb-4">{course.title}</h2>
        <p className="text-xl line-clamp-5 w-1/2">
          {course.description}
          <br />
          <span className="line-clamp-1">{course.simpleDescription}</span>
        </p>

        <div class="flex gap-0.5 my-4">
          <p className="text-lg mr-2 text-yellow-400">4.7</p>
          <svg class="h-6 w-6 shrink-0 fill-amber-400" viewBox="0 0 256 256">
            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
          </svg>
          <svg class="h-6 w-6 shrink-0 fill-amber-400" viewBox="0 0 256 256">
            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
          </svg>
          <svg class="h-6 w-6 shrink-0 fill-amber-400" viewBox="0 0 256 256">
            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
          </svg>
          <svg class="h-6 w-6 shrink-0 fill-gray-300" viewBox="0 0 256 256">
            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
          </svg>
          <svg class="h-6 w-6 shrink-0 fill-gray-300" viewBox="0 0 256 256">
            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
          </svg>
          <p className="text-lg ml-2"> 30 học viên</p>
        </div>
        <span className="flex">
          Được tạo bởi{" "}
          <p className="text-indigo-300 px-2">{course.tutor.fullName}</p>
        </span>
        <span className="mt-4">Cập nhật gần nhất {course.updatedDate}</span>
      </div>
      <div className="border w-2/4 mt-4 ml-14 p-6">
        <h2 className="text-3xl font-bold">Bạn sẽ học được gì?</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-left">
          {course.lessonsList && course.lessonsList.length > 0 ? (
            course.lessonsList.map((lesson, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check2 /> {lesson.title}
              </li>
            ))
          ) : (
            <li>Không có bài học nào được tìm thấy.</li>
          )}
        </ul>
      </div>
      <div class="-mt-[560px] lg:px-30 xl:px-40 flex justify-end">
        <div class="flex flex-col rounded-sm bg-white text-gray-700 shadow-md lg:h-max lg:scale-110 z-10 translate-y-0 w-2/6 sticky mt-48">
          <div class="p-6 text-center">
            <img
              src="https://www.macobserver.com/wp-content/uploads/2019/07/workfeatured-zoom.png"
              alt="video"
              class="w-full h-auto"
            />
            <h3 class="antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900 flex justify-center mt-5 mb-2">
              {course.price} VNĐ
            </h3>
            <button class="border w-full py-3 bg-purple-500 text-white font-bold hover:bg-purple-700">
              Thêm vào giỏ hàng
            </button>
            <button class="border border-black w-full mt-4 py-3 font-bold hover:bg-gray-200">
              Mua khóa học
            </button>
            <h5 class="antialiased tracking-normal font-sans text-xl font-bold leading-snug flex mt-2 mb-2">
              Khóa học bao gồm:
            </h5>
            <span class="flex items-center gap-2">
              <Laptop />
              16 phần • 51 bài học • 9h 30m tổng thời gian
            </span>
            <span class="flex items-center gap-2">
              <FileEarmarkArrowDown />
              95 tài nguyên có thể tải xuống
            </span>
            <span class="flex items-center gap-2">
              <Shield />
              Truy cập trọn đời
            </span>
          </div>
        </div>
      </div>

      <div className="ml-14 my-10 w-2/4">
        <h2 className="text-3xl font-bold">Nội dung khóa học</h2>
        <div className="flex justify-between mt-4">
          <p className="">16 phần • 51 bài học • 9h 30m tổng thời gian</p>
          <p className="text-blue-600 font-bold">Mở rộng tất cả phần</p>
        </div>

        {course.lessonsList && course.lessonsList.length > 0 ? (
          course.lessonsList.map((lesson, index) => (
            <div
              id={`accordion-collapse-${index}`}
              data-accordion="collapse"
              key={index}
            >
              <h2 id={`accordion-collapse-heading-${index}`}>
                <button
                  type="button"
                  className="flex items-center w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 gap-3"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`accordion-collapse-body-${index}`}
                >
                  <svg
                    className={`w-3 h-3 ${
                      activeIndex === index ? "rotate-0" : "rotate-180"
                    } shrink-0 transition-transform`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                  <span className="font-bold">{lesson.title}</span>
                </button>
              </h2>
              <div
                id={`accordion-collapse-body-${index}`}
                className={`${
                  activeIndex === index ? "block" : "hidden"
                } p-5 border border-b-0 border-gray-200`}
                aria-labelledby={`accordion-collapse-heading-${index}`}
              >
                <div className="mb-2 text-blue-700 hover:text-blue-400">
                  <Link to={`/video/${id}`}>{lesson.description}</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <li>Không có bài học nào được tìm thấy.</li>
        )}

        <h2 className="text-3xl font-bold py-5">Yêu cầu</h2>
        <ul class="list-disc list-inside ml-4 space-y-2">
          <li>
            Toán học cơ bản: cộng, trừ, nhân, chia, đo lường, hình học, áp dụng
            vào vật lý.
          </li>
          <li>
            Phân tích, suy luận: Áp dụng công thức vào tình huống thực tế, rút
            ra kết luận.
          </li>
          <li>
            Hiếu kỳ, tò mò: khám phá cách thức hoạt động và hiểu sâu về vật lý.
          </li>
        </ul>
      </div>

      <div className="w-full max-w-7xl mx-14 mb-5">
        <h2 className="text-3xl font-bold">Mô tả</h2>
        <div className="my-2">{course.description}</div>
        <p>{course.simpleDescription}</p>

        <h2 className="text-3xl font-bold py-5">Khóa học này dành cho ai:</h2>
        <ul class="list-disc list-inside ml-4 space-y-2">
          <li>
            Học sinh lớp 7: Đây là nhóm đối tượng chính được định hướng học vật
            lý theo chương trình giáo dục trường học. Họ học các khái niệm và
            nguyên lý cơ bản của vật lý thông qua sách giáo khoa, bài giảng và
            thí nghiệm trong lớp học.
          </li>
          <li>
            Người tự học: Có một số người có niềm đam mê với vật lý và muốn tự
            học. Họ có thể tìm kiếm sách, bài giảng trực tuyến, video hướng dẫn
            và các tài liệu khác để tự nghiên cứu và hiểu về vật lý lớp 7.
          </li>
          <li>
            Giáo viên: Giáo viên vật lý là người trực tiếp truyền đạt kiến thức
            và kỹ năng về vật lý cho học sinh lớp 7. Họ thường sử dụng phương
            pháp giảng dạy sáng tạo và thực hành để giúp học sinh hiểu sâu hơn
            về các khái niệm vật lý.
          </li>
          <li>
            Phụ huynh: Phụ huynh cũng có thể đóng vai trò quan trọng trong việc
            hỗ trợ con em họ học vật lý. Họ có thể giúp đỡ trong việc làm bài
            tập, cung cấp tài liệu học thêm, hoặc tạo điều kiện để thực hiện các
            thí nghiệm nhỏ tại nhà. Sự khích lệ và hỗ trợ từ phụ huynh có thể
            giúp tăng cường sự tự tin và thành công của học sinh trong việc học
            vật lý.
          </li>
        </ul>

        <div className="border mt-4 p-6">
          <h2 className="text-3xl font-bold mb-5 text-sky-500">Đánh giá</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 mb-2">
            <img
              src="https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/405341235_1774049269674530_8472061970839104134_n.jpg?stp=dst-jpg_p526x296&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFJUVqz-fUD2ltXZ-nsL8Db_Q6zlIRbcIb9DrOUhFtwhoCloy0xduU5DbSlr_34JAx9dtagA58_5NEts2VEVzeX&_nc_ohc=L4xoalfqFywQ7kNvgFAeqXo&_nc_ht=scontent.fhan14-2.fna&oh=00_AYAg_jRVJWgkIK-sjAoam8Iumf7hV-MzhGqeK_2851eBOA&oe=665C9830"
              alt="Tutor"
              className="rounded-full w-28 h-28 md:w-28 md:h-28 mb-4 md:mb-0 border-4 border-gray-200 shadow-sm"
            />
            <div className="text-center md:text-left">
              <h1 className="text-xl font-bold text-gray-800">Thầy Giáo Ba</h1>
              <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600">
                <p className="text-lg">21 khóa học</p>
              </div>
              <div className="flex items-center justify-center md:justify-start mt-2 text-gray-600">
                <p className="text-lg">3 đánh giá</p>
              </div>
            </div>
          </div>
          <div class="flex gap-0.5">
            <svg class="h-6 w-6 shrink-0 fill-amber-400" viewBox="0 0 256 256">
              <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
            </svg>
            <svg class="h-6 w-6 shrink-0 fill-amber-400" viewBox="0 0 256 256">
              <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
            </svg>
            <svg class="h-6 w-6 shrink-0 fill-amber-400" viewBox="0 0 256 256">
              <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
            </svg>
            <svg class="h-6 w-6 shrink-0 fill-gray-300" viewBox="0 0 256 256">
              <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
            </svg>
            <svg class="h-6 w-6 shrink-0 fill-gray-300" viewBox="0 0 256 256">
              <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
            </svg>
            <p className="text-lg ml-2"> 2 tháng trước</p>
          </div>
          <p>
            Ngạc nhiên trước kiến ​​thức + khả năng giảng dạy của Al. Vượt quá
            mọi mong đợi của tôi! Đặc biệt thích tự động hóa GUI. Thực sự ước gì
            tôi đã tìm thấy khóa học này khi tôi vẫn đang làm việc trong lĩnh
            vực công nghệ nhiều năm trước...có thể tự viết kịch bản và tiết kiệm
            rất nhiều thời gian cho nhóm Kỹ thuật của chúng tôi (và bản thân
            tôi). Trong hai tuần qua tôi đã viết những kịch bản giúp tiết kiệm
            thời gian làm việc và thậm chí là một vài kịch bản dành cho người vợ
            (bây giờ người này nghĩ rằng tôi rất xuất sắc) nên điều đó khá tuyệt
            vời.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
