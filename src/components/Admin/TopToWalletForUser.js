import React, { useState, useEffect } from 'react';
import { WalletFill } from 'react-bootstrap-icons';
import axios from 'axios';
import { getIdOfUser } from '../../redux/auth/loginSlice';
import { useDispatch } from 'react-redux';
import { topToWallet } from '../../redux/payment/Payment';
import { toast, ToastContainer } from 'react-toastify';
const URL_GET_USER_WALLET = "https://fams-management.tech/api/wallet/"

const TopToWalletForUser = ({ show, handleClose, transaction }) => {
    const [amount, setAmount] = useState('');
    const [wallet, setWallet] = useState(null);
    const id = getIdOfUser()
    const dispatch = useDispatch()
    const axiosInstance = axios.create({
        baseURL: URL_GET_USER_WALLET,
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
        if (transaction && transaction.createBy && transaction.createBy.id) {
            fetchWalletUser(transaction.createBy.id);
        }
    }, [transaction]);

    const fetchWalletUser = async (userId) => {
        try {
            const response = await axiosInstance.get(`${userId}`);
            if (response && response.data) {
                setWallet(response.data);
                console.log("Wallet Data: ", response.data);
            }
        } catch (error) {
            console.error('Error fetching wallet data:', error);
        }
    };

    const handleInputChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = () => {
        if (!amount) {
            alert("Vui lòng nhập số tiền cần nạp!!!")
        } else {
            const data = {
                idAdmin: id,
                userId: transaction.createBy.id,
                ballance: Number(wallet?.ballance) + Number(amount) || 0 + Number(amount)
            }
            alert("Bạn có chắc chắn muốn nạp tiền vào ví")
            console.log("Check: ", data)
            const response = dispatch(topToWallet(data))
            if (response) {
                toast.success("Nạp tiền vào ví thành công!!!");
            }
            setTimeout(() => {
                handleClose();
            }, 700) // Close the modal after submitting
        }

    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 transition-opacity ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <ToastContainer></ToastContainer>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-t-lg">
                    <h2 className="text-xl font-semibold flex items-center">
                        <WalletFill className="mr-2" /> Nạp tiền vào ví
                    </h2>
                    <button onClick={handleClose} className="text-white hover:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                            Nhập số tiền cần nạp
                        </label>
                        <input
                            type="number"
                            id="amount"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nhập số tiền"
                            value={amount}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="flex justify-end p-4 space-x-4">
                    <button
                        onClick={handleClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Nạp tiền
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopToWalletForUser;
