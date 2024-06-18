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
        window.location.href = "/payment";
      }
    return (
        <div className="w-70vw bg-gray-100 flex items-center justify-center">
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
        </div>
    );
};

export default PaymentPage;