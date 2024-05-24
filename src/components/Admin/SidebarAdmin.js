import React from 'react';
import { Link } from 'react-router-dom';

const SidebarAdmin = ({ children }) => {
    return (
        <div className='grid grid-cols-12'>
            <div className="h-screen col-span-2 bg-blue-400 text-white w-64 space-y-6 py-7 px-2">
                <a href="#" className="text-white flex items-center space-x-2 px-4">
                    <span className="text-2xl font-extrabold">Admin</span>
                </a>
                <nav>
                    <Link to={`/dashboard`} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Dashboard
                    </Link>
                    <Link to={`/userlist`} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        User Management
                    </Link>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Settings
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Blog Management
                    </a>
                    <Link to={`/`} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Đăng xuất
                    </Link>
                </nav>
            </div>
            <div className='col-span-10'>{children}</div>
        </div>
    );
};

export default SidebarAdmin;
