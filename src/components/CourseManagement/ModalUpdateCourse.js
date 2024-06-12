import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalUpdateCourse = ({ course, onClose }) => {
  const [id, setId] = useState(course.id);
  const [title, setTitle] = useState(course.title);
  const [price, setPrice] = useState(course.price);
  const [image, setImage] = useState(course.image);
  const [description, setDescription] = useState(course.description);
  const [simpleDescription, setSimpleDescription] = useState(course.simpleDescription);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const updatedCourse = {
      description,
      simpleDescription,
      title,
      price,
      image
    };
    
    try {
      await axios.put(
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
      toast.success('Course updated successfully!', {
        onClose: () => onClose()
      });
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
