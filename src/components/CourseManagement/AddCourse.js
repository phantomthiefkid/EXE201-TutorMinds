import axios from "axios";
import React, { useEffect, useState } from "react";
import { getEmailDataFromToken } from "../../redux/auth/loginSlice";

const AddCourse = () => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const emailToken = getEmailDataFromToken();
  const [course, setCourse] = useState({
    id: 0,
    title: "",
    description: "",
    simpleDescription: "",
    tutorId: 0,
    price: 0,
    img: "", // Thêm field img
    lessons: []
  });

  const [lessons, setLessons] = useState([{ title: "", description: "", url: "" }]);

  useEffect(() => {
    axios.get(`https://fams-management.tech/api/users/${emailToken}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setCourse({
          ...course, // Giữ nguyên các giá trị khác của course
          tutorId: response.data.id
        })
      })
      .catch(error => console.error('Lỗi khi lấy thông tin hồ sơ người dùng:', error));
  }, [token, emailToken]);

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleLessonChange = (index, e) => {
    const { name, value } = e.target;
    const newLessons = [...lessons];
    newLessons[index][name] = value;
    setLessons(newLessons);
  };

  const addLesson = () => {
    setLessons([...lessons, { title: "", description: "", url: "" }]);
  };

  const handleCourseImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("https://fams-management.tech/upload", formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setCourse({ ...course, img: response.data.url });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleLessonVideoUpload = async (index, e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await axios.post("https://fams-management.tech/upload", formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const newLessons = [...lessons];
      newLessons[index].url = response.data.url;
      setLessons(newLessons);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Tạo URL cho course
      const url = `https://fams-management.tech/course?id=${course.id}&title=${encodeURIComponent(course.title)}&description=${encodeURIComponent(course.description)}&simpleDescription=${encodeURIComponent(course.simpleDescription)}&tutorId=${course.tutorId}&price=${course.price}&img=${encodeURIComponent(course.img)}`;

      // Gửi request POST để thêm course
      const courseResponse = await axios.post(url, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const courseId = courseResponse.data.id;

      // Gửi từng request POST để thêm các lesson
      for (let lesson of lessons) {
        await axios.post(`https://fams-management.tech/api/lesson/${courseId}`, [lesson], {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

      console.log("Course and lessons added successfully!");
      // Redirect to /courselist
      window.location.href = '/courselist';
    } catch (error) {
      console.error("Error adding course and lessons:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-4xl font-bold mb-6 text-indigo-600">Thêm Khóa Học Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-600">Thông Tin Khóa Học</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tiêu Đề</label>
              <input
                type="text"
                name="title"
                value={course.title}
                onChange={handleCourseChange}
                className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg bg-gray-300 bg-opacity-30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Giá</label>
              <input
                type="number"
                name="price"
                value={course.price}
                onChange={handleCourseChange}
                className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg bg-gray-300 bg-opacity-30"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Mô Tả</label>
              <textarea
                name="description"
                value={course.description}
                onChange={handleCourseChange}
                className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg bg-gray-300 bg-opacity-30"
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Mô Tả Ngắn Gọn</label>
              <input
                type="text"
                name="simpleDescription"
                value={course.simpleDescription}
                onChange={handleCourseChange}
                className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg bg-gray-300 bg-opacity-30"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Ảnh Khóa Học</label>
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={handleCourseImageUpload}
                className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg bg-gray-300 bg-opacity-30"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-600">Các Bài Học</h3>
          {lessons.map((lesson, index) => (
            <div key={index} className="mt-4 p-4 border border-gray-300 rounded-md">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tiêu Đề Bài Học</label>
                <input
                  type="text"
                  name="title"
                  value={lesson.title}
                  onChange={(e) => handleLessonChange(index, e)}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg bg-gray-300 bg-opacity-30"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Mô Tả Bài Học</label>
                <input
                  type="text"
                  name="description"
                  value={lesson.description}
                  onChange={(e) => handleLessonChange(index, e)}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg bg-gray-300 bg-opacity-30"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Video Bài Học</label>
                <input
                  type="file"
                  name="url"
                  accept="video/*"
                  onChange={(e) => handleLessonVideoUpload(index, e)}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg bg-gray-300 bg-opacity-30"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addLesson}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Thêm Bài Học
          </button>
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Lưu Khóa Học
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
