import React, { useState } from 'react';
import {Link} from "react-router-dom"
import UpdateUser from './UpdateUser';

const UserList = () => {
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const handleOnClose = () => setShowModalUpdate(false);
    const [dropdownStates, setDropdownStates] = useState({});

    const toggleDropdown = (id) => {
        setDropdownStates(prevState => ({
            ...prevState,
            [id]: !prevState[id] 
        }));
    }
    return (
        <>
            <UpdateUser 
                onClose={handleOnClose}
                visible={showModalUpdate}>
            </UpdateUser>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">

                            <h2 className="text-3xl font-semibold leading-tight text-gray-800 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
                                Quản lí người dùng
                            </h2>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
                            <Link to={`/createUser`}>
                            Add New User
                            </Link>
                        </button>
                    </div>

                    {/* Table Container */}
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
                                            Họ và tên
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Example User 1 */}
                                    <tr>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-full h-full rounded-full"
                                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">Molly Sanders</p>
                                                    <p className="text-gray-600 whitespace-no-wrap">ID: 000001</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">molly@example.com</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">Sherlock Holmes</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative">Active</span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                            <button type="button" onClick={() => toggleDropdown(1)} className="inline-block text-gray-500 hover:text-gray-700">
                                                <svg className="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                                                </svg>
                                            </button>
                                            {dropdownStates[1] && (
                                                <div className="dropdown-content absolute right-20 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                                                    <button onClick={() => setShowModalUpdate(true)} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Cập nhập người dùng</button>
                                                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Vô hiệu hóa người dùng</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-full h-full rounded-full"
                                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">Molly Sanders</p>
                                                    <p className="text-gray-600 whitespace-no-wrap">ID: 000002</p>
                                                </div>
                                            </div> 
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">molly@example.com</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">Sherlock Holmes</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative">Active</span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                            <button type="button" onClick={() => toggleDropdown(2)} className="inline-block text-gray-500 hover:text-gray-700">
                                                <svg className="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                                                </svg>
                                            </button>
                                            {dropdownStates[2] && (
                                                <div className="dropdown-content absolute right-20 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                                                    <button onClick={() => setShowModalUpdate(true)} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Cập nhập người dùng</button>
                                                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Vô hiệu hóa người dùng</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-full h-full rounded-full"
                                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">Molly Sanders</p>
                                                    <p className="text-gray-600 whitespace-no-wrap">ID: 000003</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">molly@example.com</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">Sherlock Holmes</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative">Active</span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                            <button type="button" onClick={() => toggleDropdown(3)} className="inline-block text-gray-500 hover:text-gray-700">
                                                <svg className="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                                                </svg>
                                            </button>
                                            {dropdownStates[3] && (
                                                <div className="dropdown-content absolute right-20 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                                                    <button onClick={() => setShowModalUpdate(true)} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Cập nhập người dùng</button>
                                                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Vô hiệu hóa người dùng</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-full h-full rounded-full"
                                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">Molly Sanders</p>
                                                    <p className="text-gray-600 whitespace-no-wrap">ID: 000004</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">molly@example.com</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">Sherlock Holmes</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative">Active</span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                            <button type="button" onClick={() => toggleDropdown(4)} className="inline-block text-gray-500 hover:text-gray-700">
                                                <svg className="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                                                </svg>
                                            </button>
                                            {dropdownStates[4] && (
                                                <div className="dropdown-content absolute right-20 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                                                    <button onClick={() => setShowModalUpdate(true)} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Cập nhập người dùng</button>
                                                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Vô hiệu hóa người dùng</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-full h-full rounded-full"
                                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">Molly Sanders</p>
                                                    <p className="text-gray-600 whitespace-no-wrap">ID: 000005</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">molly@example.com</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">Sherlock Holmes</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative">Active</span>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                            <button type="button" onClick={() => toggleDropdown(5)} className="inline-block text-gray-500 hover:text-gray-700">
                                                <svg className="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                                                </svg>
                                            </button>
                                            {dropdownStates[5] && (
                                                <div className="dropdown-content absolute right-20 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                                                    <button onClick={() => setShowModalUpdate(true)} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Cập nhập người dùng</button>
                                                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Vô hiệu hóa người dùng</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserList;
