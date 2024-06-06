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
      });

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




 
  const [sections, setSections] = useState([{ title: "", lessons: [{ title: "" }] }]);

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;
    const newSections = [...sections];
    newSections[index][name] = value;
    setSections(newSections);
  };

  const handleLessonChange = (sectionIndex, lessonIndex, e) => {
    const { name, value } = e.target;
    const newSections = [...sections];
    newSections[sectionIndex].lessons[lessonIndex][name] = value;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, { title: "", lessons: [{ title: "" }] }]);
  };

  const addLesson = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].lessons.push({ title: "" });
    setSections(newSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dùng template string để tạo URL có các thông tin của course
      const url = `https://fams-management.tech/course?id=${course.id}&title=${encodeURIComponent(course.title)}&description=${encodeURIComponent(course.description)}&simpleDescription=${encodeURIComponent(course.simpleDescription)}&tutorId=${course.tutorId}&price=${course.price}`;
  
      // Gửi request POST với URL được tạo
      await axios.post(url, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log("Course added successfully!", course);
      // Redirect to /courselist
      window.location.href = '/courselist';
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-4xl font-bold mb-6 text-indigo-600">Thêm Khóa Học Mới</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-green-600">Thông Tin Khóa Học</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tiêu Đề</label>
              <input
                type="text"
                name="title"
                value={course.title}
                onChange={handleCourseChange}
                className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Giá</label>
              <input
                type="number"
                name="price"
                value={course.price}
                onChange={handleCourseChange}
                className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Mô Tả</label>
              <textarea
                name="description"
                value={course.description}
                onChange={handleCourseChange}
                className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Mô Tả Ngắn Gọn</label>
              <input
                type="text"
                name="simpleDescription"
                value={course.simpleDescription}
                onChange={handleCourseChange}
                className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-green-600">Các Phần</h3>
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mt-4 p-4 border border-gray-300 rounded-md">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tiêu Đề Phần</label>
                <input
                  type="text"
                  name="title"
                  value={section.title}
                  onChange={(e) => handleSectionChange(sectionIndex, e)}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                />
              </div>
              <div className="mt-4">
                <h4 className="text-md font-medium text-blue-600">Các Bài Học</h4>
                {section.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Tiêu Đề Bài Học</label>
                    <input
                      type="text"
                      name="title"
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(sectionIndex, lessonIndex, e)}
                      className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addLesson(sectionIndex)}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Thêm Bài Học
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Thêm Phần
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
