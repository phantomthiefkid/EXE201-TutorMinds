import React, { useState } from 'react';
import { CheckCircle, XCircle, ExclamationCircle, Search } from 'react-bootstrap-icons';

const RequestListAdmin = () => {
  // Example data for user requests with avatar URLs
  const requests = [
    { id: 1, user: 'John Doe', request: 'Increase storage limit', status: 'Approved', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, user: 'Jane Smith', request: 'Reset password', status: 'Approved', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, user: 'Alice Johnson', request: 'Upgrade account', status: 'Refinement', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: 4, user: 'Mike Brown', request: 'Add new feature', status: 'Rejected', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: 5, user: 'Holmes', request: 'Add new feature', status: 'Refinement', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { id: 6, user: 'Mike Tyson', request: 'Add new feature', status: 'Approved', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
  ];

  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredRequests = requests.filter(request => {
    const statusMatch = filter === 'All' || request.status === filter;
    const searchMatch = request.user.toLowerCase().includes(search.toLowerCase()) || request.request.toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="flex justify-between items-start py-8 gap-10">
        <div className="w-full lg:w-3/4 space-y-4">
          <div className="flex items-center">
            <h2 className="text-3xl font-semibold leading-tight text-gray-800 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
              Quản lí người dùng
            </h2>
          </div>
          <div className="relative mt-4 py-6">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-500 w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white border border-gray-200 shadow-md p-6 flex items-start hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center space-x-4 mr-6">
                <img src={request.avatar} alt={request.user} className="w-14 h-14 rounded-full object-cover" />
              </div>
              <div className="flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">{request.user}</h2>
                <p className="text-gray-600">{request.request}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`font-semibold flex items-center space-x-1 ${request.status === 'Approved' ? 'text-green-500' : request.status === 'Refinement' ? 'text-yellow-500' : 'text-red-500'}`}>
                  {request.status === 'Approved' ? <CheckCircle className="w-6 h-6" /> : request.status === 'Refinement' ? <ExclamationCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  <span>{request.status === 'Approved' ? "Hoàn thành" : request.status === 'Refinement' ? "Đang xử lí" : "Từ chối"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/4 flex flex-col space-y-2 mt-6 lg:mt-0 py-28">
          {['All', 'Rejected', 'Refinement', 'Approved'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold ${filter === status
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700'
                } hover:bg-green-300 hover:text-white transition duration-300`}
            >
              {status === 'All' ? 'Tất cả' : status === 'Rejected' ? 'Từ chối' : status === 'Refinement' ? 'Đang xử lý' : 'Hoàn thành'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestListAdmin;
