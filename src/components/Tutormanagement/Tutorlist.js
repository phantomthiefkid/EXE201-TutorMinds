import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Book, Brush } from "react-bootstrap-icons";

import { fetchTutorList } from "../../redux/TutorManagement/Tutor";

const TutorList = () => {
  const tutorsAPI = useSelector((tutor) => tutor.tutor.data);
  const totalPagesAPI = useSelector((page) => page.tutor.data.totalPages);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [tutorList, setTutorList] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  console.log("tutorPage", tutorsAPI);
  console.log("totalPage", totalPagesAPI);

  useEffect(() => {
    if (Array.isArray(tutorsAPI)) {
      setTutorList([...tutorsAPI]);
    }
  }, [tutorsAPI]);

  useEffect(() => {
    dispatch(
      fetchTutorList({
        pageSize: 8,
        pageIndex: currentPage,
        search: searchTerm,
      })
    )
      .then((response) => {
        if (response.payload.content.length === 0) {
          setCurrentPage(0);
          // setTotalPages(0);
        } else {
          setApiData(response.payload.content);
          console.log("Hello: ", response.payload.content);
          // setTotalPages(response.payload.totalPages);
        }
      })
      .catch((error) => {
        console.error("Error fetching tutors:", error);
      });
  }, [dispatch, currentPage, searchTerm]);

  useEffect(() => {
    setTutorList([...apiData]);
  }, [apiData]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleIncreasePage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleDecreasePage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div class="relative max-w-6xl mx-auto mt-10 grid grid-cols-3 justify-center">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
          <svg
            class="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          name="search"
          onChange={handleSearchChange}
          value={searchTerm}
          id="default-search"
          class="block w-full max-w-5xl p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Tìm kiếm..."
          required
        />
      </div>

      <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {Array.isArray(tutorList) &&
            tutorList.map((tutor, index) => (
              <div
                key={index}
                class="rounded overflow-hidden shadow-lg flex flex-col"
              >
                <div class="relative ">
                  <img
                    class="w-full h-48 object-cover"
                    src={
                      tutor.avatar ||
                      "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                    }
                    alt="Sunset in the mountains"
                  />
                </div>
                <div class="px-6 py-2 mb-auto">
                  <span class="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                    Gia sư: {tutor.fullName}
                  </span>

                  <div className="flex items-center mb-2 ">
                    <Book className="mr-2 text-blue-500" size={20} />
                    {Array.isArray(tutor.profile.majorList) &&
                      tutor.profile.majorList.length > 0 && (
                        <p class="text-gray-600 text-md font-extrabold">
                          Môn:{" "}
                          {tutor.profile.majorList
                            .map((tutors) => tutors.subject.name)
                            .join(", ")}
                        </p>
                      )}
                  </div>
                  <p class="text-gray-500 text-sm">
                    {tutor.profile.personalIntroduction}
                  </p>
                </div>
                <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                  <span class="py-1 text-xs font-regular text-gray-900 flex flex-row items-center">
                    <div class="flex items-center">
                      <p class="text-lg font-bold text-gray-900">
                        {tutor.profile.ratingPoint}
                      </p>
                      <div class="flex ml-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            class={`h-4 w-4 ${
                              i < tutor.profile.ratingPoint
                                ? "fill-amber-300"
                                : "fill-gray-300"
                            }`}
                            viewBox="0 0 256 256"
                          >
                            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </span>

                  <span class="py-1 text-xs font-regular text-gray-900 flex flex-row items-center">
                    <Link
                      to={`/tutordetail/${tutor.id}`}
                      onClick={() => window.scrollTo(0, 0)}
                      key={tutor.id}
                    >
                      <button class="rounded bg-sky-500 text-white px-6 py-2 text-xs font-medium uppercase leading-normal shadow-md transition duration-150 ease-in-out hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400">
                        Chi tiết
                      </button>
                    </Link>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <nav aria-label="">
          <ul className="flex items-center -space-x-px h-10 text-base">
            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
              <button
                onClick={handleDecreasePage}
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white hover:text-gray-700"
              >
                Previous
              </button>
            </li>
            {totalPagesAPI &&
              [...Array(totalPagesAPI).keys()].map((page) => (
                <li
                  className={`page-item ${
                    currentPage === page ? "active" : ""
                  }`}
                  key={page}
                >
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 ${
                      currentPage === page
                        ? "bg-sky-300 text-white"
                        : "bg-gray-300 "
                    } border border-gray-300 rounded-xl mx-3`}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
            <li
              className={`page-item ${
                currentPage === totalPagesAPI - 1 ? "disabled" : ""
              }`}
            >
              <button
                onClick={handleIncreasePage}
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white hover:text-gray-700"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default TutorList;
