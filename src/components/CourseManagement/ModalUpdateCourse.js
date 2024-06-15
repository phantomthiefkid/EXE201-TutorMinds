import React, { useState } from 'react';
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
  const [newImageFile, setNewImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  console.log(course);

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

  const handleUpdate = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const uploadedImageUrl = await uploadImage();

    const updatedCourse = {
      description,
      simpleDescription,
      title,
      price,
      image: uploadedImageUrl
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
        toast.success("Thành công!");
        onClose();
        onUpdateSuccess();
      }
    } catch (error) {
      toast.error('Error updating course: ' + error.message);
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-2xl mb-4">Update Course</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price</label>
            <input
              type="number"
              className="border p-2 w-full"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              className="border p-2 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Simple Description</label>
            <textarea
              className="border p-2 w-full"
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
            <label className="block mb-2">Image</label>
            <input
              type="file"
              className="border p-2 w-full"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateCourse;
