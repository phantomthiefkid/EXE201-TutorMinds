import React, { useState } from 'react';
import { getUserIdFromToken } from '../../redux/auth/loginSlice';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const PaymentPage = () => {
    const token = localStorage.getItem('token'); 
    const userId = getUserIdFromToken();
    const [paymentInfo, setPaymentInfo] = useState({
        "createBy": {
          "id": userId
        },
        "owner": {
          "id": userId
        },
        "receiver": {
          "id": 32
        },
        description: "",
      })

      async function handlePaymentRequest() {
        try {
            const paymentResponse = await axios.post('https://fams-management.tech/api/transaction', paymentInfo, {
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }   
              });
        } catch (error) {
            console.error("Error adding course and lessons:", error);
        }
        toast.success("Thực hiện nạp tiền thành công");
      }
    return (
        <div className="w-100vw bg-gray-100 flex items-center justify-center m-12">
            <div className="w-80vw bg-white rounded-lg shadow-lg overflow-hidden m-12">
                <div class="title w-full border-b font-bold text-4xl pb-5 m-10">
                    <h1 className='text-center'>Trang thanh toán</h1>
                </div>

               
                <div className="p-6 m-12 flex">
                    {/* <div className="text-center">
                        <h2 className="text-lg font-semibold text-gray-800">Nguyen Tan</h2>
                        <p className="text-sm text-gray-600">Đặt chữ tín lên hàng đầu!</p>
                    </div> */}
                     
                    <form className="mt-4">
                        <img
                            className="w-80% h-auto object-cover object-center"
                            src="https://trello.com/1/cards/666c62fbd8b2d4e029902fe7/attachments/666c6561b8d24801d6801458/download/image.png"
                            alt="QR Code"
                        />
                        <label
                            htmlFor="amount"
                            className="block text-mg font-medium text-gray-700 text-2xl mt-5 mb-5"
                        >
                            Ghi chú:
                        </label>
                        <input
                            type="text"
                            name="amount"
                            id="amount"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Ghi chú thông tin ở đây"
                            onChange={(e) => setPaymentInfo((prev) => ({
                                ...prev, description: e.target.value
                            }))}
                        />
                        <button
                            type="button"
                            className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={handlePaymentRequest}
                        >
                            Thanh toán
                        </button>
                    </form>
                    {/* <div className="mt-6 text-center text-sm text-gray-500 ml-10">
                        <div className="flex justify-center space-x-2 mt-2">
                            <h1>Thông tin của tôi</h1>
                            <img
                                src="path-to-bank-logos.png"
                                alt="Banks"
                                className="h-6"
                            />
                           
                        </div>
                    </div> */}
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;