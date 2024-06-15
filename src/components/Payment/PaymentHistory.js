import React, { useEffect, useState } from 'react';
import { getIdOfUser } from '../../redux/auth/loginSlice';
import axios from 'axios';
const id = getIdOfUser();

const getStatusColor = (status) => {
  switch (status) {
    case 'Đang xử lý':
      return 'bg-yellow-500';
    case 'Thành công':
      return 'bg-green-500';
    case 'Đã hủy':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem('token'); 
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://fams-management.tech/api/transaction/${id}?pageIndex=0&pageSize=10`,{
        headers: { 
          'accept': '*/*', 
          'Authorization': `Bearer ${token}`
        }
      });
      setTransactions(response.data.content);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="p-6 text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white rounded-md shadow-lg mb-8">
        <h1 className="text-3xl font-bold">Lịch sử giao dịch</h1>
      </div>
      <div className="container mx-auto px-4">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex flex-col p-6 mb-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(transaction.status)}`}></div>
                <div className="ml-3">
                  <p className="text-gray-600">{transaction.createDate}</p> 
                </div>
              </div>
              <button className="ml-4 text-blue-500 hover:underline">Chi tiết</button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img className="w-12 h-12 rounded-full mr-4" src={transaction.owner.avatar} alt="Sender Avatar" />
                <div>
                  <p className="text-gray-600">Người chuyển: {transaction.owner.fullName}</p>
                  <p className="text-gray-600">Số tiền: {transaction.amount}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Ngày chuyển: {transaction.createDate}</p>
                <p className="text-gray-600">{transaction.description}</p>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <img className="w-12 h-12 rounded-full mr-4" src={transaction.receiver.avatar} alt="Receiver Avatar" />
              <div>
                <p className="text-gray-600">Người nhận: {transaction.receiver.fullName}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-8">
          <button className="text-purple-500 hover:underline">&larr; Trước</button>
          <div className="space-x-2">
            <button className="text-purple-500 hover:underline">1</button>
            <button className="text-purple-500 hover:underline">2</button>
            <button className="text-purple-500 hover:underline">3</button>
            <button className="text-purple-500 hover:underline">4</button>
            <button className="text-purple-500 hover:underline">...</button>
          </div>
          <button className="text-purple-500 hover:underline">Sau &rarr;</button>
        </div>
        <div className="p-4 text-center text-gray-600 mt-8">
          &copy; 2024, Bling Cloud Technologies LLC. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
