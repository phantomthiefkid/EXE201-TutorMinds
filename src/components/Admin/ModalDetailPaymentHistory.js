import React from 'react';
import { ReceiptCutoff, CurrencyDollar, Calendar, PersonCircle, CreditCard2Front, PersonBadge, Envelope, Telephone, GeoAlt, XCircle, CheckCircle } from 'react-bootstrap-icons';
import { getIdOfUser } from '../../redux/auth/loginSlice';

const ModalDetailPaymentHistory = ({ onClose, transaction }) => {
    if (!transaction) return null;
    const id = getIdOfUser();
    const handleReject = () => {
        // alert('Bạn có chắc chắn muốn từ chối giao dịch!!!');
        onClose();
    };

    const handleAccept = () => {
        alert('Bạn có chắc chắn muốn duyệt giao dịch!!!');
        onClose();
    };

    console.log("Check: ", id, transaction.createBy.id)

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white w-full max-w-2xl p-4 shadow-lg">
                <div className="flex justify-between items-center mb-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-white p-4">
                    <h2 className="text-xl text-center font-semibold">Chi tiết giao dịch</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
                        <XCircle color='white' className="w-6 h-6" />
                    </button>
                </div>

                <div className="mb-4 grid grid-cols-2 p-4 gap-10 text-gray-700">
                    <div className="flex items-center">
                        <span className="inline-flex items-center">
                            <Calendar size={20} className="text-blue-500 mr-1" />
                            <strong>Ngày chuyển:</strong>
                        </span>
                        <span className="ml-1">{transaction.createDate}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="inline-flex items-center">
                            <PersonCircle size={20} className="text-yellow-500 mr-1" />
                            <strong>Người chuyển:</strong>
                        </span>
                        <span className="ml-1">{transaction.createBy.fullName}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="inline-flex items-center">
                            <Telephone size={20} className="text-teal-500 mr-1" />
                            <strong>Số điện thoại:</strong>
                        </span>
                        <span className="ml-1">{transaction.createBy.phone}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="inline-flex items-center">
                            <Envelope size={20} className="text-red-500 mr-1" />
                            <strong>Email:</strong>
                        </span>
                        <span className="ml-1">{transaction.createBy.email}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="inline-flex items-center">
                            <GeoAlt color='red' size={25} className="text-gray-500 mr-1" />
                            <strong>Địa chỉ:</strong>
                        </span>
                        <span className="ml-1">{transaction.createBy.address}</span>
                    </div>
                    <div className="col-span-2">
                        <div className="flex items-center">
                            <span className="inline-flex items-center">
                                <ReceiptCutoff size={20} className="text-purple-500 mr-1" />
                                <strong>Mô tả:</strong>
                            </span>
                        </div>
                        <p className="ml-7">{transaction.description}</p>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleReject}
                        className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:from-red-500 hover:to-red-700 flex items-center"
                    >
                        <XCircle className="w-6 h-6 mr-2" />
                        Đóng
                    </button>
                    {/* <button
                        onClick={handleAccept}
                        className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:from-green-500 hover:to-green-700 flex items-center"
                    >
                        <CheckCircle className="w-6 h-6 mr-2" />
                        Nạp tiền
                    </button> */}
                </div>
            </div>
        </div>

    );
};

export default ModalDetailPaymentHistory;
