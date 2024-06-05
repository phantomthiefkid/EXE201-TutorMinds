import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const CourseList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      try {
        const response = await axios.get('https://fams-management.tech/course?pageNo=0&pageSize=10', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCourses(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredCourses = courses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "" || course.subject === filter)
    );
  });

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="h-6 w-6 shrink-0 fill-yellow-400"
            viewBox="0 0 256 256"
          >
            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
          </svg>
        ))}
        {halfStar && (
          <svg
            key="half"
            className="h-6 w-6 shrink-0 fill-yellow-400"
            viewBox="0 0 256 256"
          >
            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4zM128 192.8v-132L105.1 82.6 90 130.1l-35.6 4.6 27 22.8L63.3 200 128 163.6z"></path>
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="h-6 w-6 shrink-0 fill-gray-300"
            viewBox="0 0 256 256"
          >
            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
          </svg>
        ))}
      </>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full max-w-7xl px-4 md:px-5 mx-auto mt-10">
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="border p-2 rounded w-1/3"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className="border p-2 rounded ml-2"
            value={filter}
            onChange={handleFilter}
          >
            <option value="">Lọc theo môn học</option>
            <option value="Toán">Toán</option>
            <option value="Lý">Lý</option>
            <option value="Hóa">Hóa</option>
            <option value="Anh Ngữ">Anh Ngữ</option>
            <option value="Văn">Văn</option>
          </select>
        </div>

        {filteredCourses.map((course) => (
          <Link to={`/coursedetail/${course.id}`} onClick={() => window.scrollTo(0, 0)} key={course.id}>
            <div
              className="rounded-sm border-2 border-gray-200 p-4 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto"
            >
              <div className="col-span-12 lg:col-span-2 img box">
                <img
                  src={course.tutor.avatar}
                  alt={course.title}
                  className="max-lg:w-full lg:w-[200px]"
                />
              </div>
              <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                <div className="flex items-center justify-between w-full mb-4">
                  <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                    {course.title}
                  </h5>
                  <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
                    ${course.price}
                  </h6>
                </div>
                <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                  {course.simpleDescription}{" "}
                  <a href="javascript:;" className="text-indigo-600">
                    More....
                  </a>
                </p>
                <div className="flex">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-0.5">
                      <p className="text-lg mr-2">Rating: {course.rating ? course.rating : "N/A"}</p>
                      {course.rating ?                         renderStars(course.rating)
                      :
                        [...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-6 w-6 shrink-0 fill-yellow-300`}
                            viewBox="0 0 256 256"
                          >
                            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
                          </svg>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                  Total Hours: {course.totalHours ? course.totalHours : "10h"} . Lectures: {course.tutor.fullName} . All Video
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CourseList;

