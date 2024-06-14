import React, { useState, useEffect } from 'react';
import ModalDetailPaymentHistory from './ModalDetailPaymentHistory';
import axios from 'axios';
import { Wallet } from 'react-bootstrap-icons';
import TopToWalletForUser from './TopToWalletForUser';

const URL_TRANSACTION_LIST = "https://fams-management.tech/api/transaction/";

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

const PaymentHistoryAdmin = () => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [selectedTransactionTopToWallet, setSelectedTransactionTopToWallet] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [showTopUpModal, setShowTopUpModal] = useState(false);

    const axiosInstance = axios.create({
        baseURL: URL_TRANSACTION_LIST,
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
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await axiosInstance.get(`${32}`);
            if (response) {
                setTransactions(response.data.content);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleTopUp = (transaction) => {
        setSelectedTransactionTopToWallet(transaction);
        setShowTopUpModal(true);
    };

    const handleCloseTopUpModal = () => {
        setShowTopUpModal(false);
    };

    return (
        <div className="bg-gray-100 mx-auto p-6">
            <div className="p-4 text-center rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
                <h1 className="text-2xl font-semibold">Lịch sử giao dịch</h1>
            </div>
            <div className="mx-auto flex justify-center">
                <div className="w-5/6 p-4">
                    {transactions && transactions.map((transaction, index) => (
                        <div key={index} className="flex flex-col p-4 mb-4 bg-gradient-to-r from-blue-200 via-slate-200 to-gray-200 rounded-lg shadow hover:shadow-lg">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center w-1/6">
                                    <img src={transaction.createBy.avatar} alt="Avatar" className="w-14 h-14 rounded-full" />
                                </div>
                                <div className="flex flex-col w-2/3 ml-4">
                                    <p className="text-gray-600">Người chuyển: {transaction?.createBy.fullName}</p>
                                    <p className="text-gray-600">Ngày chuyển: {transaction.createDate}</p>
                                </div>
                                <div className="flex justify-end w-1/6">
                                    <button onClick={() => handleTopUp(transaction)} className='mr-4'>
                                        <Wallet color='green' size={30} />
                                    </button>
                                    <button onClick={() => setSelectedTransaction(transaction)} className="text-orange-500 hover:underline">
                                        Chi tiết
                                    </button>
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
            {selectedTransaction && (
                <ModalDetailPaymentHistory
                    onClose={() => setSelectedTransaction(null)}
                    transaction={selectedTransaction}
                />
            )}
            {showTopUpModal && (
                <TopToWalletForUser
                    show={showTopUpModal}
                    handleClose={handleCloseTopUpModal}
                    transaction={selectedTransactionTopToWallet}
                />
            )}
        </div>
    );
};

export default PaymentHistoryAdmin;
