import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalUpdateCourse = ({ course, onClose, onUpdateSuccess }) => {
  const [id, setId] = useState(course.id);
  const [title, setTitle] = useState(course.title);
  const [price, setPrice] = useState(course.price);
  const [image, setImage] = useState(course.image);
  const [description, setDescription] = useState(course.description);
  const [simpleDescription, setSimpleDescription] = useState(course.simpleDescription);
  const [lessons, setLessons] = useState([]);
  const [lessonVideoFiles, setLessonVideoFiles] = useState([]);
  const [newImageFile, setNewImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
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
        setLessons(response.data.lessonsList);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchLessons();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!newImageFile) return image;

    const formData = new FormData();
    formData.append('files', newImageFile, newImageFile.name);

    const token = localStorage.getItem('token');
    const response = await axios.post('https://fams-management.tech/api/files', formData, {
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  };

  const uploadLessonVideo = async (index) => {
    if (!lessonVideoFiles[index]) return lessons[index].url;

    const formData = new FormData();
    formData.append('files', lessonVideoFiles[index], lessonVideoFiles[index].name);

    const token = localStorage.getItem('token');
    const response = await axios.post('https://fams-management.tech/api/files', formData, {
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  };

  const handleLessonVideoChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedLessonVideoFiles = [...lessonVideoFiles];
      updatedLessonVideoFiles[index] = file;
      setLessonVideoFiles(updatedLessonVideoFiles);
    }
  };

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...lessons];
    updatedLessons[index][field] = value;
    setLessons(updatedLessons);
  };

  const handleLessonUpdate = async (index) => {
    const uploadedVideoUrl = await uploadLessonVideo(index);

    const updatedLessonData = {
      id: lessons[index].id,
      title: lessons[index].title,
      description: lessons[index].description,
      url: uploadedVideoUrl || lessons[index].url
    };

    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        `https://fams-management.tech/api/lesson/${id}`,
        [updatedLessonData],
        {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      if (res.status === 200) {
        toast.success(`Lesson ${index + 1} updated successfully!`);
      }
    } catch (error) {
      toast.error('Error updating lesson: ' + error.message);
      console.error("Error updating lesson:", error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const uploadedImageUrl = await uploadImage();

    const updatedCourse = {
      description,
      simpleDescription,
      title,
      price,
      image: uploadedImageUrl,
      lessons: lessons
    };

    try {
      const res = await axios.put(
        `https://fams-management.tech/course/${id}`,
        updatedCourse,
        {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      if (res.status === 200) {
        toast.success("Update successful!");
        onClose();
        onUpdateSuccess();
      }
    } catch (error) {
      toast.error('Error updating course: ' + error.message);
      console.error("Error updating course:", error);
    }
  };

  const addLesson = () => {
    const newLesson = { title: '', description: '', url: '' };
    setLessons([...lessons, newLesson]);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <ToastContainer />
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Cập nhật khóa học</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-semibold mb-2">Tiêu đề khóa học</label>
            <input
              id="title"
              type="text"
              className="border w-full p-3 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-lg font-semibold mb-2">Giá</label>
            <input
              id="price"
              type="number"
              className="border w-full p-3 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-lg font-semibold mb-2">Chi tiết bài giảng</label>
            <textarea
              id="description"
              className="border w-full p-3 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="simpleDescription" className="block text-lg font-semibold mb-2">Mô tả ngắn gọn</label>
            <textarea
              id="simpleDescription"
              className="border w-full p-3 rounded"
              value={simpleDescription}
              onChange={(e) => setSimpleDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            {previewImage ? (
              <div className="flex justify-center mb-4">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="rounded-full border border-gray-300 w-40 h-40 object-cover"
                />
              </div>
            ) : (
              <div className="flex justify-center mb-4">
                <img
                  src={image}
                  alt="Current"
                  className="rounded-full border border-gray-300 w-40 h-40 object-cover"
                />
              </div>
            )}
            <label htmlFor="image" className="block text-lg font-semibold mb-2">Ảnh</label>
            <input
              id="image"
              type="file"
              className="border w-full p-3 rounded"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md max-h-64 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Danh sách bài giảng</h3>
            {lessons.map((lesson, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
                <label className="block mb-2 font-semibold">Bài giảng {index + 1}</label>
                <input
                  type="text"
                  name="title"
                  value={lesson.title}
                  className="border p-2 w-full rounded"
                  placeholder="Title"
                  onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
                />
                <textarea
                  name="description"
                  value={lesson.description}
                  className="mt-2 border p-2 w-full rounded"
                  placeholder="Description"
                  onChange={(e) => handleLessonChange(index, 'description', e.target.value)}
                />
                <div className="mt-2">
                  <label className="block mb-2 font-semibold">Video URL</label>
                  {lesson.url && (
                    <video controls className="w-full">
                      <source src={lesson.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <input
                    type="file"
                    name="url"
                    accept="video/*"
                    className="border p-2 w-full rounded"
                    placeholder="Video URL"
                    onChange={(e) => handleLessonVideoChange(index, e)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleLessonUpdate(index)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Cập nhật bài giảng
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLesson}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Thêm bài giảng
            </button>
          </div>

          <div className="flex justify-end mt-6">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
              type="button"
            >
              Hủy
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateCourse;
