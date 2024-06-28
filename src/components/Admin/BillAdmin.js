import axios from "axios";
import React, { useEffect, useState } from "react";
import { CashStack } from "react-bootstrap-icons";  

const BillAdmin = () => {
    const [billList, setBillList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const billsPerPage = 8;

    const token = localStorage.getItem('token'); 
    const id = 1;

    const fetchData = async (page) => {
        try {
            const response = await axios.get(`https://fams-management.tech/api/invoice/student/${id}?pageNo=${page - 1}&pageSize=${billsPerPage}`, {
                headers: { 
                    'accept': '*/*', 
                    'Authorization': `Bearer ${token}`
                }
            });

            const sortedBills = response.data.content.sort((a, b) => a.id - b.id);

            setBillList(sortedBills);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <h2 className="text-3xl font-semibold leading-tight text-gray-800 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
                            Quản lí hóa đơn
                        </h2>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Id
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Kiểu
                                    </th>
                                    <th className="px-9 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Giá
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Tên gia sư
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Ngày tạo
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Tên học sinh
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {billList?.map((bill) => (
                                    <tr key={bill.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <p className="text-gray-900 whitespace-no-wrap">{bill.id}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <p className="text-gray-900 whitespace-no-wrap">{bill.type}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <CashStack className="text-gray-900 mr-2" /> 
                                                <p className="text-gray-900 whitespace-no-wrap">{bill.price.toLocaleString()} VNĐ</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">{bill.tutor.fullName}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <p className="text-gray-900 whitespace-no-wrap">{bill.createdDate}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">{bill.student.fullName}</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                            <span className="text-xs xs:text-sm text-gray-900">
                                Showing {currentPage} of {totalPages} Pages
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
    )
}

export default BillAdmin;
