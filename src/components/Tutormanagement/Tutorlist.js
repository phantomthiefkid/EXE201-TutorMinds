import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check2Circle, GeoAlt } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

import { fetchTutorList } from "../../redux/TutorManagement/Tutor";

const TutorList = () => {
  const tutorsAPI = useSelector((tutor) => tutor.tutor.data);
  const totalPagesAPI = useSelector((page) => page);
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
        pageSize: 10,
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

  return (
    <div class="max-w-7xl mx-auto my-10 grid grid-cols-3 gap-4 justify-center">
      {Array.isArray(tutorList) &&
        tutorList.map((tutor) => (
          <div class="bg-white shadow-xl rounded-lg text-gray-900">
            <div class="relative overflow-hidden bg-cover bg-no-repeat">
              <img
                class="rounded-t-lg"
                src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                alt="profile"
              />
              <img
                src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/445551860_1884650355281087_2659972058971311210_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=afA7fdo_8IUQ7kNvgGzfXrj&_nc_ht=scontent.fsgn2-4.fna&oh=00_AYCmUH7wEEo7MOax-QUL5qPfAOwHacx1dHoWZj9UvAxK6w&oe=665DFA91"
                alt="logo"
                class="absolute top-0 left-0 mt-2 rounded-full px-2 text-center text-sm font-medium text-white h-14 w-14"
              />
            </div>

            <div class="p-6 text-surface">
              <h5 class="mb-2 text-xl font-medium leading-tight">
                {tutor.fullName}
              </h5>
              <p class="mb-4 text-base">{tutor.address}</p>
              <Link to={`/tutordetail/${tutor.id}`}><button
                type="button"
                class=" rounded bg-sky-400 text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                Chi tiết
              </button></Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TutorList;
