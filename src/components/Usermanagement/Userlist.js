import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import UpdateUser from './UpdateUser';
import { ToastContainer } from 'react-toastify';
import UpdateTutor from './UpdateTutor';

const UserList = () => {
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalUpdateTutor, setShowModalUpdateTutor] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedTutor, setSelectedTutor] = useState(null);
    const handleOnClose = () => setShowModalUpdate(false);
    const [loading, setLoading] = useState(true);
    const handleOnCloseTutor = () => setShowModalUpdateTutor(false);
    const [dropdownStates, setDropdownStates] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const usersPerPage = 5;

    const axiosInstance = axios.create({
        baseURL: 'https://fams-management.tech/api',
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        fetchUsers();
    }, [searchTerm, filterRole, sortOrder, currentPage]);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get(`/users?pageNo=${currentPage - 1}&pageSize=${usersPerPage}&sortField=id&sortOrder=${sortOrder}&search=${searchTerm}&roleName=${filterRole}`);
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const toggleDropdown = (id) => {
        setDropdownStates(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const closeAllDropdowns = () => {
        setDropdownStates({});
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterRole(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleEditClick = (user, e) => {
        setSelectedUser(user);
        setShowModalUpdate(true);
        setShowModalUpdateTutor(false);
        closeAllDropdowns();
    };

    const handleManageProfileTutor = (user) => {
        setSelectedTutor(user);
        setShowModalUpdate(false);
        setShowModalUpdateTutor(true);
        closeAllDropdowns();
    }

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const totalPages = users.totalPages;

    if (loading) {
        return (<div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>);
    }

    return (
        <>
            <UpdateUser
                onClose={handleOnClose}
                visible={showModalUpdate}
                user={selectedUser}
                fetchUsers={fetchUsers}
            />
            <UpdateTutor
                onClose={handleOnCloseTutor}
                visible={showModalUpdateTutor}
                tutor={selectedTutor}
                fetchUsers={fetchUsers}
            />
            <ToastContainer />
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <h2 className="text-3xl font-semibold leading-tight text-gray-800 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
                                Quản lí người dùng
                            </h2>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
                            <Link to={`/createUser`}>Thêm mới người dùng</Link>
                        </button>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="border p-2 rounded w-1/3"
                        />
                        <select onChange={handleFilterChange} value={filterRole} className="border p-2 rounded">
                            <option value="">Lọc theo vai trò</option>
                            <option value="admin">Admin</option>
                            <option value="tutor">Gia sư</option>
                            <option value="student">Học sinh</option>
                        </select>
                        <select onChange={handleSortChange} value={sortOrder} className="border p-2 rounded">
                            <option value="asc">Sắp xếp tăng dần</option>
                            <option value="desc">Sắp xếp giảm dần</option>
                        </select>
                    </div>

                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Người dùng
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Tên đăng nhập
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Họ và tên
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Số điện thoại
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Địa chỉ
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Giới tính
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Vai trò
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.content?.map((user, index) => (
                                        <tr key={user.id}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <img
                                                            className="w-full h-full rounded-full"
                                                            src={user.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"}
                                                            alt={user.fullName}
                                                        />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
                                                        {/* <p className="text-gray-600 whitespace-no-wrap">Stt: {index + 1}</p> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{user.username}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{user.fullName}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{user.phone}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{user.address}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{user.gender === 1 ? "Nam" : "Nữ"}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                    <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                    <span className="relative">{user.roleName}</span>
                                                </span>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                                <button type="button" onClick={() => toggleDropdown(user.id)} className="inline-block text-gray-500 hover:text-gray-700">
                                                    <svg className="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
                                                        <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                                                    </svg>
                                                </button>
                                                {dropdownStates[user.id] && (
                                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-20">
                                                        <div className="py-1 rounded-md bg-white shadow-xs">
                                                            <button
                                                                onClick={() => handleEditClick(user)}
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                            >
                                                                Chỉnh sửa
                                                            </button>
                                                            {user.roleName === 'TUTOR' && (<button
                                                                onClick={() => handleManageProfileTutor(user)}
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                            >
                                                                Thông tin gia sư
                                                            </button>)}
                                                            <button
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                            >
                                                                Vô hiệu hóa
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                                <span className="text-xs xs:text-sm text-gray-900">
                                    Showing {indexOfFirstUser + 1} to {indexOfLastUser} of {users.length} Entries
                                </span>
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <button
                                        className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-l"
                                        onClick={() => setCurrentPage(prevPage => prevPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Prev
                                    </button>
                                    <button
                                        className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-r"
                                        onClick={() => setCurrentPage(prevPage => prevPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserList;
