import React from 'react';

const transactions = [
  {
    status: 'Đang xử lý',
    amount: '₫15,340,000',
    date: '10 Tháng 7, 2022',
    sender: 'Nguyễn Văn A',
  },
  {
    status: 'Thành công',
    amount: '₫8,250,000',
    date: '1 Tháng 7, 2022',
    sender: 'Nguyễn Văn A',
  },
  {
    status: 'Đã hủy',
    amount: '₫5,000,000',
    date: '27 Tháng 6, 2022',
    sender: 'Nguyễn Văn A',
  },
  {
    status: 'Đã hủy',
    amount: '₫10,250,000',
    date: '8 Tháng 6, 2022',
    sender: 'Nguyễn Văn A',
  },
  {
    status: 'Thành công',
    amount: '₫12,500,000',
    date: '20 Tháng 5, 2022',
    sender: 'Nguyễn Văn A',
  },
  {
    status: 'Đang xử lý',
    amount: '₫6,750,000',
    date: '15 Tháng 5, 2022',
    sender: 'Nguyễn Văn A',
  },
  {
    status: 'Thành công',
    amount: '₫9,300,000',
    date: '10 Tháng 5, 2022',
    sender: 'Nguyễn Văn A',
  },
  {
    status: 'Đang xử lý',
    amount: '₫4,200,000',
    date: '5 Tháng 5, 2022',
    sender: 'Nguyễn Văn A',
  },
  {
    status: 'Thành công',
    amount: '₫11,800,000',
    date: '30 Tháng 4, 2022',
    sender: 'Nguyễn Văn A',
  },
  {
    status: 'Đã hủy',
    amount: '₫7,900,000',
    date: '25 Tháng 4, 2022',
    sender: 'Nguyễn Văn A',
  },
];

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
  return (
    <div className="bg-gray-100 mx-auto ">
      <div className="p-4 text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
        <h1 className="text-2xl font-semibold">Lịch sử giao dịch</h1>
      </div>
      <div className="mx-auto flex justify-center">


        <div className="w-5/6 p-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex flex-col p-4 mb-4 bg-white rounded-lg shadow hover:shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(transaction.status)}`}></div>
                  <div className="ml-3">
                    <h4 className="font-semibold">{transaction.status}</h4>
                    <p className="text-gray-600">{transaction.date}</p>
                  </div>
                </div>
                <button className="ml-4 text-orange-500 hover:underline">Chi tiết</button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Người chuyển: {transaction.sender}</p>
                  <p className="text-gray-600">Số tiền: {transaction.amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Ngày chuyển: {transaction.date}</p>
                  <p className="text-gray-600">{transaction.description}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
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
            &copy; 2022, Bling Cloud Technologies LLC. All Rights Reserved.
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentHistory;
