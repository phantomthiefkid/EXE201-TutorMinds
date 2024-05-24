import React from 'react';
import { Link } from 'react-router-dom';
import {BarChart, People, Book, BoxArrowRight, ClipboardDataFill, Laptop} from "react-bootstrap-icons";

const SidebarAdmin = ({ children }) => {
    return (
        <div className='grid grid-cols-12'>
            <div className="h-screen col-span-2 bg-white  text-gray-600 w-64 space-y-6 py-7 px-2 shadow-sm">
                <span href="" className="text-blue-300 flex items-center space-x-2 px-4">
                    <span className="text-2xl font-extrabold">Admin</span>
                </span>
                <nav>
                    <Link to={`/dashboard`} className="flex items-start py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-blue-600 text-md">
                       <BarChart className='mr-2'size={20}/> Thống kê
                    </Link>
                    <Link to={`/userlist`} className="flex items-start py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-blue-600 text-md">
                       <People className='mr-2'size={20}/> Quản lí người dùng
                    </Link>
                    <a href="#" className="flex items-start py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-blue-600 text-md">
                      <Laptop className='mr-2'size={20}/>  Lớp học
                    </a>
                    <a href="#" className="flex items-start py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-blue-600 text-md">
                    <Book className='mr-2'size={20}/> Môn học
                    </a>
                    <a href="#" className="flex items-start py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-blue-600 text-md">
                     <ClipboardDataFill className='mr-2'size={20}/>   Hóa đơn
                    </a>
                    <Link to={`/`} className="flex items-start py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 hover:text-blue-600 text-md">
                       <BoxArrowRight className='mr-2'size={20}/> Đăng xuất
                    </Link>
                </nav>
            </div>
            <div className='col-span-10'>{children}</div>
        </div>
    );
};

export default SidebarAdmin;
