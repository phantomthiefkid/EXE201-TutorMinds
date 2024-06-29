import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, ExclamationCircle, FileText } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassList } from '../../redux/ClassManagement/classSlice';

const RequestListAdmin = () => {
  const classAPI = useSelector((item) => item.class.data.content);
  const totalPagesAPI = useSelector((page) => page.class.data.totalPages);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState('All');
  const [classList, setClassList] = useState([]);
  const [apiData, setApiData] = useState([]);
  console.log("Check: ", classAPI)
  useEffect(() => {
    if (Array.isArray(classAPI)) {
      setClassList([...classAPI]);
    }
  }, [classAPI]);

  useEffect(() => {
    setClassList([...apiData]);
  }, [apiData]);

  useEffect(() => {
    dispatch(
      fetchClassList({
        pageSize: 6,
        pageIndex: currentPage,
        search: "",
        sortBy: "",
      })
    )
      .then((response) => {
        if (response.payload.content.length === 0) {
          setCurrentPage(0);
        } else {
          setApiData(response.payload.content);
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error("Error fetching tutors:", error);
      });
  }, [dispatch, currentPage]);

  const handleIncreasePage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleDecreasePage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = (status) => {
    setFilter(status);
  };

  const filteredRequests = classList.filter((request) => {
    const statusMatch = filter === 'All' || request.conversationStatus.label === filter;
    return statusMatch;
  });

  if (loading) {
    return (<div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>);
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="flex justify-between items-start py-8 gap-10">
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold leading-tight text-gray-800 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
              Quản lí yêu cầu người dùng
            </h2>
          </div>
          <div className="flex space-x-2 py-6">
            {['All', 'Draft', 'Submitted to Tutor', 'Rejected', 'Refinement Required', 'Approved by Tutor'].map((status) => (
              <button
                key={status}
                onClick={() => handleFilter(status)}
                className={`px-4 py-2 rounded-lg font-semibold ${filter === status ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-green-300 hover:text-white transition duration-300`}
              >
                {status === 'All' ? 'Tất cả' : status === 'Draft' ? 'Bản nháp' : status === 'Rejected' ? 'Từ chối' : status === 'Refinement Required' ? 'Yêu cầu sàng lọc' : status === 'Approved by Tutor' ? "Gia sư đã duyệt" : "Đã gửi cho gia sư"}
              </button>
            ))}
          </div>
          {filteredRequests.map((request, index) => (
            <div key={index} className="bg-white border border-gray-300 shadow-md p-6 flex items-start hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-4 mr-6">
                <img src={`https://www.merchantmaverick.com/wp-content/uploads/2020/04/Online_tutor_teacher_using_laptop_at_their_desk.jpg`} className="w-14 h-14 rounded-full border border-gray-200 object-cover" />
                <img src={`https://static.vecteezy.com/system/resources/thumbnails/024/724/632/small_2x/a-happy-smiling-young-college-student-with-a-book-in-hand-isolated-on-a-transparent-background-generative-ai-png.png`} className="w-14 h-14 rounded-full border border-gray-200 object-cover" />
              </div>
              <div className="flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{request.title}</h2>
                <p className="text-gray-600 mb-2">{request.description}</p>
                <p className="text-gray-500 text-sm mb-2">ID: {request.id} - Ngày tạo: {request.createdDate}</p>
                <p className="text-green-600 font-bold text-lg">Giá tiền: 500,000 VND</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`font-semibold flex items-center space-x-1 ${request.conversationStatus.label === 'Draft' ? 'text-gray-500' : request.conversationStatus.label === 'Submitted to Tutor' ? 'text-blue-500' : request.conversationStatus.label === 'Rejected' ? 'text-red-500' : request.conversationStatus.label === 'Refinement Required' ? 'text-yellow-500' : request.conversationStatus.label === 'Approved by Tutor' ? 'text-green-500' : 'text-blue-500'}`}>
                  {request.conversationStatus.label === 'Draft' && <FileText className="w-6 h-6" />}
                  {request.conversationStatus.label === 'Submitted to Tutor' && <ExclamationCircle className="w-6 h-6" />}
                  {request.conversationStatus.label === 'Rejected' && <XCircle className="w-6 h-6" />}
                  {request.conversationStatus.label === 'Refinement Required' && <ExclamationCircle className="w-6 h-6" />}
                  {request.conversationStatus.label === 'Approved by Tutor' && <CheckCircle className="w-6 h-6" />}
                  <span>{request.conversationStatus.label}</span>
                </div>
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
                  className={`page-item ${currentPage === page ? "active" : ""}`}
                  key={page}
                >
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 ${currentPage === page ? "bg-sky-300 text-white" : "bg-gray-300 "} border border-gray-300 rounded-xl mx-3`}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
            <li
              className={`page-item ${currentPage === totalPagesAPI - 1 ? "disabled" : ""}`}
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
    </div>
  );
};

export default RequestListAdmin;
