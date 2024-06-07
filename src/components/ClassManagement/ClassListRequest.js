import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckCircle,
  XCircle,
  ExclamationCircle,
  Search,
  FileText,
} from "react-bootstrap-icons";

import ModalRequestDetail from "./ModalRequestDetail";
import { getUserDataFromToken } from "../../redux/auth/loginSlice";

import {
  fetchClassList,
  updateClassRequest,
} from "../../redux/ClassManagement/classSlice";
import { toast, ToastContainer } from "react-toastify";

const ClassListRequest = () => {
  const classAPI = useSelector((classes) => classes.class.data);
  const totalPagesAPI = useSelector((page) => page.class.data.totalPages);
  const dispatch = useDispatch();

  const [flag, setFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [classList, setClassList] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("asc");
  const [filter, setFilter] = useState("");
  const [dropdownStates, setDropdownStates] = useState({});
  const [showModalRequest, setShowModalRequest] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const handleOnClose = () => setShowModalRequest(false);

  const handleOpenModal = (classId) => {
    setSelectedClassId(classId);
    setShowModalRequest(true);
    setDropdownStates({})
  };
  const itemsPerPage = 8;

  const token = localStorage.getItem("token");
  const roleName = getUserDataFromToken();

  useEffect(() => {
    if (Array.isArray(classAPI)) {
      setClassList([...classAPI]);
    }
  }, [classAPI]);
  useEffect(() => {
    dispatch(
      fetchClassList({
        pageSize: 8,
        pageIndex: currentPage,
        search: searchTerm,
        sortBy,
      })
    )
      .then((response) => {
        if (response.payload.content.length === 0) {
          setCurrentPage(0);
          // setTotalPages(0);
        } else {
          setApiData(response.payload.content);
          // console.log("Hello: ", response.payload.content);
          // setTotalPages(response.payload.totalPages);
        }
      })
      .catch((error) => {
        console.error("Error fetching tutors:", error);
      });
  }, [dispatch, currentPage, searchTerm, sortBy, flag]);

  useEffect(() => {
    setClassList([...apiData]);
  }, [apiData]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleIncreasePage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleDecreasePage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const toggleDropdown = (id) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleApprovel = async (data) => {
    const dataUpdate = { ...data, conversationStatus: { id: 4 } };
    const update = {
      title: data.title,
      teacher: { id: data.teacher.id },
      user: { id: data.user.id },
      address: data.address,
      contactNumber: data.contactNumber,
      conversationStatus: { id: 4 },
      description: data.description,
    };
    try {
      const response = await dispatch(
        updateClassRequest({ id: data.id, data: update })
      );
      setDropdownStates({})
      setFlag(!flag); // This will trigger useEffect to re-fetch the updated class list
      toast.success("Gửi yêu cầu thành công!!!", { autoClose: 500 });
    } catch (error) {
      toast.error("Gửi yêu cầu thất bại!!!", { autoClose: 500 });
    }
  };

  const handleReject = async (data) => {
    const dataUpdate = { ...data, conversationStatus: { id: 7 } };
    const update = {
      title: data.title,
      teacher: { id: data.teacher.id },
      user: { id: data.user.id },
      address: data.address,
      contactNumber: data.contactNumber,
      conversationStatus: { id: 7 },
      description: data.description,
    };
    try {
      console.log("Check: ", dataUpdate);
      const response = await dispatch(
        updateClassRequest({ id: data.id, data: update })
      );
      setDropdownStates({})
      console.log("Update successful", response);
      setFlag(!flag); // This will trigger useEffect to re-fetch the updated class list
      toast.success("Gửi yêu cầu thành công!", { autoClose: 500 });
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Gửi yêu cầu thất bại!", { autoClose: 500 });
    }
  };

  return (
    <>
      <ToastContainer />
      <h2 class="text-3xl font-semibold leading-tight text-center text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-4 py-2 shadow-md">
        Danh sách lớp học
      </h2>
      <div className="flex items-center mt-4 justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded w-1/3"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="border p-2 rounded"
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

        {/* <select
          onChange={handleSortChange}
          value={sortBy}
          className="border p-2 rounded"
        >
          <option value="asc">Sắp xếp tăng dần</option>
          <option value="desc">Sắp xếp giảm dần</option>
        </select> */}
      </div>
      <table className="my-10 mx-auto w-full max-w-7xl divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-100">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Số thứ tự
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tên môn học
            </th>
            {token ? (
              <>
                {roleName === "TUTOR" && (
                  <>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Học sinh
                    </th>
                  </>
                )}
                {roleName === "STUDENT" && (
                  <>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Gia sư
                    </th>
                  </>
                )}
              </>
            ) : (
              <div>Please log in</div>
            )}
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Số điện thoại
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Giá tiền
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Trạng thái
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
          </tr>
        </thead>
        {token ? (
          <>
            {roleName === "TUTOR" && Array.isArray(classList) && (
              <>
                {console.log("Role is TUTOR")}
                {classList.map((classes, index) => (
                  <tbody
                    className="bg-white divide-y divide-gray-200"
                    key={index}
                  >
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1 + currentPage * itemsPerPage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {classes.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={
                                classes.user.avatar ||
                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                              }
                              alt={classes.user.fullName}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {classes.user.fullName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {classes.user.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        300.000/buổi
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full 
                ${classes.conversationStatus.label === "Draft"
                              ? "text-gray-500"
                              : classes.conversationStatus.label === "Submitted to Tutor"
                                ? "text-sky-600"
                                : classes.conversationStatus.label === "Rejected"
                                  ? "text-red-600"
                                  : classes.conversationStatus.label === "Refinement Required"
                                    ? "text-yellow-600"
                                    : classes.conversationStatus.label === "Approved by Tutor"
                                      ? "text-green-600"
                                      : "text-orange-500"
                            } flex items-center gap-1`}
                        >
                          {classes.conversationStatus.label === "Draft" && (
                            <FileText />
                          )}
                          {classes.conversationStatus.label ===
                            "Submitted to Tutor" && <ExclamationCircle />}
                          {classes.conversationStatus.label === "Rejected" && (
                            <XCircle />
                          )}
                          {classes.conversationStatus.label ===
                            "Refinement Required" && <ExclamationCircle />}
                          {classes.conversationStatus.label ===
                            "Approved by Tutor" && <CheckCircle />}
                          {classes.conversationStatus.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        {classes.conversationStatus.label !== "Rejected" && classes.conversationStatus.label !== "Refinement Required" && classes.conversationStatus.label !== "Draft" && (
                          <button
                            type="button"
                            className="inline-block text-gray-500 hover:text-gray-700"
                            onClick={() => toggleDropdown(classes.id)}
                          >
                            <svg
                              className="inline-block h-6 w-6 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                            </svg>
                          </button>
                        )}
                        {dropdownStates[classes.id] && (
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-20">
                            <div className="py-1 rounded-md bg-white shadow-xs">
                              <button
                                onClick={() => handleApprovel(classes)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                Chấp nhận
                              </button>
                              <button
                                onClick={() => handleReject(classes)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                Từ chối
                              </button>
                              <button
                                onClick={() => handleOpenModal(classes.id)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                Làm lại yêu cầu
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </>
            )}
            {roleName === "STUDENT" && Array.isArray(classList) && (
              <>
                {classList.map((classes, index) => (
                  <tbody
                    className="bg-white divide-y divide-gray-200"
                    key={index}
                  >
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1 + currentPage * itemsPerPage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {classes.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={
                                classes.teacher.avatar ||
                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                              }
                              alt={classes.teacher.fullName}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {classes.teacher.fullName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {classes.teacher.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        300.000/buổi
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full 
                ${classes.conversationStatus.label === "Draft"
                              ? "text-gray-500"
                              : classes.conversationStatus.label === "Submitted to Tutor"
                                ? "text-sky-600"
                                : classes.conversationStatus.label === "Rejected"
                                  ? "text-red-600"
                                  : classes.conversationStatus.label === "Refinement Required"
                                    ? "text-yellow-600"
                                    : classes.conversationStatus.label === "Approved by Tutor"
                                      ? "text-green-600"
                                      : "text-orange-500"
                            } flex items-center gap-1`}
                        >
                          {classes.conversationStatus.label === "Draft" && (
                            <FileText />
                          )}
                          {classes.conversationStatus.label ===
                            "Submitted to Tutor" && <ExclamationCircle />}
                          {classes.conversationStatus.label === "Rejected" && (
                            <XCircle />
                          )}
                          {classes.conversationStatus.label ===
                            "Refinement Required" && <ExclamationCircle />}
                          {classes.conversationStatus.label ===
                            "Approved by Tutor" && <CheckCircle />}
                          {classes.conversationStatus.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        {classes.conversationStatus.label !== "Approved by Tutor" && classes.conversationStatus.label !== "Rejected" && classes.conversationStatus.label !== "Submitted to Tutor" && (
                          <button
                            type="button"
                            className="inline-block text-gray-500 hover:text-gray-700"
                            onClick={() => toggleDropdown(classes.id)}
                          >
                            <svg
                              className="inline-block h-6 w-6 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                            </svg>
                          </button>
                        )}

                        {dropdownStates[classes.id] &&
                          classes.conversationStatus.label !== "Rejected" && (
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-20">
                              <div className="py-1 rounded-md bg-white shadow-xs">
                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                  Chấp nhận
                                </button>
                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                  Từ chối
                                </button>
                                <button
                                  onClick={() => handleOpenModal(classes.id)}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  Làm lại yêu cầu
                                </button>
                              </div>
                            </div>
                          )}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </>
            )}
          </>
        ) : (
          <div>Please log in</div>
        )}
      </table>
      <ModalRequestDetail
        onClose={handleOnClose}
        visible={showModalRequest}
        flag={flag}
        setFlag={setFlag}
        selectedClassId={selectedClassId}
      />
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
                  className={`page-item ${currentPage === page ? "active" : ""
                    }`}
                  key={page}
                >
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 ${currentPage === page
                      ? "bg-sky-300 text-white"
                      : "bg-gray-300 "
                      } border border-gray-300 rounded-xl mx-3`}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
            <li
              className={`page-item ${currentPage === totalPagesAPI - 1 ? "disabled" : ""
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

export default ClassListRequest;
