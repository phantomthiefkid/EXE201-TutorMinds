import React, { useState } from 'react';
import axios from 'axios';

const ModalUpdateCourse = ({ course, onClose }) => {
  const [id, setId] = useState(course.id);
  const [tutorId, setTutorId] = useState(course.tutor.id);
  const [title, setTitle] = useState(course.title);
  const [price, setPrice] = useState(course.price);
  const [description, setDescription] = useState(course.description);
  const [simpleDescription, setSimpleDescription] = useState(course.simpleDescription);
  console.log(course);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token'); 
    try {
      await axios.put(`http://35.72.46.118/course/${id}`, 
        id,
        title,
        description,
        simpleDescription,
        tutorId,
        price, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('Course updated successfully!');
      onClose();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-2xl mb-4">Update Course</h2>
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
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateCourse;
