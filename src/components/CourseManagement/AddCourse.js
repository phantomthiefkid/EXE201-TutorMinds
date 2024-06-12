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
    img: ""
  });

  const [lessons, setLessons] = useState([{ title: "", description: "", url: "" }]);
  const [courseImageFile, setCourseImageFile] = useState(null); // State để lưu trữ tạm thời ảnh khóa học
  const [lessonVideoFiles, setLessonVideoFiles] = useState([]); // State để lưu trữ tạm thời video bài học

  useEffect(() => {
    axios.get(`https://fams-management.tech/api/users/${emailToken}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setCourse((prevCourse) => ({
          ...prevCourse, // Giữ nguyên các giá trị khác của course
          tutorId: response.data.id
        }));
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

  const handleCourseImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseImageFile(file); // Lưu tạm thời ảnh khóa học
    }
  };

  const handleLessonVideoUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newLessonVideoFiles = [...lessonVideoFiles];
      newLessonVideoFiles[index] = file; // Lưu tạm thời video bài học
      setLessonVideoFiles(newLessonVideoFiles);
    }
  };

  const uploadCourseImage = async () => {
    if (!courseImageFile) return "";

    const formData = new FormData();
    formData.append('files', courseImageFile, courseImageFile.name);

    const response = await axios.post('https://fams-management.tech/api/files', formData, {
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload course image and get URL
      const imgURL = await uploadCourseImage();

      // Update course with img URL
      const updatedCourse = { ...course, img: imgURL };

      // Upload lesson videos
      for (let i = 0; i < lessonVideoFiles.length; i++) {
        const file = lessonVideoFiles[i];
        if (file) {
          const formData = new FormData();
          formData.append('files', file, file.name);

          const response = await axios.post("https://fams-management.tech/api/files", formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });

          const newLessons = [...lessons];
          newLessons[i].url = response.data;
          setLessons(newLessons);
        }
      }

      // Gửi request POST để thêm course
        console.log(course)
      
      const courseResponse = await axios.post('https://fams-management.tech/course', updatedCourse, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const courseId = courseResponse.data.id;

      // Gửi từng request POST để thêm các lesson
      for (let lesson of lessons) {
        console.log(lesson)
        await axios.post(`https://fams-management.tech/api/lesson/${courseId}`, [lesson], {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
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
    <div className="container mx-auto p-4 max-w-full w-screen">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 bg-gray-200 p-4 rounded-lg">
          {/* Left Sidebar */}
          <div className="col-span-3 bg-gray-200 p-4 rounded-lg">
            <img 
              src="https://th.bing.com/th/id/OIP.LWv-fYuu1KLEmWH_SDbUyAHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7" 
              alt="Ad" 
              className="w-full h-auto mb-4 rounded-lg shadow-lg border border-gray-300 mt-12" 
            />
            <img 
              src="https://th.bing.com/th/id/OIP.TGXiIDJlIVgSN9X_9wCyHAHaE7?w=256&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7" 
              alt="Ad" 
              className="w-full h-auto mb-4 rounded-lg shadow-lg border border-gray-300 mt-12" 
            />
          </div>
          {/* Add more ads if needed */}
        </div>

        <div className="col-span-6 bg-white p-6 rounded-lg shadow-md">
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

                    <div className="col-span-3 bg-gray-200 p-4 rounded-lg">
                    {/* Right Sidebar */}
                    <div className="col-span-3 bg-gray-200 p-4 rounded-lg">
                    <img
                    src="https://th.bing.com/th/id/OIP.3rie0I0tdDl1V2qSJaUd3wHaEt?w=269&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                    alt="Ad"
                    className="w-full h-auto mb-4 rounded-lg shadow-lg border border-gray-300 mt-12"
                    />
                    <img
                    src="https://th.bing.com/th/id/OIP.EzaQRQNkCV2a6p8SkR1NYQHaEK?rs=1&pid=ImgDetMain"
                    alt="Ad"
                    className="w-full h-auto mb-4 rounded-lg shadow-lg border border-gray-300 mt-12"
                    />
                    </div>

                    {/* Add more ads if needed */}
                    </div>
                    </div>
                    </div>
                    );
};

export default AddCourse;
