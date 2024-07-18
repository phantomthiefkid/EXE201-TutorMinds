import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getIdOfUser, getUserDataFromToken } from '../../redux/auth/loginSlice';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8;

  const userRole = getUserDataFromToken();
  const userId = getIdOfUser();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const url = userRole === 'TUTOR' ?
          `https://fams-management.tech/api/invoice/tutor/${userId}?pageNo=${currentPage}&pageSize=${itemsPerPage}` :
          `https://fams-management.tech/api/invoice/student/${userId}?pageNo=${currentPage}&pageSize=${itemsPerPage}`;

        const response = await axios.get(url, {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
          }
        });
        setTransactions(response?.data?.content);
        setTotalPages(response?.data?.totalPages);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [userId, userRole, token, currentPage]);

  const handleTopUp = (transaction) => {
    // Add your top-up logic here
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="transaction-history w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Lịch sử giao dịch</h1>

      {transactions && transactions.length > 0 ? (
        transactions.map((transaction, index) => {
          const avatarUrl = (userRole === 'TUTOR' ? transaction.student.avatar : transaction.tutor.avatar) || 'https://th.bing.com/th/id/OIP.xjliCOfFNBP_-eb_5mRyhgAAAA?rs=1&pid=ImgDetMain';
          const bgColor = transaction.type === 'Course' ? 'bg-green-100' : 'bg-pink-50';

          return (
            <div key={index} className={`flex flex-col transition transform hover:-translate-y-1 p-4 mb-4 ${bgColor} rounded-lg shadow hover:shadow-lg m-5`}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center w-2/3">
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="text-gray-600 font-semibold ml-4">Giao dịch</p>
                </div>
                <div className="flex flex-col w-2/3 ml-4">
                  <p className="text-gray-600">Người nhận: {userRole !== 'TUTOR' ? transaction.tutor.fullName : transaction.student.fullName}</p>
                  <p className="text-gray-600">Ngày chuyển: {transaction.createdDate}</p>
                </div>
                <div className="flex flex-col w-2/3 ml-4">
                  <p className="text-gray-600">Số tiền: {transaction.price}</p>
                  <p className="text-gray-600">Loại: {transaction.type}</p>
                </div>
                <div className="flex justify-end w-1/6">
                  <button onClick={() => setSelectedTransaction(transaction)} className="text-orange-500 hover:underline">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">Không có giao dịch nào.</p>
      )}

      <div className="flex justify-center m-6">
        <button
          className={`px-4 py-2 mx-1 rounded ${currentPage === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map(page => (
          <button
            key={page}
            className={`px-4 py-2 mx-1 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handlePageChange(page)}
          >
            {page + 1}
          </button>
        ))}
        <button
          className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages - 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;
