import React from 'react';

const transactions = [
  {
    status: 'Processing',
    amount: '₱15,340.00',
    date: '10 July 2022',
    description: 'Demo Booking at...',
  },
  {
    status: 'Successful',
    amount: '₱8,250.00',
    date: '1 July 2022',
    description: 'Demo Booking at...',
  },
  {
    status: 'Cancelled',
    amount: '₱5,000.00',
    date: '27 June 2022',
    description: 'Demo Booking at...',
  },
  {
    status: 'Cancelled',
    amount: '₱10,250.00',
    date: '8 June 2022',
    description: 'Demo Booking at...',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Processing':
      return 'bg-yellow-500';
    case 'Successful':
      return 'bg-green-500';
    case 'Cancelled':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const PaymentHistory = () => {
  return (
    <div className="bg-gray-100 p-4 flex justify-center w-80vw" >
      <div className="mx-auto w-full bg-white shadow-lg rounded-lg overflow-hidden" style={{
        "width": "80vw"
    }}>
        <div className="flex items-center p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
          <img src="profile_picture_url" alt="Profile" className="w-12 h-12 rounded-full border-2 border-white" />
          <div className="ml-3">
            <h2 className="text-xl font-semibold">Mhoreen</h2>
            <button className="text-blue-200 hover:underline">Follow</button>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/4 bg-purple-100 p-4">
            <a href="#" className="flex items-center text-gray-600 bg-white p-2 rounded-md mb-4 shadow">
              <span className="ml-2">Payment History</span>
            </a>
            <button className="text-purple-500 hover:underline mt-8 block">Logout</button>
          </div>
          <div className="w-3/4 p-4">
            {transactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center p-4 mb-4 bg-gray-100 rounded-lg shadow">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(transaction.status)}`}></div>
                  <div className="ml-3">
                    <h4 className="font-semibold">{transaction.status}</h4>
                    <p className="text-gray-600">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <h4 className="font-semibold">{transaction.amount}</h4>
                  <p className="text-gray-600">{transaction.description}</p>
                </div>
                <button className="ml-4 text-orange-500 hover:underline">Details</button>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <button className="text-purple-500 hover:underline">&larr; Previous</button>
              <div className="space-x-2">
                <button className="text-purple-500 hover:underline">1</button>
                <button className="text-purple-500 hover:underline">2</button>
                <button className="text-purple-500 hover:underline">3</button>
                <button className="text-purple-500 hover:underline">4</button>
                <button className="text-purple-500 hover:underline">...</button>
              </div>
              <button className="text-purple-500 hover:underline">Next &rarr;</button>
            </div>
            <div className="p-4 text-center text-gray-600 mt-8">
              &copy; 2022, Bling Cloud Technologies LLC. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
